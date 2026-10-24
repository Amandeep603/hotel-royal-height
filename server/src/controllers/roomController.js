import Room from "../models/Room.js";

// Default catalog fallback in case DB is unseeded
const DEFAULT_ROOMS = [
  {
    _id: "67b901a01122334455667781",
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
      { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", isCover: true, alt: "Deluxe Room Main View" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Deluxe Bed Detail" },
      { url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Deluxe Bathroom" },
    ],
  },
  {
    _id: "67b901a01122334455667782",
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
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", isCover: true, alt: "Super Deluxe Room" },
      { url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Super Deluxe Balcony" },
      { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Super Deluxe Interior" },
    ],
  },
  {
    _id: "67b901a01122334455667783",
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
      { url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80", isCover: true, alt: "Executive Ganga View Suite" },
      { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Executive Suite Bed" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Executive Suite View" },
    ],
  },
  {
    _id: "67b901a01122334455667784",
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
      { url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80", isCover: true, alt: "Family Suite Living" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Family Suite Master Bed" },
      { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80", isCover: false, alt: "Family Suite Balcony" },
    ],
  },
];

export const getRooms = async (req, res, next) => {
  try {
    const { roomType, minPrice, maxPrice, adults, sort, featured } = req.query;

    let query = { status: "active" };

    if (roomType && roomType !== "all") {
      query.roomType = roomType;
    }
    if (featured === "true") {
      query.featured = true;
    }
    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = Number(minPrice);
      if (maxPrice) query.basePrice.$lte = Number(maxPrice);
    }
    if (adults) {
      query["capacity.adults"] = { $gte: Number(adults) };
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { basePrice: 1 };
    if (sort === "price_desc") sortOption = { basePrice: -1 };
    if (sort === "rating") sortOption = { ratingAverage: -1 };

    let rooms = [];
    try {
      rooms = await Room.find(query).sort(sortOption);
    } catch (e) {
      rooms = [];
    }

    if (!rooms || rooms.length === 0) {
      // Return filtered default rooms
      rooms = DEFAULT_ROOMS.filter((r) => {
        if (roomType && roomType !== "all" && r.roomType !== roomType) return false;
        if (featured === "true" && !r.featured) return false;
        if (minPrice && r.basePrice < Number(minPrice)) return false;
        if (maxPrice && r.basePrice > Number(maxPrice)) return false;
        if (adults && r.capacity.adults < Number(adults)) return false;
        return true;
      });
    }

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let room = null;

    try {
      room = await Room.findOne({ slug });
    } catch (e) {
      room = null;
    }

    if (!room) {
      room = DEFAULT_ROOMS.find((r) => r.slug === slug);
    }

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room category not found.",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    next(error);
  }
};
