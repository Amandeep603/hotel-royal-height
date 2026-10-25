import { hotelImages } from "./images";

export interface RoomItem {
  id: string;
  slug: string;
  title: string;
  category: "Suite" | "Deluxe" | "Family";
  categoryLabel: string;
  badge: "Featured" | "Popular" | "Hot Deal" | "New";
  badgeColor: string;
  price: number;
  originalPrice: number;
  taxes: number;
  capacityText: string;
  sizeText: string;
  bedText: string;
  view: string;
  rating: string;
  images: string[];
  amenities: string[];
  description: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  city: string;
  initials: string;
  rating: number;
  quote: string;
  date: string;
}

export interface FacilityItem {
  title: string;
  description: string;
  icon: string;
  bgClass: string;
}

export interface HighlightItem {
  title: string;
  subtitle: string;
  icon: string;
  bgClass: string;
}

export interface ExploreItem {
  id: string;
  title: string;
  distance: string;
  line: string;
  image: string;
}

export interface LandmarkItem {
  name: string;
  distance: string;
  time: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TabItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  caption: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src: string;
}

const facilitiesList: FacilityItem[] = [
  {
    title: "Rooftop Mountain Cafe",
    description: "Open-air dining with 360° Himalayan views serving fresh Garhwali, North Indian, and wholesome Sattvic cuisine daily.",
    icon: "Coffee",
    bgClass: "bg-amber-100 text-amber-700",
  },
  {
    title: "Morning Yoga Lawn",
    description: "Complimentary guided sunrise yoga and breathwork sessions on the manicured lawn facing the sacred river breeze.",
    icon: "Sparkles",
    bgClass: "bg-purple-100 text-purple-700",
  },
  {
    title: "High-Speed Wi-Fi",
    description: "Enterprise-grade 200 Mbps optical fiber coverage across all suites and common areas for seamless workations.",
    icon: "Wifi",
    bgClass: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Travel & Adventure Desk",
    description: "Direct coordination for certified Shivpuri river rafting, scooter hire, airport taxis, and evening Ganga Aarti cabs.",
    icon: "Compass",
    bgClass: "bg-sky-100 text-sky-700",
  },
  {
    title: "Hot Water & Power Backup",
    description: "Automated geysers for hot showers after river rafting, backed by 100% silent power generators.",
    icon: "Flame",
    bgClass: "bg-rose-100 text-rose-700",
  },
  {
    title: "Free Private Parking",
    description: "Dedicated secured on-site parking space for personal cars and motorbikes with round-the-clock CCTV surveillance.",
    icon: "Car",
    bgClass: "bg-emerald-100 text-emerald-700",
  },
];

const quickHighlightsList: HighlightItem[] = [
  {
    title: "Best Rate Guarantee",
    subtitle: "Direct booking price with zero agent commissions.",
    icon: "Sparkles",
    bgClass: "bg-amber-100 text-amber-700",
  },
  {
    title: "Free 48h Cancellation",
    subtitle: "Full refund or hassle-free date modification.",
    icon: "ShieldCheck",
    bgClass: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Ganga View Balconies",
    subtitle: "Private sit-outs facing the holy river & morning mist.",
    icon: "Mountain",
    bgClass: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "24/7 Front Reception",
    subtitle: "Round-the-clock check-in, cabs & tour concierge.",
    icon: "Clock",
    bgClass: "bg-sky-100 text-sky-700",
  },
];

const reviewsList: ReviewItem[] = [
  {
    id: "r1",
    name: "Aarav Sharma",
    city: "New Delhi",
    initials: "AS",
    rating: 5,
    date: "October 2026",
    quote: "The Ganga View suite was breathtaking. Waking up to river mist and morning tea on the private balcony was absolute bliss. Front desk arranged our rafting trip effortlessly.",
  },
  {
    id: "r2",
    name: "Marcus Vance",
    city: "Melbourne",
    initials: "MV",
    rating: 5,
    date: "September 2026",
    quote: "Spent 10 days during yoga teacher training in Tapovan. High-speed Wi-Fi never failed, the room was spotless, and the rooftop cafe food was fresh and healthy.",
  },
  {
    id: "r3",
    name: "Rohit Deshmukh",
    city: "Mumbai",
    initials: "RD",
    rating: 5,
    date: "October 2026",
    quote: "Booked the Family Suite for our family vacation. Very spacious, peaceful ambiance away from traffic, and direct WhatsApp booking was seamless.",
  },
];

