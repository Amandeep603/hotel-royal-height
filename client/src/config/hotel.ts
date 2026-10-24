// Centralized Hotel Configuration File
// Every property-specific value resides here for one-stop customization.

export const hotelConfig = {
  // Brand & Identity (Reads NEXT_PUBLIC_HOTEL_NAME from environment)
  name: process.env.NEXT_PUBLIC_HOTEL_NAME || "Hotel Royal Heights",
  tagline: "Awaken to Himalayan Mist & Sacred Ganges Peace",
  location: "Tapovan, Rishikesh, Uttarakhand, India",
  description:
    "An intimate luxury retreat situated in the tranquil hills of Tapovan, offering panoramic Himalayan vistas, rooftop vegetarian dining, daily morning yoga, and personalized river rafting assistance.",

  // Contact Information
  contact: {
    phone: "+91 98765 43210",
    phoneSecondary: "+91 98765 43211",
    email: "reservations@hotelroyalheights.com",
    supportEmail: "info@hotelroyalheights.com",
    address: {
      street: "Badrinath National Highway, Upper Tapovan",
      city: "Rishikesh",
      state: "Uttarakhand",
      postalCode: "249192",
      country: "India",
      landmark: "Near Tapovan Auto Stand & 1.5 km from Laxman Jhula",
    },
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13816.273752187396!2d78.31885834999999!3d30.13459955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390916ff469a47ef%3A0x86c2e3919e344186!2sTapovan%2C%20Rishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      tripadvisor: "https://tripadvisor.com",
    },
  },

  // Operational Timings & Policies
  timings: {
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    breakfastHours: "7:30 AM – 10:30 AM",
    reception: "24 Hours Open",
    quietHours: "10:30 PM – 6:00 AM",
  },

  policies: {
    cancellation:
      "Free cancellation or rescheduling up to 48 hours prior to arrival. Cancellations made within 48 hours incur a 1-night retention fee.",
    childrenAndExtraBeds:
      "Children up to 5 years stay free using existing beds. Extra bed/mattress available on request for ₹800/night.",
    petPolicy: "Pets are not permitted in guest rooms to preserve allergy-free environments.",
    smoking: "All indoor rooms and suites are strictly non-smoking. Designated outdoor balcony zones available.",
    idRequirements: "Valid government-issued photo ID (Aadhaar, Passport, Voter ID or Driving License) required at check-in for all adult guests.",
  },

  // Color Tokens
  colors: {
    primaryNavy: "#23225C",
    primaryNavyHover: "#191845",
    accentLavender: "#EEF0FC",
    accentLavenderBadge: "#6B6FEA",
    background: "#F8F9FC",
  },

  // Standard Room Catalog
  roomCategories: [
    {
      id: "deluxe-comfort",
      slug: "deluxe-comfort-room",
      title: "Deluxe Comfort Room",
      type: "Deluxe",
      basePrice: 2199,
      originalPrice: 2799,
      taxesPercentage: 12,
      capacity: { adults: 2, children: 1, maxGuests: 3 },
      bedType: "Double Bed",
      sizeSqFt: 240,
      view: "Tapovan Greens",
      totalUnits: 6,
      featured: false,
      amenities: [
        "Free Optical Wi-Fi",
        "Air Conditioning",
        "Work Desk",
        "Hot Water Geyser",
        "Electric Kettle",
        "Daily Housekeeping",
      ],
    },
    {
      id: "super-deluxe-balcony",
      slug: "super-deluxe-mountain-balcony",
      title: "Super Deluxe Mountain Balcony",
      type: "Super Deluxe",
      basePrice: 2899,
      originalPrice: 3499,
      taxesPercentage: 12,
      capacity: { adults: 2, children: 1, maxGuests: 3 },
      bedType: "Queen Size Bed",
      sizeSqFt: 290,
      view: "Valley Facing Balcony",
      totalUnits: 8,
      featured: true,
      amenities: [
        "Private Balcony",
        "Mountain Views",
        "Smart LED TV",
        "Tea/Coffee Maker",
        "High-Speed Wi-Fi",
        "Air Conditioning",
        "Room Service",
      ],
    },
    {
      id: "executive-ganga-view",
      slug: "executive-ganga-view-suite",
      title: "Executive Ganga View Suite",
      type: "Executive Suite",
      basePrice: 3999,
      originalPrice: 4999,
      taxesPercentage: 12,
      capacity: { adults: 2, children: 1, maxGuests: 3 },
      bedType: "King Size Bed",
      sizeSqFt: 360,
      view: "Sacred Ganges & Mountain View",
      totalUnits: 5,
      featured: true,
      amenities: [
        "Panoramic Ganges View",
        "Spacious Private Balcony",
        "King Plush Bedding",
        "Seating Lounge Area",
        "Complimentary Breakfast",
        "Fast 200 Mbps Wi-Fi",
        "Mini Refrigerator",
      ],
    },
    {
      id: "royal-family-suite",
      slug: "royal-family-himalayan-suite",
      title: "Royal Family Himalayan Suite",
      type: "Family Suite",
      basePrice: 5499,
      originalPrice: 6799,
      taxesPercentage: 12,
      capacity: { adults: 4, children: 2, maxGuests: 6 },
      bedType: "2 King Size Beds",
      sizeSqFt: 520,
      view: "360° Himalayan Mountain View",
      totalUnits: 4,
      featured: true,
      amenities: [
        "Two Interconnected King Bedrooms",
        "Double Mountain Balconies",
        "Living Room Lounge",
        "Mini Refrigerator",
        "Dining Corner",
        "Two Private Bathrooms",
        "Rooftop Cafe Access",
      ],
    },
  ],

  // Property Features
  amenities: [
    { title: "Rooftop Mountain Cafe", icon: "Coffee" },
    { title: "Daily Morning Yoga Lawn", icon: "Sparkles" },
    { title: "High-Speed Optical Wi-Fi", icon: "Wifi" },
    { title: "Travel & Rafting Concierge", icon: "Compass" },
    { title: "24/7 Power Backup & Hot Water", icon: "Flame" },
    { title: "On-Site Secured Free Parking", icon: "Car" },
    { title: "24-Hour Room Service", icon: "Utensils" },
    { title: "Doctor on Call", icon: "HeartPulse" },
  ],
};

export default hotelConfig;
