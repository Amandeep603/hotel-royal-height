"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send,
  ArrowUp
} from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import siteConfig from "@/data/site";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1B1B4B] text-slate-300 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        
        {/* 4 Clean Columns: Brand+Socials | Quick Links | Contact | Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand + short description + socials (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B] font-bold text-base shrink-0">
                RH
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white font-serif block">
                  {siteConfig.hotelName}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#C9A24B] font-semibold">
                  Tapovan &bull; Rishikesh
                </span>
              </div>
            </div>

            <p className="text-[13px] text-slate-300 leading-relaxed mb-6 font-normal">
              A serene Himalayan sanctuary in Upper Tapovan. Experience Ganga view suites, fresh rooftop Sattvic dining, and sacred river adventures.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
                aria-label="Connect on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A24B] text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
                aria-label="Call Reception"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A24B] text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (ONLY the 5 main links + 360 Tour) (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="#rooms" className="hover:text-[#C9A24B] transition-colors">Rooms &amp; Suites</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-[#C9A24B] transition-colors">Facilities</a>
              </li>
              <li>
                <a href="#virtual-tour" className="hover:text-[#C9A24B] transition-colors">360&deg; Tour</a>
              </li>
              <li>
                <a href="#explore" className="hover:text-[#C9A24B] transition-colors">Explore Rishikesh</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C9A24B] transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C9A24B] transition-colors">Location &amp; Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif font-semibold text-white text-sm mb-4">Direct Contact</h4>
            <div className="space-y-3 text-[13px]">
              <p className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>{siteConfig.location.address}</span>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={siteConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors ml-2">
                  {siteConfig.contact.whatsapp}
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors truncate">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Newsletter & Back to Top (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif font-semibold text-white text-sm mb-4">Newsletter</h4>
            <p className="text-[13px] text-slate-300 mb-3 leading-relaxed">
              Seasonal retreat specials, yoga updates, and river rafting packages.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 mb-5">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C9A24B]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-[#C9A24B] text-white text-xs font-semibold hover:bg-[#b5903e] transition-colors flex items-center justify-center min-h-[32px] min-w-[32px]"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400">✓ Thank you for subscribing!</p>
              )}
            </form>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A24B] hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 {siteConfig.hotelName}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/policies/privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/policies/terms" className="hover:text-slate-200 transition-colors">Terms of Stay</Link>
            <span>&bull;</span>
            <Link href="/policies/cancellation" className="hover:text-slate-200 transition-colors">Cancellation Rules</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
