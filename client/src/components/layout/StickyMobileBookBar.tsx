"use client";

import React from "react";
import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import siteConfig from "@/data/site";

interface StickyMobileBookBarProps {
  onOpenWhatsApp?: () => void;
}

export default function StickyMobileBookBar({ onOpenWhatsApp }: StickyMobileBookBarProps) {
  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      const msg = encodeURIComponent(`Hello ${siteConfig.hotelName}, I would like to inquire about room availability and direct reservation rates.`);
      const phoneDigits = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${phoneDigits}?text=${msg}`, "_blank");
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2.5 shadow-[0_-8px_25px_rgba(27,27,75,0.08)]">
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
          className="flex-1 min-h-[46px] rounded-full border border-slate-200 bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
          aria-label="Call Reception"
        >
          <Phone className="w-4 h-4 text-[#C9A24B]" />
          <span>Call Desk</span>
        </a>

        {/* Book on WhatsApp Button with REAL WhatsApp icon */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex-[1.4] min-h-[46px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 active:scale-95 transition-all whitespace-nowrap"
          aria-label="Book on WhatsApp"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Book on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
