import React from "react";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import hotelImages from "@/data/images";

export default function AttractionsSection() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#EEF0FC] text-[#23225C] text-xs font-bold uppercase tracking-wider mb-3">
              Explore Rishikesh
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight">
              Nearby Sights & Sacred Experiences
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Conveniently located in Tapovan, our hotel is your launchpad for sacred ghats, suspension bridges, and thrilling mountain sports.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-bold text-[#23225C] bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <MapPin className="w-4 h-4 text-[#6B6FEA]" />
            <span>Tapovan, Rishikesh 249192</span>
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelImages.attractions.map((attraction, idx) => (
            <div
              key={idx}
              className="hotel-card group overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={attraction.image}
                  alt={attraction.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-slate-800">
                    {attraction.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-white">
                  <Navigation className="w-3 h-3 text-[#9FA2F8]" />
                  <span>{attraction.distance}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#23225C] transition-colors mb-2">
                    {attraction.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {attraction.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
