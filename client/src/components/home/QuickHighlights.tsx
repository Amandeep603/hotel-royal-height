"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Mountain, Clock } from "lucide-react";
import siteConfig from "@/data/site";

export default function QuickHighlights() {
  const iconMap: Record<string, React.ElementType> = {
    Sparkles,
    ShieldCheck,
    Mountain,
    Clock,
  };

  return (
    <section className="py-8 md:py-12 bg-white border-y border-slate-200/60">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.quickHighlights.map((item, idx) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-slate-50/70 transition-colors"
              >
                {/* Pastel circle above title */}
                <div className={`w-12 h-12 rounded-full ${item.bgClass} flex items-center justify-center shrink-0 mb-3 shadow-sm`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                <h3 className="font-semibold text-base text-[#1B1B4B] mb-1">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-[220px]">
                  {item.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
