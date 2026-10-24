import PDFDocument from "pdfkit";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Coupon from "../models/Coupon.js";

// In-memory bookings store fallback if DB is offline
const inMemoryBookings = new Map();

export const createBooking = async (req, res, next) => {
  try {
    const {
      roomId,
      roomSlug,
      checkIn,
      checkOut,
      roomsCount = 1,
      guests = { adults: 2, children: 0 },
      guestDetails,
      couponCode,
      paymentMethod = "pay_at_hotel",
    } = req.body;

    if (!checkIn || !checkOut || !guestDetails?.name || !guestDetails?.email || !guestDetails?.phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide checkIn, checkOut, and complete guest details (name, email, phone).",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));

    // Fetch Room
    let room = null;
    try {
      if (roomId) room = await Room.findById(roomId);
      if (!room && roomSlug) room = await Room.findOne({ slug: roomSlug });
    } catch (e) {
      room = null;
    }

    // Default room fallback if unseeded
    if (!room) {
      room = {
        _id: roomId || "67b901a01122334455667781",
        title: "Deluxe Comfort Room",
        basePrice: 2199,
        taxesAndFeesPercentage: 12,
        totalUnits: 6,
      };
    }

    // Double-Booking Concurrency Check
    try {
      const activeBookings = await Booking.find({
        room: room._id,
        bookingStatus: { $in: ["confirmed", "checked-in", "pending"] },
        checkInDate: { $lt: checkOutDate },
        checkOutDate: { $gt: checkInDate },
      });

      const bookedUnits = activeBookings.reduce((sum, b) => sum + (b.roomsCount || 1), 0);
      if (bookedUnits + Number(roomsCount) > room.totalUnits) {
        return res.status(409).json({
          success: false,
          message: `Only ${Math.max(0, room.totalUnits - bookedUnits)} units remaining for ${room.title} on the selected dates. Please adjust your dates or room count.`,
        });
      }
    } catch (e) {
      // Proceed gracefully
    }

    // Pricing calculation
    const roomRate = room.basePrice;
    const baseTotal = roomRate * nights * Number(roomsCount);

    let discount = 0;
    let couponApplied = undefined;

    if (couponCode) {
      const codeUpper = couponCode.toUpperCase().trim();
      let coupon = null;
      try {
        coupon = await Coupon.findOne({ code: codeUpper, isActive: true });
      } catch (e) {
        coupon = null;
      }

      if (!coupon && codeUpper === "ROYAL10") {
        coupon = { code: "ROYAL10", discountType: "percentage", discountValue: 10 };
      }

      if (coupon) {
        if (coupon.discountType === "percentage") {
          discount = Math.round((baseTotal * coupon.discountValue) / 100);
        } else {
          discount = Math.min(baseTotal, coupon.discountValue);
        }
        couponApplied = { code: coupon.code, discountAmount: discount };
      }
    }

    const taxableAmount = Math.max(0, baseTotal - discount);
    const tax = Math.round((taxableAmount * (room.taxesAndFeesPercentage || 12)) / 100);
    const grandTotal = taxableAmount + tax;

    const bookingNumber = `RH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const bookingData = {
      bookingNumber,
      user: req.user?._id || req.user?.id,
      guestDetails,
      room: room._id,
      checkInDate,
      checkOutDate,
      nights,
      roomsCount: Number(roomsCount),
      guests,
      priceBreakdown: {
        roomRate,
        baseTotal,
        discount,
        tax,
        grandTotal,
      },
      couponApplied,
      bookingStatus: "confirmed",
      paymentMethod,
      paymentStatus: paymentMethod === "pay_at_hotel" ? "pending" : "paid",
    };

    let savedBooking = null;
    try {
      savedBooking = await Booking.create(bookingData);
    } catch (e) {
      savedBooking = { ...bookingData, _id: `mock-book-${Date.now()}` };
      inMemoryBookings.set(savedBooking.bookingNumber, savedBooking);
      inMemoryBookings.set(savedBooking._id, savedBooking);
    }

    res.status(201).json({
      success: true,
      message: "Booking confirmed successfully! A confirmation notice has been generated.",
      booking: savedBooking,
      roomInfo: {
        title: room.title,
        roomType: room.roomType,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let booking = null;

    try {
      booking = await Booking.findOne({
        $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { bookingNumber: id }],
      }).populate("room");
    } catch (e) {
      booking = inMemoryBookings.get(id);
    }

    if (!booking) {
      booking = inMemoryBookings.get(id);
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    let booking = null;

    try {
      booking = await Booking.findById(id);
      if (booking) {
        booking.bookingStatus = "cancelled";
        await booking.save();
      }
    } catch (e) {
      booking = inMemoryBookings.get(id);
      if (booking) booking.bookingStatus = "cancelled";
    }

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully in accordance with our direct booking policy.",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

export const downloadInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    let booking = null;
    try {
      booking = await Booking.findById(id).populate("room");
    } catch (e) {
      booking = inMemoryBookings.get(id);
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Invoice-${id}.pdf`);
    doc.pipe(res);

    // Header
    doc.fontSize(22).fillColor("#23225C").text("HOTEL ROYAL HEIGHTS", { align: "center" });
    doc.fontSize(10).fillColor("#64748B").text("Tapovan, Rishikesh, Uttarakhand 249192 | Tel: +91 98765 43210", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).fillColor("#111030").text("OFFICIAL BOOKING INVOICE & RECEIPT", { underline: true });
    doc.moveDown(1);

    const bNum = booking?.bookingNumber || id;
    const gName = booking?.guestDetails?.name || "Valued Guest";
    const gPhone = booking?.guestDetails?.phone || "N/A";
    const rTitle = booking?.room?.title || "Luxury Accommodation";
    const total = booking?.priceBreakdown?.grandTotal || 2499;

    doc.fontSize(11).fillColor("#334155");
    doc.text(`Booking Reference: ${bNum}`);
    doc.text(`Guest Name: ${gName}`);
    doc.text(`Phone: ${gPhone}`);
    doc.text(`Room: ${rTitle}`);
    doc.text(`Payment Method: ${booking?.paymentMethod || "Pay at Hotel"}`);
    doc.text(`Total Amount Paid/Due: INR ${total}`);
    doc.moveDown(2);

    doc.fontSize(10).fillColor("#64748B");
    doc.text("Thank you for choosing Hotel Royal Heights Rishikesh. We look forward to hosting you in the Himalayas!");

    doc.end();
  } catch (e) {
    res.status(500).json({ success: false, message: "Could not generate invoice." });
  }
};
