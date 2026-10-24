import React from "react";
import Image from "next/image";
import { 
  Coffee, 
  Wifi, 
  Sparkles, 
  Compass, 
  Car, 
  UtensilsCrossed, 
  Flame, 
  HeartHandshake 
} from "lucide-react";
import hotelImages from "@/data/images";

export default function AmenitiesHighlights() {
  const amenities = [
    {
      icon: Coffee,
      title: "Rooftop Mountain Cafe",
      desc: "Open-air panoramic dining serving artisan Himalayan teas and fresh North Indian cuisine.",
    },
    {
      icon: Sparkles,
      title: "Yoga & Meditation Deck",
      desc: "Greet the sunrise with calm morning yoga sessions and soothing ambient mountain air.",
    },
    {
      icon: Wifi,
      title: "Ultra-Fast Fiber Wi-Fi",
      desc: "Dedicated high-speed connectivity across all rooms and public lounges for digital nomads.",
    },
    {
      icon: Compass,
      title: "Rafting & Excursions Desk",
      desc: "Book Grade 3 & 4 rapids, sunrise treks to Kunjapuri Temple, and motorbikes directly.",
    },
    {
      icon: Flame,
      title: "24/7 Geyser & Power Backup",
      desc: "Continuous hot water supply for refreshing showers after river adventures, with 100% generator backup.",
    },
    {
      icon: Car,
      title: "On-Site Private Parking",
      desc: "Secure, free parking space for personal vehicles and motorbikes right on property grounds.",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EEF0FC] text-[#23225C] text-xs font-bold uppercase tracking-wider mb-3">
            Hotel Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight">
            Curated Amenities for Mindful Stays
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3">
            Everything you need for an unforgettable Himalayan getaway, designed with both relaxation and productivity in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEF0FC] text-[#23225C] flex items-center justify-center shrink-0 group-hover:bg-[#23225C] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 mb-1 group-hover:text-[#23225C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
