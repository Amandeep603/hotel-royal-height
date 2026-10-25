"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import siteConfig from "@/data/site";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 md:py-20 bg-white scroll-mt-20">
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
            COMMON QUESTIONS
          </span>
          <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold font-serif text-[#1B1B4B] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] sm:text-base text-slate-600 mt-2 font-normal">
            Helpful answers regarding direct check-ins, river transfers, meals, and bookings.
          </p>
        </motion.div>

        {/* 6 Questions - Single column max-w-3xl */}
        <div className="max-w-3xl mx-auto space-y-4">
          {siteConfig.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#FAF9F7] rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-sans font-semibold text-[16px] text-[#1B1B4B] hover:text-[#C9A24B] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200/80 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#1B1B4B] text-white" : "text-slate-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[14px] text-slate-600 leading-relaxed border-t border-slate-200/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
