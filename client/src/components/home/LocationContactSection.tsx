"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation, Compass } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import siteConfig from "@/data/site";

export default function LocationContactSection() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteConfig.hotelName} ${siteConfig.location.address}`
  )}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${siteConfig.hotelName} ${siteConfig.location.address}`
  )}`;

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#FAF9F7] scroll-mt-20">
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
            PRIME LOCATION &amp; CONTACT
          </span>
          <h2 className="text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold font-serif text-[#1B1B4B] leading-tight">
            Find Us in Upper Tapovan
          </h2>
          <p className="text-[15px] sm:text-base text-slate-600 mt-2 font-normal">
            Perched peacefully above the market buzz, with immediate access to Laxman Jhula, cafes, and sacred ghats.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact & Nearby Landmarks (col-span-6) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between"
          >
            <div>
              <h3 className="font-serif font-semibold text-xl text-[#1B1B4B] mb-6">
                Direct Contact &amp; Timings
              </h3>

              <div className="space-y-4 mb-8">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C9A24B] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Address
                    </span>
                    <p className="text-[14px] text-slate-800 font-medium leading-snug">
                      {siteConfig.location.address}
                    </p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#1B1B4B] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Call Desk
                      </span>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-[14px] text-slate-800 font-semibold hover:text-[#C9A24B] transition-colors"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        WhatsApp 24/7
                      </span>
                      <a
                        href={siteConfig.contact.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-[#25D366] font-semibold hover:underline"
                      >
                        {siteConfig.contact.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email & Check-in / Check-out */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Email Concierge
                      </span>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-[13px] text-slate-800 font-medium hover:text-[#C9A24B] transition-colors truncate block"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C9A24B] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Check-In / Out
                      </span>
                      <p className="text-[13px] text-slate-800 font-medium">
                        {siteConfig.location.checkIn} / {siteConfig.location.checkOut}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Nearby Places with distances (clean rows) */}
              <div className="pt-6 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24B] block mb-3">
                  DISTANCE TO KEY LANDMARKS
                </span>
                <div className="space-y-2.5">
                  {siteConfig.landmarks.map((place) => (
                    <div
                      key={place.name}
                      className="flex items-center justify-between text-xs sm:text-[13px] py-1.5 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-slate-700 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
                        {place.name}
                      </span>
                      <div className="flex items-center gap-2 text-right shrink-0">
                        <span className="font-semibold text-[#1B1B4B]">{place.distance}</span>
                        <span className="text-slate-400 text-[11px]">({place.time})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Embed (col-span-6) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm bg-slate-100">
              {/* Map Loading State */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center text-slate-500 z-10 gap-2">
                  <Compass className="w-6 h-6 text-[#C9A24B] animate-spin" />
                  <span className="text-xs font-medium">Loading Google Maps...</span>
                </div>
              )}

              {/* Iframe */}
              <iframe
                title="Hotel Royal Heights Rishikesh Location Map"
                src={siteConfig.location.googleMapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
                className={`w-full h-full transition-opacity duration-500 ${
                  mapLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Map Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-3 px-5 rounded-full text-xs font-semibold text-[#1B1B4B] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-center min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4 text-[#C9A24B]" />
                <span className="whitespace-nowrap">Open in Google Maps</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold py-3 px-5 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center min-h-[44px]"
              >
                <Navigation className="w-4 h-4" />
                <span className="whitespace-nowrap">Get Directions</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