const roomsCatalog: RoomItem[] = [
  {
    id: "executive-ganga-view-suite",
    slug: "executive-ganga-view-suite",
    title: "Executive Ganga View Suite",
    category: "Suite",
    categoryLabel: "Signature Ganga View",
    badge: "Featured",
    badgeColor: "bg-[#1B1B4B] text-white",
    price: 3999,
    originalPrice: 4999,
    taxes: 480,
    capacityText: "2 Adults",
    sizeText: "360 sq ft",
    bedText: "King Bed",
    view: "Ganga River & Valley View",
    rating: "4.9",
    images: hotelImages.rooms.executiveSuite.photos,
    amenities: [
      "River View Balcony",
      "High-Speed Wi-Fi",
      "Complimentary Breakfast",
      "Teak Sit-out",
      "24h Hot Water",
    ],
    description: "Perched on the upper floor with an expansive private balcony overlooking the turquoise Ganga and the mist-covered Shivalik mountain peaks.",
  },
  {
    id: "super-deluxe-mountain-balcony",
    slug: "super-deluxe-mountain-balcony",
    title: "Super Deluxe Mountain Balcony",
    category: "Deluxe",
    categoryLabel: "Mountain Balcony",
    badge: "Popular",
    badgeColor: "bg-[#C9A24B] text-white",
    price: 2999,
    originalPrice: 3799,
    taxes: 360,
    capacityText: "2 Adults",
    sizeText: "310 sq ft",
    bedText: "Queen Bed",
    view: "Pine Hills & Sunrise View",
    rating: "4.9",
    images: hotelImages.rooms.superDeluxe.photos,
    amenities: [
      "Mountain Sit-out",
      "High-Speed Wi-Fi",
      "Electric Kettle",
      "Silent AC",
      "Smart TV",
    ],
    description: "A bright, airy room featuring warm wooden accents, plush bedding, and a peaceful private balcony facing lush Himalayan pine forests.",
  },
  {
    id: "royal-family-himalayan-suite",
    slug: "royal-family-himalayan-suite",
    title: "Royal Family Himalayan Suite",
    category: "Family",
    categoryLabel: "Family Retreat",
    badge: "Hot Deal",
    badgeColor: "bg-[#1B1B4B] text-white",
    price: 5499,
    originalPrice: 6899,
    taxes: 660,
    capacityText: "4 Adults",
    sizeText: "520 sq ft",
    bedText: "2 King Beds",
    view: "Dual Mountain & Valley View",
    rating: "4.9",
    images: hotelImages.rooms.familySuite.photos,
    amenities: [
      "2 King Bedrooms",
      "Dual Balconies",
      "Living Lounge",
      "Mini Fridge",
      "Daily Housekeeping",
    ],
    description: "Designed for families and groups with two interconnecting bedrooms, generous lounge space, and dual panoramic balconies.",
  },
  {
    id: "deluxe-comfort-room",
    slug: "deluxe-comfort-room",
    title: "Deluxe Comfort Garden Room",
    category: "Deluxe",
    categoryLabel: "Garden Wing",
    badge: "New",
    badgeColor: "bg-emerald-600 text-white",
    price: 2299,
    originalPrice: 2899,
    taxes: 275,
    capacityText: "2 Adults",
    sizeText: "260 sq ft",
    bedText: "Double Bed",
    view: "Garden & Inner Courtyard",
    rating: "4.8",
    images: hotelImages.rooms.deluxeComfort.photos,
    amenities: [
      "Garden Outlook",
      "High-Speed Wi-Fi",
      "Hot Shower Geyser",
      "Tea & Coffee Kit",
    ],
    description: "A peaceful retreat for solo travelers and couples seeking tranquility, fast Wi-Fi, and quick walking access to Tapovan yoga studios.",
  },
];

