"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Search, 
  Star, 
  Wifi, 
  Mountain, 
  MapPin, 
  Eye, 
  ArrowRight 
} from "lucide-react";
import hotelImages from "@/data/images";

export default function Hero() {
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDate(defaultCheckOut));
  const [adults, setAdults] = useState("2");
  const [roomType, setRoomType] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const roomsSection = document.getElementById("rooms");
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pillChips = [
    { label: "★ 4.9 Rating", icon: Star, color: "text-[#C9A24B]" },
    { label: "Ganga View Rooms", icon: Mountain, color: "text-white" },
    { label: "Free 200 Mbps Wi-Fi", icon: Wifi, color: "text-white" },
    { label: "5 Min to Laxman Jhula", icon: MapPin, color: "text-white" },
  ];

  return (
    <section className="pt-2 pb-14 md:pb-18">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        
        {/* Rounded Hero Card */}
        <div className="relative w-full rounded-[32px] overflow-hidden min-h-[620px] md:min-h-[680px] flex flex-col justify-between p-6 sm:p-10 md:p-12 shadow-xl border border-slate-200/70 select-none">
          
          {/* Daytime/Golden Hour High-Res Photo */}
          <Image
            src={hotelImages.hero}
            alt="Hotel Royal Heights Rishikesh Ganga River and Himalayan Foothills"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Clean Daylight Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent z-[1]" />

          {/* Top Eyebrow */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
              <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />
              <span>Boutique Sanctuary in Upper Tapovan, Rishikesh</span>
            </span>
          </div>

          {/* Middle: Headline, Subtext, Buttons & Pill Chips */}
          <div className="relative z-10 max-w-3xl my-auto py-8">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-[3.8rem] font-serif font-semibold text-white tracking-tight leading-[1.12] mb-4 drop-shadow-sm"
            >
              Wake Up to the Ganga <br className="hidden sm:inline" />
              & the Himalayas
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed max-w-2xl mb-7"
            >
              Boutique comfort in Upper Tapovan with private river balconies, rooftop dining, and daily morning yoga.
            </motion.p>

            {/* Two Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 mb-7"
            >
              <a
                href="#rooms"
                className="btn-gold px-7 py-3 rounded-full text-sm font-bold text-white shadow-lg shadow-[#C9A24B]/30 hover:shadow-xl active:scale-95 transition-all min-h-[46px] flex items-center gap-2 whitespace-nowrap"
              >
                <span>Check Rooms</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#virtual-tour"
                className="px-6 py-3 rounded-full text-sm font-bold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 transition-all min-h-[46px] flex items-center gap-2 whitespace-nowrap"
              >
                <Eye className="w-4 h-4 text-[#C9A24B]" />
                <span>Take 360° Tour</span>
              </a>
            </motion.div>

            {/* Pill Chips Under Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              {pillChips.map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-white"
                  >
                    <Icon className={`w-3.5 h-3.5 ${chip.color}`} />
                    <span>{chip.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom: Search Bar INSIDE Hero Card with CSS Grid */}
          <div className="relative z-10 w-full pt-4">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/80">
              <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 items-center"
              >
                {/* 1. Check-In */}
                <div className="flex flex-col px-3.5 py-1.5 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/60">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Check-In
                  </label>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                    <input
                      type="date"
                      value={checkIn}
                      min={formatDate(today)}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer w-full"
                      required
                    />
                  </div>
                </div>

                {/* 2. Check-Out */}
                <div className="flex flex-col px-3.5 py-1.5 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/60">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Check-Out
                  </label>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || formatDate(today)}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer w-full"
                      required
                    />
                  </div>
                </div>

                {/* 3. Guests */}
                <div className="flex flex-col px-3.5 py-1.5 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/60">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Guests
                  </label>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                    <select
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer w-full"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4+ Family</option>
                    </select>
                  </div>
                </div>

                {/* 4. Room Type */}
                <div className="flex flex-col px-3.5 py-1.5 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/60">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Room Type
                  </label>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Mountain className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer w-full"
                    >
                      <option value="all">All Rooms</option>
                      <option value="suite">Ganga Suite</option>
                      <option value="deluxe">Deluxe Balcony</option>
                      <option value="family">Family Suite</option>
                    </select>
                  </div>
                </div>

                {/* 5. Search Button */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <button
                    type="submit"
                    className="btn-navy w-full h-[46px] rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all min-h-[44px]"
                  >
                    <Search className="w-4 h-4 text-[#C9A24B]" />
                    <span>Search</span>
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
