"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Award, 
  Send,
  Heart,
  Compass
} from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#111030] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Direct Booking Assurance Banner */}
        <div className="bg-[#191845] rounded-2xl p-6 sm:p-8 mb-14 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6B6FEA]/20 flex items-center justify-center text-[#9FA2F8] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Best Rate Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Always lowest price when booking direct</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6B6FEA]/20 flex items-center justify-center text-[#9FA2F8] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">100% Secure Checkout</h4>
              <p className="text-xs text-slate-400 mt-0.5">Encrypted payment & verified reservation</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6B6FEA]/20 flex items-center justify-center text-[#9FA2F8] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Complimentary Perks</h4>
              <p className="text-xs text-slate-400 mt-0.5">Early check-in subject to availability</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6B6FEA]/20 flex items-center justify-center text-[#9FA2F8] shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Pay at Hotel Option</h4>
              <p className="text-xs text-slate-400 mt-0.5">Flexibility to pay cash or UPI at arrival</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Bio */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#6B6FEA] flex items-center justify-center text-white font-bold font-serif text-xl">
                RH
              </div>
              <div>
                <span className="text-lg font-bold font-serif tracking-tight text-white block">
                  HOTEL ROYAL HEIGHTS
                </span>
                <span className="text-xs uppercase tracking-widest text-[#9FA2F8]">
                  Rishikesh · Tapovan
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              An intimate sanctuary of luxury nestled where the holy Ganges meets the majestic Shivalik Himalayas. Indulge in warm Garhwali hospitality, rooftop dining, and spiritual tranquility.
            </p>
            
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6B6FEA] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6B6FEA] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6B6FEA] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Tripadvisor"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/rooms" className="text-slate-400 hover:text-white transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/hotel" className="text-slate-400 hover:text-white transition-colors">
                  Hotel Amenities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-400 hover:text-white transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Our Retreat
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Location & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Assistance */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Guest Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/hotel#policies" className="text-slate-400 hover:text-white transition-colors">
                  House Rules & Policies
                </Link>
              </li>
              <li>
                <Link href="/hotel#policies" className="text-slate-400 hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/hotel#faq" className="text-slate-400 hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Rafting & Travel Desk
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
                  Staff / Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Concierge
            </h4>
            <div className="space-y-3 text-xs text-slate-400 mb-6">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9FA2F8] shrink-0 mt-0.5" />
                <span>Badrinath Road, Tapovan, Rishikesh, Uttarakhand 249192, India</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9FA2F8] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#9FA2F8] shrink-0" />
                <a href="mailto:reservations@hotelroyalheights.com" className="hover:text-white">
                  reservations@hotelroyalheights.com
                </a>
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                placeholder="Your email for 10% off"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6B6FEA]"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#6B6FEA] text-white flex items-center justify-center hover:bg-[#585cdb] transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400 mt-2">
                Thank you! Coupon code <strong>ROYAL10</strong> sent to your inbox.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Hotel Royal Heights Rishikesh. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/hotel#policies" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/hotel#policies" className="hover:text-slate-400">Terms of Stay</Link>
            <Link href="/contact" className="hover:text-slate-400">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
