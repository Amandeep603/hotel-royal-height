// Centralized local image dictionary
// All images are stored locally in /public/images/ and /public/panoramas/ for instant loading and offline reliability.
// Client can replace files directly in /public/images/ or update paths here.

const roomsData: Record<string, any> = {
  executiveSuite: {
    cover: "/images/room-executive-suite-1.jpg",
    photos: [
      "/images/room-executive-suite-1.jpg",
      "/images/room-executive-suite-2.jpg",
      "/images/room-executive-suite-3.jpg",
    ],
  },
  superDeluxe: {
    cover: "/images/room-super-deluxe-1.jpg",
    photos: [
      "/images/room-super-deluxe-1.jpg",
      "/images/room-super-deluxe-2.jpg",
      "/images/room-super-deluxe-3.jpg",
    ],
  },
  familySuite: {
    cover: "/images/room-family-suite-1.jpg",
    photos: [
      "/images/room-family-suite-1.jpg",
      "/images/room-family-suite-2.jpg",
      "/images/room-family-suite-3.jpg",
    ],
  },
  deluxeComfort: {
    cover: "/images/room-deluxe-comfort-1.jpg",
    photos: [
      "/images/room-deluxe-comfort-1.jpg",
      "/images/room-deluxe-comfort-2.jpg",
    ],
  },
  // Backward compatibility keys for subpages
  deluxe: {
    cover: "/images/room-deluxe-comfort-1.jpg",
    photos: [
      "/images/room-deluxe-comfort-1.jpg",
      "/images/room-deluxe-comfort-2.jpg",
    ],
  },
  riverViewSuite: {
    cover: "/images/room-executive-suite-1.jpg",
    photos: [
      "/images/room-executive-suite-1.jpg",
      "/images/room-executive-suite-2.jpg",
      "/images/room-executive-suite-3.jpg",
    ],
  },
  suite: [
    "/images/room-executive-suite-1.jpg",
    "/images/room-executive-suite-2.jpg",
    "/images/room-executive-suite-3.jpg",
  ],
};

export const hotelImages: Record<string, any> = {
  // Brand Assets
  logo: "/logo.svg",

  // Hero & Banners
  hero: "/images/hero-rishikesh-ganga.jpg",
  heroBanner: "/images/hero-rishikesh-ganga.jpg",
  whyChoose: "/images/why-choose-hotel.jpg",
  ctaBanner: "/images/cta-banner.jpg",
  hotelExterior: "/images/gallery-exterior.jpg",
  lobby: "/images/gallery-lobby.jpg",
  rooftopCafe: "/images/gallery-rooftop-cafe.jpg",

  // Rooms Catalog (Local Verified Indian Boutique Hotel Rooms)
  rooms: roomsData,

  // Explore Rishikesh (Authentic Local Places & Activities)
  explore: {
    rafting: "/images/explore-rafting.jpg",
    aarti: "/images/explore-aarti.jpg",
    laxmanJhula: "/images/explore-laxman-jhula.jpg",
    yoga: "/images/explore-yoga.jpg",
  },

  // Attractions alias for attractions subpage/components
  attractions: [
    { title: "River Rafting in the Rapids", image: "/images/explore-rafting.jpg", distance: "12 km" },
    { title: "Ganga Aarti at Triveni Ghat", image: "/images/explore-aarti.jpg", distance: "4.2 km" },
    { title: "Laxman Jhula Suspension Bridge", image: "/images/explore-laxman-jhula.jpg", distance: "1.5 km" },
    { title: "Yoga & Sound Meditation", image: "/images/explore-yoga.jpg", distance: "On Property" },
  ],

  // Categorized Photo Gallery
  gallery: [
    { id: "g1", title: "Executive Ganga View Suite", category: "Rooms", src: "/images/room-executive-suite-1.jpg" },
    { id: "g2", title: "Rooftop Evening Cafe", category: "Dining", src: "/images/gallery-rooftop-cafe.jpg" },
    { id: "g3", title: "Himalayan Sunrise Mist", category: "Views", src: "/images/gallery-himalayan-mist.jpg" },
    { id: "g4", title: "Super Deluxe Balcony Suite", category: "Rooms", src: "/images/room-super-deluxe-1.jpg" },
    { id: "g5", title: "Shivpuri River Rafting", category: "Views", src: "/images/explore-rafting.jpg" },
    { id: "g6", title: "Hotel Exterior & Mountain Ridge", category: "Views", src: "/images/gallery-exterior.jpg" },
    { id: "g7", title: "Reception & Concierge Lounge", category: "Rooms", src: "/images/gallery-lobby.jpg" },
    { id: "g8", title: "Family Himalayan Suite", category: "Rooms", src: "/images/room-family-suite-1.jpg" },
  ],

  // 360 Equirectangular Panoramas (2:1 Ratio for Panorama Viewers)
  // TODO: Replace sample equirectangular panoramas with actual hotel 360 shots before public production launch
  panoramas: {
    suite: "/panoramas/suite.jpg",
    rooftop: "/panoramas/rooftop.jpg",
    lobby: "/panoramas/lobby.jpg",
    balcony: "/panoramas/balcony.jpg",
  },
};

export default hotelImages;
