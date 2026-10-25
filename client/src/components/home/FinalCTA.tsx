"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import siteConfig from "@/data/site";
import hotelImages from "@/data/images";

export default function FinalCTA() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello! I would like to check room availability and rates at ${siteConfig.hotelName}.`
  )}`;

  return (
    <section className="py-12 md:py-16 bg-[#FAF9F7]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#1B1B4B] text-white rounded-[32px] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          {/* Subtle gradient overlays */}
          <div className="absolute top-0 right-1/2 w-96 h-96 bg-[#C9A24B]/15 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Text & Buttons (7 columns on desktop) */}
          <div className="p-8 sm:p-10 lg:p-14 lg:col-span-7 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#C9A24B] border border-[#C9A24B]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Booking Guarantee</span>
            </span>

            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold font-serif leading-tight text-white mb-3">
              Ready for Peace by the Sacred Ganga?
            </h2>

            <p className="text-[15px] text-slate-300 mb-8 max-w-lg leading-relaxed font-normal">
              Book directly with our front desk for guaranteed lowest rates, flexible 48-hour cancellation, and complimentary luggage storage.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold px-6 py-3.5 rounded-full text-sm inline-flex items-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all duration-300 min-h-[44px] whitespace-nowrap active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-full text-sm inline-flex items-center gap-2 transition-all duration-300 min-h-[44px] whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#C9A24B]" />
                <span>Call Now: {siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Image Side (5 columns on desktop) */}
          <div className="relative w-full h-[280px] sm:h-[340px] lg:h-full min-h-[340px] lg:col-span-5">
            <Image
              src={hotelImages.rooms.executiveSuite.cover}
              alt="Hotel Royal Heights Himalayan Suite View"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1B1B4B] via-[#1B1B4B]/30 to-transparent" />
            
            {/* Small overlay tag on image */}
            <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[11px] font-medium text-white/90">
              Tapovan &bull; Rishikesh
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
