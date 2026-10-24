"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Sparkles } from "lucide-react";

export default function StickyMobileBookBar() {
  const pathname = usePathname();

  // Hide on booking checkout pages and admin
  if (pathname.startsWith("/booking") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-3 shadow-[0_-8px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Best Direct Rate
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-[#23225C]">₹2,499</span>
            <span className="text-xs text-slate-500">/ night</span>
          </div>
        </div>

        <Link
          href="/rooms"
          className="btn-navy px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md shadow-[#23225C]/25"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Room</span>
        </Link>
      </div>
    </div>
  );
}
