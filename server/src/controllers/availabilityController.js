import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import BlockedDate from "../models/BlockedDate.js";

export const checkAvailability = async (req, res, next) => {
  try {
    const { checkIn, checkOut, adults = 2, roomType } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: "Please specify both checkIn and checkOut dates.",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date.",
      });
    }

    let rooms = [];
    try {
      rooms = await Room.find({ status: "active" });
    } catch (e) {
      rooms = [];
    }

    // Overlapping bookings aggregation:
    // checkInDate < requestedCheckOut AND checkOutDate > requestedCheckIn
    let bookedCountsByRoom = {};
    try {
      const activeBookings = await Booking.find({
        bookingStatus: { $in: ["confirmed", "checked-in", "pending"] },
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gt: checkInDate },
      });

      activeBookings.forEach((b) => {
        const rid = b.room.toString();
        bookedCountsByRoom[rid] = (bookedCountsByRoom[rid] || 0) + (b.roomsCount || 1);
      });
    } catch (e) {
      bookedCountsByRoom = {};
    }

    // Blocked dates check
    let blockedRooms = new Set();
    try {
      const blocks = await BlockedDate.find({
        startDate: { $lt: checkOutDate },
        endDate: { $gt: checkInDate },
      });
      blocks.forEach((blk) => {
        if (!blk.room) {
          // whole hotel blocked
          rooms.forEach((r) => blockedRooms.add(r._id.toString()));
        } else {
          blockedRooms.add(blk.room.toString());
        }
      });
    } catch (e) {
      blockedRooms = new Set();
    }

    const availability = rooms.map((room) => {
      const rid = room._id.toString();
      const bookedUnits = bookedCountsByRoom[rid] || 0;
      const isBlocked = blockedRooms.has(rid);
      const availableUnits = isBlocked ? 0 : Math.max(0, room.totalUnits - bookedUnits);

      return {
        roomId: room._id,
        slug: room.slug,
        title: room.title,
        roomType: room.roomType,
        basePrice: room.basePrice,
        discountPrice: room.discountPrice,
        totalUnits: room.totalUnits,
        bookedUnits,
        availableUnits,
        isAvailable: availableUnits > 0,
        images: room.images,
        capacity: room.capacity,
      };
    });

    res.status(200).json({
      success: true,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      roomsCount: availability.length,
      availability,
    });
  } catch (error) {
    next(error);
  }
};
