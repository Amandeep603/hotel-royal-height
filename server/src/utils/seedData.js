import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Room from "../models/Room.js";
import Review from "../models/Review.js";
import Coupon from "../models/Coupon.js";
import Settings from "../models/Settings.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    console.log("[Seed] Seeding sample data...");

    // 1. Seed Admin & Guest Users
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash("Admin@12345", salt);
    const guestPasswordHash = await bcrypt.hash("Guest@12345", salt);

    await User.deleteMany({});
    const adminUser = await User.create({
      name: "Hotel Administrator",
      email: "admin@hotelroyalheights.com",
      phone: "+91 98765 43210",
      passwordHash: adminPasswordHash,
      role: "admin",
    });

    const guestUser = await User.create({
      name: "Vikram Malhotra",
      email: "guest@example.com",
      phone: "+91 98100 12345",
      passwordHash: guestPasswordHash,
      role: "guest",
    });
    console.log("[Seed] Users created (admin@hotelroyalheights.com, guest@example.com)");

    // 2. Seed Rooms
    await Room.deleteMany({});
    const createdRooms = await Room.insertMany([
      {
        title: "Deluxe Comfort Room",
        slug: "deluxe-comfort-room",
        roomType: "Deluxe",
        basePrice: 2199,
        discountPrice: 2799,
        taxesAndFeesPercentage: 12,
        capacity: { adults: 2, children: 1, maxGuests: 3 },
        bedType: "Double Bed",
        roomSizeSqFt: 240,
        view: "Tapovan Greens",
        totalUnits: 6,
        tag: "Hot Deal",
        featured: false,
        ratingAverage: 4.7,
        ratingQuantity: 76,
        amenities: ["Free Optical Wi-Fi", "Air Conditioning", "Work Desk", "Hot Water Geyser", "Electric Kettle", "Daily Housekeeping"],
        images: [
          { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", isCover: true, alt: "Deluxe Room" },
          { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Bed" },
          { url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Bathroom" },
        ],
      },
      {
        title: "Super Deluxe Mountain Balcony",
        slug: "super-deluxe-mountain-balcony",
        roomType: "Super Deluxe",
        basePrice: 2899,
        discountPrice: 3499,
        taxesAndFeesPercentage: 12,
        capacity: { adults: 2, children: 1, maxGuests: 3 },
        bedType: "Queen Size Bed",
        roomSizeSqFt: 290,
        view: "Valley Facing Balcony",
        totalUnits: 8,
        tag: "Popular",
        featured: true,
        ratingAverage: 4.8,
        ratingQuantity: 98,
        amenities: ["Private Balcony", "Mountain Views", "Smart LED TV", "Tea/Coffee Maker", "High-Speed Wi-Fi", "Air Conditioning", "Room Service"],
        images: [
          { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", isCover: true, alt: "Super Deluxe" },
          { url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Balcony" },
          { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Interior" },
        ],
      },
      {
        title: "Executive Ganga View Suite",
        slug: "executive-ganga-view-suite",
        roomType: "Executive Suite",
        basePrice: 3999,
        discountPrice: 4999,
        taxesAndFeesPercentage: 12,
        capacity: { adults: 2, children: 1, maxGuests: 3 },
        bedType: "King Size Bed",
        roomSizeSqFt: 360,
        view: "Sacred Ganges & Mountain View",
        totalUnits: 5,
        tag: "Featured",
        featured: true,
        ratingAverage: 4.9,
        ratingQuantity: 142,
        amenities: ["Panoramic Ganges View", "Spacious Private Balcony", "King Plush Bedding", "Seating Lounge Area", "Complimentary Breakfast", "Fast 200 Mbps Wi-Fi", "Mini Refrigerator"],
        images: [
          { url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80", isCover: true, alt: "Executive Suite" },
          { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Bed" },
          { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "View" },
        ],
      },
      {
        title: "Royal Family Himalayan Suite",
        slug: "royal-family-himalayan-suite",
        roomType: "Family Suite",
        basePrice: 5499,
        discountPrice: 6799,
        taxesAndFeesPercentage: 12,
        capacity: { adults: 4, children: 2, maxGuests: 6 },
        bedType: "2 King Size Beds",
        roomSizeSqFt: 520,
        view: "360° Himalayan Mountain View",
        totalUnits: 4,
        tag: "New",
        featured: true,
        ratingAverage: 5.0,
        ratingQuantity: 54,
        amenities: ["Two Interconnected King Bedrooms", "Double Mountain Balconies", "Living Room Lounge", "Mini Refrigerator", "Dining Corner", "Two Private Bathrooms", "Rooftop Cafe Access"],
        images: [
          { url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80", isCover: true, alt: "Family Suite" },
          { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Master Bed" },
          { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Balcony" },
        ],
      },
    ]);
    console.log(`[Seed] Seeded ${createdRooms.length} rooms`);

    // 3. Seed Reviews
    await Review.deleteMany({});
    await Review.insertMany([
      {
        room: createdRooms[2]._id,
        user: guestUser._id,
        authorName: "Aarav & Priya Sharma",
        location: "New Delhi",
        rating: 5,
        title: "Magical Ganga View Suite",
        comment: "The Ganga View suite exceeded all our expectations! Waking up to the morning bells and tea on the balcony was pure magic.",
        travelerType: "Couple",
        isApproved: true,
      },
      {
        room: createdRooms[1]._id,
        authorName: "Marcus Vance",
        location: "Melbourne, Australia",
        rating: 5,
        title: "Top retreat for yogis in Tapovan",
        comment: "Reliable fiber internet, peaceful rooftop, super clean rooms, and genuine Garhwali hospitality.",
        travelerType: "Solo",
        isApproved: true,
      },
      {
        room: createdRooms[3]._id,
        authorName: "Rohit Deshmukh",
        location: "Mumbai",
        rating: 5,
        title: "Spacious Family Suite & Rafting Assistance",
        comment: "Very spacious, impeccable hygiene, and great vegetarian food at the rooftop cafe.",
        travelerType: "Family",
        isApproved: true,
      },
    ]);
    console.log("[Seed] Seeded reviews");

    // 4. Seed Coupon
    await Coupon.deleteMany({});
    await Coupon.create({
      code: "ROYAL10",
      discountType: "percentage",
      discountValue: 10,
      minBookingAmount: 1500,
      usageLimit: 500,
      isActive: true,
    });
    console.log("[Seed] Seeded coupon ROYAL10");

    // 5. Seed Settings
    await Settings.deleteMany({});
    await Settings.create({
      hotelName: "Hotel Royal Heights",
      tagline: "Awaken to Himalayan Mist & Sacred Ganges Peace",
      contactPhone: "+91 98765 43210",
      contactEmail: "reservations@hotelroyalheights.com",
      address: "Badrinath National Highway, Upper Tapovan, Rishikesh 249192",
      checkInTime: "12:00 PM",
      checkOutTime: "11:00 AM",
      cancellationPolicyText: "Free cancellation up to 48 hours prior to arrival.",
      razorpayEnabled: false,
    });
    console.log("[Seed] Seeded site settings");

    console.log("[Seed] ✅ Database seeding finished successfully!");
    process.exit(0);
  } catch (err) {
    console.error("[Seed Error]", err);
    process.exit(1);
  }
};

seed();
