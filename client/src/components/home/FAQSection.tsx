"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What are the standard Check-in and Check-out timings?",
      a: "Our standard check-in is at 12:00 PM and check-out is at 11:00 AM. If you arrive early or have a later departure, our reception team will gladly store your luggage securely and grant access to public lounges.",
    },
    {
      q: "How far is Hotel Royal Heights from the Ganges River and Laxman Jhula?",
      a: "We are nestled in Tapovan, Rishikesh, situated just 1.5 km (a picturesque 10-minute walk or 3-minute ride) from Laxman Jhula and the sacred riverside ghats.",
    },
    {
      q: "Is complimentary parking available for cars and motorcycles?",
      a: "Yes! We provide on-site secure private parking for our guests free of charge throughout the duration of your stay.",
    },
    {
      q: "Can the hotel arrange River Rafting, Scooters, and Ganga Aarti visits?",
      a: "Absolutely. Our front desk concierge coordinates certified Shivpuri white-water rafting, scooter rentals, airport transfers from Dehradun Jolly Grant (DED), and private taxis for the evening Triveni Ghat Aarti.",
    },
    {
      q: "What is the cancellation and rescheduling policy for direct bookings?",
      a: "Bookings made directly on our website enjoy our most flexible terms: free cancellation or date modification up to 48 hours before your scheduled arrival date.",
    },
    {
      q: "What payment options are accepted?",
      a: "We support seamless online payments via UPI, Credit/Debit cards, Net Banking through Razorpay test/live gateway, as well as 'Pay at Hotel' upon arrival.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white/60 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EEF0FC] text-[#23225C] text-xs font-bold uppercase tracking-wider mb-3">
            Questions & Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Everything you need to know about staying at Hotel Royal Heights Rishikesh.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="hotel-card overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#EEF0FC] flex items-center justify-center text-[#23225C] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#23225C] text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
