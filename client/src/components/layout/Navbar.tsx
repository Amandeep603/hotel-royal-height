"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Phone, 
  Sparkles, 
  Calendar,
  Compass,
  MapPin,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms & Suites", href: "/rooms" },
    { name: "Hotel Experience", href: "/hotel" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-3.5 shadow-sm"
            : "bg-white/90 backdrop-blur-md py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#23225C] flex items-center justify-center text-white font-bold shadow-md shadow-[#23225C]/20 transition-transform group-hover:scale-105">
                <span className="text-xl tracking-tight font-serif">RH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#23225C] font-serif leading-none">
                  ROYAL HEIGHTS
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-1 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-[#6B6FEA]" /> Rishikesh · Uttarakhand
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                      isActive
                        ? "text-[#23225C] bg-[#EEF0FC] font-semibold"
                        : "text-slate-600 hover:text-[#23225C] hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Direct Call & Primary Book Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#23225C] transition-colors py-2 px-3 rounded-full hover:bg-slate-100/80"
              >
                <div className="w-7 h-7 rounded-full bg-[#EEF0FC] flex items-center justify-center text-[#23225C]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 98765 43210</span>
              </a>

              <Link
                href="/rooms"
                className="btn-navy px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm shadow-[#23225C]/20 transition-all hover:gap-2.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                href="/rooms"
                className="btn-navy px-3.5 py-1.5 rounded-full text-xs font-semibold"
              >
                Book
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#23225C] flex items-center justify-center text-white font-bold text-sm">
                    RH
                  </div>
                  <span className="font-serif font-bold text-[#23225C]">Royal Heights</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#23225C] hover:bg-[#EEF0FC] rounded-xl transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-800 text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-[#23225C]" />
                <span>+91 98765 43210</span>
              </a>
              <Link
                href="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-navy w-full py-3 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Direct & Save 15%</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
