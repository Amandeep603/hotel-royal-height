"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, ShieldCheck } from "lucide-react";
import siteConfig from "@/data/site";

// SAMPLE - replace with real Google reviews before launch

export default function GuestReviews() {
  const { reviewsSummary, reviews } = siteConfig;

  return (
    <section id="reviews" className="py-14 md:py-20 bg-white scroll-mt-20">
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
            GUEST EXPERIENCES
          </span>
          <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold font-serif text-[#1B1B4B] leading-tight">
            Cherished Memories from Rishikesh
          </h2>
          <p className="text-[15px] sm:text-base text-slate-600 mt-2 font-normal">
            Real hospitality verified by travelers exploring yoga ashrams, river rafting, and Himalayan tranquility.
          </p>
        </motion.div>

        {/* Reviews Grid: Left Summary Card + 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Summary Card (col-span-12 md:col-span-4 lg:col-span-3) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 lg:col-span-3 bg-[#1B1B4B] text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24B]/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold mb-4 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Verified Hospitality</span>
              </div>
              <div className="text-5xl font-serif font-bold text-white tracking-tight">
                {reviewsSummary.rating}
              </div>
              <div className="flex items-center gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C9A24B] text-[#C9A24B]" />
                ))}
              </div>
              <p className="text-sm text-slate-300 font-medium">
                {reviewsSummary.subtitle}
              </p>
            </div>

            <div className="pt-6 border-t border-white/15 mt-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] block mb-2">
                VERIFIED PLATFORMS
              </span>
              <div className="flex flex-wrap gap-2">
                {reviewsSummary.sources.map((src) => (
                  <span
                    key={src}
                    className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-white/90 font-medium"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3 Review Cards (col-span-12 md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6) */}
          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#FAF9F7] rounded-3xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A24B] text-[#C9A24B]" />
                    ))}
                  </div>

                  {/* 2-3 Line Quote */}
                  <p className="text-[14px] text-slate-700 leading-relaxed italic mb-4 font-normal">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info with Initial Avatar Circle */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#1B1B4B] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                    {rev.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[14px] font-semibold text-[#1B1B4B] truncate">
                      {rev.name}
                    </h4>
                    <p className="text-[12px] text-slate-500 truncate">
                      {rev.city} &bull; {rev.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
