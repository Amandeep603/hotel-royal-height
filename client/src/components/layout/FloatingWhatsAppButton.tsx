"use client";

import React, { useState } from "react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import siteConfig from "@/data/site";

interface FloatingWhatsAppButtonProps {
  onOpenModal?: () => void;
}

export default function FloatingWhatsAppButton({ onOpenModal }: FloatingWhatsAppButtonProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      const msg = encodeURIComponent(`Hello ${siteConfig.hotelName}, I would like to inquire about room availability and best direct rates.`);
      const phoneDigits = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
      window.open(`https://wa.me/${phoneDigits}?text=${msg}`, "_blank");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      {hovered && (
        <div className="flex items-center gap-2 bg-[#1B1B4B] text-white text-xs font-semibold py-2 px-3.5 rounded-full shadow-xl border border-white/20 animate-fade-in pointer-events-none whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat with us</span>
        </div>
      )}

      {/* Main WhatsApp Button with REAL WhatsApp Logo */}
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.7)] transition-all active:scale-95"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
        
        <WhatsAppIcon className="w-7 h-7 relative z-10 transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
