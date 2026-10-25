"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import siteConfig from "@/data/site";
import hotelImages from "@/data/images";

export default function WhyChooseUs() {
  const { whyChooseUs } = siteConfig;

  return (
    <section className="py-14 md:py-20 bg-[#FAF9F7] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Headline + Animated Checklist */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A24B] mb-2 block">
              {whyChooseUs.eyebrow}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-serif font-semibold text-[#1B1B4B] tracking-tight leading-[1.15] mb-4">
              More Than Just A Hotel, <br className="hidden sm:inline" />
              A Spiritual Haven
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-7 max-w-lg">
              {whyChooseUs.subtitle}
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 mb-8 w-full">
              {whyChooseUs.points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FDF8EE] text-[#C9A24B] border border-[#C9A24B]/30 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#rooms"
              className="btn-navy px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md shadow-[#1B1B4B]/20 hover:shadow-xl active:scale-95 transition-all inline-flex items-center gap-2 min-h-[44px] whitespace-nowrap"
            >
              <span>Explore Suites</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
            </a>
          </motion.div>

          {/* Right: Rounded Image with 4.9 Stat Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Container with rounded-[28px] */}
              <div className="relative h-[340px] sm:h-[420px] lg:h-[460px] w-full rounded-[28px] overflow-hidden shadow-xl border-4 border-white group">
                <Image
                  src={hotelImages.whyChoose}
                  alt="Sunlit Himalayan Suite and Teak Sit-Out at Hotel Royal Heights"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Stat Card (4.9 Rating) */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 max-w-[220px] sm:max-w-[250px] z-10">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FDF8EE] text-[#C9A24B] flex items-center justify-center font-bold shadow-sm">
                    <Star className="w-4 h-4 fill-[#C9A24B] stroke-[#C9A24B]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C9A24B] tracking-wider block">
                      Top Rated
                    </span>
                    <h4 className="text-base font-bold text-[#1B1B4B]">
                      4.9 / 5.0
                    </h4>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  Based on verified guest reviews
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
