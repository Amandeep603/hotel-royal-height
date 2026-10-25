"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, Sparkles, Wifi, Compass, Flame, Car } from "lucide-react";
import siteConfig from "@/data/site";

const iconMap: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Wifi: <Wifi className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
};

export default function Facilities() {
  return (
    <section id="facilities" className="py-14 md:py-20 bg-[#FAF9F7] scroll-mt-20">
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
            RESORT AMENITIES
          </span>
          <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold font-serif text-[#1B1B4B] leading-tight">
            Designed for Rest & Peaceful Living
          </h2>
          <p className="text-[15px] sm:text-base text-slate-600 mt-2 font-normal">
            Everything you need for a restful stay, wholesome dining, and seamless Himalayan exploration.
          </p>
        </motion.div>

        {/* 6 Cards in 3x2 Grid (2x3 tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.facilities.map((fac, idx) => (
            <motion.div
              key={fac.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0 ${fac.bgClass}`}>
                {iconMap[fac.icon] || <Sparkles className="w-5 h-5" />}
              </div>
              <h3 className="text-[18px] font-semibold text-[#1B1B4B] mb-1.5 font-sans">
                {fac.title}
              </h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                {fac.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