const virtualTourTabs: TabItem[] = [
  {
    id: "suite",
    title: "Executive Suite",
    subtitle: "Panoramic Valley Balcony",
    image: hotelImages.panoramas.suite,
    caption: "King bedroom with floor-to-ceiling glass sliding doors opening onto your private river-view deck.",
  },
  {
    id: "rooftop",
    title: "Rooftop Cafe",
    subtitle: "Open-Air Himalayan Dining",
    image: hotelImages.panoramas.rooftop,
    caption: "Scenic rooftop terrace serving freshly brewed mountain coffee and Sattvic delicacies under open skies.",
  },
  {
    id: "lobby",
    title: "Lobby Lounge",
    subtitle: "Warm Himalayan Welcome",
    image: hotelImages.panoramas.lobby,
    caption: "Contemporary check-in lounge decorated with local Uttarakhand craft, warm woods, and tea concierge.",
  },
  {
    id: "balcony",
    title: "Balcony View",
    subtitle: "Morning Himalayan Mist",
    image: hotelImages.panoramas.balcony,
    caption: "Private balcony outlook capturing morning bells, fresh pine breezes, and river serenity.",
  },
];

const exploreList: ExploreItem[] = [
  {
    id: "rafting",
    title: "River Rafting in the Rapids",
    distance: "12 km from hotel",
    line: "Tackle Grade III & IV rapids at Shivpuri guided by certified rescue river captains.",
    image: hotelImages.explore.rafting,
  },
  {
    id: "aarti",
    title: "Ganga Aarti at Triveni Ghat",
    distance: "4.2 km from hotel",
    line: "Experience the divine evening oil lamp ceremony echoing with chants and temple bells.",
    image: hotelImages.explore.aarti,
  },
  {
    id: "laxman-jhula",
    title: "Laxman Jhula & Tapovan",
    distance: "1.5 km (Walkable)",
    line: "Wander across the historic suspension bridge to ashrams, yoga schools, and organic bakeries.",
    image: hotelImages.explore.laxmanJhula,
  },
  {
    id: "yoga",
    title: "Yoga & Sound Meditation",
    distance: "On Property Lawn",
    line: "Ground your mind with guided pranayama and singing bowl sessions in fresh Himalayan air.",
    image: hotelImages.explore.yoga,
  },
];

const landmarksList: LandmarkItem[] = [
  { name: "Tapovan Main Market & Bakeries", distance: "200 m", time: "2 min walk" },
  { name: "Laxman Jhula Suspension Bridge", distance: "1.5 km", time: "15 min walk" },
  { name: "Ram Jhula & Swarg Ashram", distance: "2.8 km", time: "8 min ride" },
  { name: "Triveni Ghat Evening Aarti", distance: "4.2 km", time: "12 min ride" },
  { name: "Dehradun Jolly Grant Airport (DED)", distance: "21 km", time: "35 min drive" },
];

const faqsList: FAQItem[] = [
  {
    question: "What are the check-in and check-out timings?",
    answer: "Standard check-in is 12:00 PM and check-out is 11:00 AM. Early check-in or late check-out is subject to room availability, with complimentary luggage storage available 24/7.",
  },
  {
    question: "How far is the hotel from Laxman Jhula and the river?",
    answer: "Hotel Royal Heights is located in Upper Tapovan, approximately 1.5 km (a gentle 12-15 minute walk or 3-minute ride) from Laxman Jhula and the sacred riverside ghats.",
  },
  {
    question: "Is complimentary on-site parking available?",
    answer: "Yes, we provide secure, free on-site private parking for guest cars and motorbikes with 24/7 CCTV surveillance.",
  },
  {
    question: "Can the hotel arrange white-water river rafting and local cabs?",
    answer: "Yes! Our front desk travel concierge coordinates licensed Shivpuri rafting trips, airport transfers from Dehradun (DED), scooter rentals, and cabs for Triveni Ghat Aarti.",
  },
  {
    question: "What is the cancellation policy for direct bookings?",
    answer: "Bookings made directly via our website or WhatsApp enjoy 100% free cancellation or date modification up to 48 hours prior to arrival.",
  },
  {
    question: "Does the rooftop cafe serve pure vegetarian and Sattvic food?",
    answer: "Yes, our rooftop cafe prepares freshly made North Indian, Continental, and wholesome Sattvic meals with organic ingredients. No onion/garlic options are available on request.",
  },
];

