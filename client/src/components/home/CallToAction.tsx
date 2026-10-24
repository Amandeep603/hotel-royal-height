import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Phone, ShieldCheck } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#23225C] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle ambient radial highlights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B6FEA]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B3A82]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#9FA2F8] text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Limited Direct Reservation Offer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight leading-tight mb-4">
              Book Direct & Receive 15% Off Your Entire Stay
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Experience the tranquility of the Himalayas with zero middleman fees. Use promotional code <strong className="text-amber-400 font-mono">ROYAL10</strong> at checkout for instant savings, complimentary early check-in, and flexible cancellation.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/rooms"
                className="bg-white text-[#23225C] hover:bg-slate-100 px-7 py-3.5 rounded-full font-bold text-sm text-center shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Room</span>
              </Link>

              <a
                href="tel:+919876543210"
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-3.5 rounded-full font-bold text-sm text-center backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Concierge: +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
