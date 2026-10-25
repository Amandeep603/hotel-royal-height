"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Calendar, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import siteConfig from "@/data/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-booking-modal"));
    }
  };

  // ONLY these 5 center links as strictly required:
  const navLinks = [
    { name: "Rooms", href: "#rooms" },
    { name: "Facilities", href: "#facilities" },
    { name: "Explore", href: "#explore" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "glass-nav-scrolled py-3.5"
            : "glass-nav-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Logo (RH Monogram + Royal Heights on one line + subline) */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#1B1B4B] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B] font-bold shadow-sm transition-transform group-hover:scale-105 shrink-0">
                <span className="text-lg font-serif">RH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-serif font-semibold text-[#1B1B4B] leading-none whitespace-nowrap">
                  Royal Heights
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#C9A24B] font-semibold mt-0.5">
                  Tapovan, Rishikesh
                </span>
              </div>
            </Link>

            {/* Center: ONLY 5 links with clean spacing and hover underline */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-semibold text-slate-700 hover:text-[#1B1B4B] transition-colors whitespace-nowrap py-1 group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A24B] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              ))}
            </nav>

            {/* Right: Gold 'Book Now' button (whitespace-nowrap) opening booking modal */}
            <div className="hidden md:flex items-center">
              <button
                type="button"
                onClick={handleOpenBooking}
                className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold text-white whitespace-nowrap shadow-md shadow-[#C9A24B]/20 hover:shadow-lg active:scale-95 transition-all min-h-[44px] flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={handleOpenBooking}
                className="btn-gold px-4 py-2 rounded-full text-xs font-bold text-white whitespace-nowrap min-h-[42px] flex items-center"
              >
                Book
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-2xl text-slate-700 hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer (Full Height Slide-In) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1B1B4B] text-[#C9A24B] flex items-center justify-center font-bold text-sm">
                    RH
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-[#1B1B4B] text-base leading-tight">Royal Heights</h3>
                    <p className="text-[10px] text-[#C9A24B] font-bold uppercase tracking-wider">Tapovan, Rishikesh</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1.5 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-base font-semibold text-slate-700 hover:text-[#1B1B4B] hover:bg-slate-50 rounded-2xl transition-colors min-h-[48px]"
                  >
                    <span>{link.name}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions: Call and WhatsApp */}
            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.hotel.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-slate-200 text-slate-800 text-sm font-semibold min-h-[46px] hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C9A24B]" />
                <span>Call {siteConfig.hotel.contact.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const msg = encodeURIComponent("Hello Hotel Royal Heights, I would like to book a room directly.");
                  window.open(`https://wa.me/${siteConfig.hotel.contact.whatsApp.replace(/[^0-9]/g, '')}?text=${msg}`, "_blank");
                }}
                className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 min-h-[46px] transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Book on WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
