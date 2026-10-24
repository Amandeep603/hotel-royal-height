import React from "react";
import Hero from "@/components/home/Hero";
import FeatureStrip from "@/components/home/FeatureStrip";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import AmenitiesHighlights from "@/components/home/AmenitiesHighlights";
import AttractionsSection from "@/components/home/AttractionsSection";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero with Floating Booking Search Bar */}
      <Hero />

      {/* 2. 4-Up Feature Strip */}
      <FeatureStrip />

      {/* 3. Two-Column 'Why Choose Us' Narrative & Trust Markers */}
      <WhyChooseUs />

      {/* 4. Featured Rooms & Suites with Tags, Wishlist Hearts & Transparent Pricing */}
      <FeaturedRooms />

      {/* 5. Curated Hotel Amenities */}
      <AmenitiesHighlights />

      {/* 6. Sacred Rishikesh Sights & Excursions */}
      <AttractionsSection />

      {/* 7. Guest Testimonials & Reviews */}
      <Testimonials />

      {/* 8. Frequently Asked Questions */}
      <FAQSection />

      {/* 9. Direct Booking Call to Action */}
      <CallToAction />
    </div>
  );
}
