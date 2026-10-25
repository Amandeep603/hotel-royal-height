"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import siteConfig from "@/data/site";

export default function ExperiencesSection() {
  return (
    <section id="explore" className="py-14 md:py-20 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        
        {/* Standard Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] mb-2 block">
            EXPLORE RISHIKESH
          </span>
          <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold font-serif text-[#1B1B4B] leading-tight">
            Sacred Adventures Around Tapovan
          </h2>
          <p className="text-[15px] sm:text-base text-slate-600 mt-2 font-normal">
            From thunderous Ganga rapids to twilight temple aartis, experience the soul of Rishikesh minutes away.
          </p>
        </motion.div>

        {/* 4 Image Cards: 1 col mobile, 2 col tablet, 4 col desktop, aspect-[3/4] on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.explore.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Actual photo of Rishikesh adventure/location */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B4B]/95 via-[#1B1B4B]/40 to-transparent" />

              {/* Distance badge top-left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#1B1B4B] shadow-sm">
                  <MapPin className="w-3 h-3 text-[#C9A24B]" />
                  <span className="whitespace-nowrap">{item.distance}</span>
                </span>
              </div>

              {/* Text on Image bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end text-white">
                <h3 className="font-serif font-semibold text-[19px] leading-snug text-white mb-1.5 group-hover:text-[#C9A24B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[13px] text-slate-200 line-clamp-2 leading-relaxed">
                  {item.line}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