export const siteConfig = {
  hotelName: "Hotel Royal Heights Rishikesh",
  
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    whatsappLink: "https://wa.me/919876543210",
    email: "reservations@hotelroyalheights.com",
    address: "Upper Tapovan, Badrinath Road, Rishikesh, Uttarakhand 249192, India",
  },

  location: {
    address: "Upper Tapovan, Badrinath Road, Rishikesh, Uttarakhand 249192, India",
    checkIn: "12:00 PM",
    checkOut: "11:00 AM",
    googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13816.273752187396!2d78.31885834999999!3d30.13459955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390916ff469a47ef%3A0x86c2e3919e344186!2sTapovan%2C%20Rishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },

  hotel: {
    name: "Hotel Royal Heights",
    tagline: "Wake Up to the Ganga & the Himalayas",
    shortDescription: "Boutique sanctuary in Upper Tapovan, Rishikesh with scenic mountain balconies, rooftop dining, and daily morning yoga.",
    address: {
      street: "Upper Tapovan, Badrinath Road",
      city: "Rishikesh",
      state: "Uttarakhand",
      postalCode: "249192",
    },
    contact: {
      phone: "+91 98765 43210",
      whatsApp: "+91 98765 43210",
      whatsAppDisplay: "+91 98765 43210",
      email: "reservations@hotelroyalheights.com",
    },
    timings: {
      checkIn: "12:00 PM",
      checkOut: "11:00 AM",
      reception: "24/7 Front Desk",
    },
    maps: {
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13816.273752187396!2d78.31885834999999!3d30.13459955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390916ff469a47ef%3A0x86c2e3919e344186!2sTapovan%2C%20Rishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      directUrl: "https://maps.google.com/?q=Tapovan+Rishikesh+Uttarakhand",
    },
  },

  // D. Quick Highlights
  quickHighlights: quickHighlightsList,
  trustFeatures: quickHighlightsList,

  stats: [
    { value: 4.9, label: "Guest Rating" },
    { value: 1200, label: "Happy Pilgrims" },
    { value: 24, label: "Boutique Suites" },
    { value: 100, label: "River Facing" },
  ],

  // Why Choose Us
  whyChooseUs: {
    eyebrow: "WHY CHOOSE ROYAL HEIGHTS",
    title: "More Than Just A Hotel, A Spiritual Haven",
    subtitle: "We offer more than just spaces. We deliver authentic Rishikesh experiences with Himalayan vistas, wholesome dining, and quiet tranquility.",
    points: [
      "Panoramic Ganges & Valley facing private balconies with teak sit-outs",
      "Daily complimentary morning yoga & meditation on the manicured lawn",
      "Freshly prepared North Indian, Continental & Sattvic dining at the rooftop cafe",
      "Walking distance to Tapovan organic bakeries, cafes and sacred river ghats",
    ],
    ratingStat: "4.9",
    ratingSubtitle: "Based on direct verified guest reviews",
    image: hotelImages.whyChoose,
  },

  // E. Rooms
  rooms: roomsCatalog,

  // F. 360 Tour
  virtualTour: {
    tabs: virtualTourTabs,
  },

  // G. Facilities
  facilities: facilitiesList,
  amenities: facilitiesList,

  // H. Explore Rishikesh
  explore: exploreList,

  // I. Gallery
  gallery: hotelImages.gallery as GalleryItem[],

  // J. Guest Reviews (SAMPLE - replace with real Google reviews before launch)
  reviewsSummary: {
    rating: "4.9",
    totalStars: 5,
    subtitle: "Based on verified guest reviews",
    sources: ["Google Reviews", "Booking.com"],
  },
  reviews: reviewsList,
  testimonials: reviewsList,

  // K. Nearby Landmarks
  landmarks: landmarksList,

  // L. FAQs
  faqs: faqsList,
};

export default siteConfig;
