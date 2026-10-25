"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import QuickHighlights from "@/components/home/QuickHighlights";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import VirtualTourSection from "@/components/home/VirtualTourSection";
import Facilities from "@/components/home/Facilities";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import GallerySection from "@/components/home/GallerySection";
import GuestReviews from "@/components/home/GuestReviews";
import LocationContactSection from "@/components/home/LocationContactSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import WhatsAppBookingModal from "@/components/home/WhatsAppBookingModal";
import VirtualTourModal from "@/components/home/VirtualTourModal";
import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import StickyMobileBookBar from "@/components/layout/StickyMobileBookBar";
import siteConfig from "@/data/site";

export default function HomePage() {
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [selectedRoomTitle, setSelectedRoomTitle] = useState(siteConfig.rooms[0].title);
  const [selectedPrice, setSelectedPrice] = useState(siteConfig.rooms[0].price);

  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [tourRoomTitle, setTourRoomTitle] = useState(siteConfig.rooms[0].title);
  const [tourRoomImage, setTourRoomImage] = useState(siteConfig.rooms[0].images[0]);

  // Handle global booking modal trigger from navbar or buttons
  useEffect(() => {
    const handleOpenModal = () => {
      setWhatsAppModalOpen(true);
    };

    window.addEventListener("open-booking-modal", handleOpenModal);
    return () => window.removeEventListener("open-booking-modal", handleOpenModal);
  }, []);

  const handleOpenWhatsApp = (roomTitle?: string, price?: number) => {
    if (roomTitle) setSelectedRoomTitle(roomTitle);
    if (price) setSelectedPrice(price);
    setWhatsAppModalOpen(true);
  };

  const handleOpen360 = (roomTitle?: string, image?: string) => {
    if (roomTitle) setTourRoomTitle(roomTitle);
    if (image) setTourRoomImage(image);
    setTourModalOpen(true);
  };

  return (
    <div className="flex flex-col bg-[#FAF9F7] min-h-screen">
      {/* 1. Hero (Single rounded-[32px] daytime photo card, 2-line title, grid search inside bottom) */}
      <Hero />

      {/* 2. Quick Highlights (Compact row of 4 pastel circle items, no fake stats) */}
      <QuickHighlights />

      {/* 3. Why Choose Us (Boutique Himalayan hospitality narrative + rounded image) */}
      <WhyChooseUs />

      {/* 4. Rooms (Exactly 3 featured cards in a row + View All toggle) */}
      <FeaturedRooms 
        onOpenWhatsApp={handleOpenWhatsApp} 
        onOpen360={handleOpen360} 
      />

      {/* 5. 360° Virtual Tour (Navy section, real Three.js equirectangular sphere) */}
      <VirtualTourSection />

      {/* 6. Facilities (6 compact cards in 3x2 grid with pastel rounded icons) */}
      <Facilities />

      {/* 7. Explore Rishikesh (4 image cards with actual Rishikesh photos) */}
      <ExperiencesSection />

      {/* 8. Gallery (8 images in responsive 2-col/4-col grid with lightbox) */}
      <GallerySection />

      {/* 9. Guest Reviews (Summary card + 3 short review cards with initials) */}
      <GuestReviews />

      {/* 10. Location + Contact (Clean rows of 5 landmarks + Google Maps embed) */}
      <LocationContactSection />

      {/* 11. FAQ (6 smooth accordion questions) */}
      <FAQSection />

      {/* 12. Final CTA (Slim bright banner: image + WhatsApp & Call buttons) */}
      <FinalCTA />

      {/* Floating WhatsApp Action Button with real WhatsApp logo & hover tooltip */}
      <FloatingWhatsAppButton onOpenModal={() => handleOpenWhatsApp()} />

      {/* Sticky Mobile Bar with Call & WhatsApp buttons */}
      <StickyMobileBookBar onOpenWhatsApp={() => handleOpenWhatsApp()} />

      {/* Instant WhatsApp Booking Modal */}
      <WhatsAppBookingModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
        initialRoomTitle={selectedRoomTitle}
        initialPrice={selectedPrice}
      />

      {/* 360° Lightbox Modal */}
      <VirtualTourModal
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
        roomTitle={tourRoomTitle}
        image={tourRoomImage}
      />
    </div>
  );
}
