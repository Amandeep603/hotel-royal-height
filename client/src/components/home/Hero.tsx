"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Star, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import hotelImages from "@/data/images";
import FloatingSearchBar from "./FloatingSearchBar";

export default function Hero() {
  return (
    <section className="relative pt-6 pb-20 lg:pt-10 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow & Headline Grid */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF0FC] text-[#23225C] border border-[#6B6FEA]/20 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6B6FEA]" />
            <span>Direct Booking Privilege — 15% Off with Code &apos;ROYAL10&apos;</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#111030] tracking-tight leading-[1.15] mb-5">
            Awaken to Himalayan Mist & Sacred Ganges Peace
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-2xl">
            A boutique sanctuary in Tapovan, Rishikesh offering luxury mountain-view rooms, peaceful yoga lawn, rooftop dining, and bespoke river rafting expeditions.
          </p>

          {/* Guest Rating & Avatar Stack Pill */}
          <div className="inline-flex items-center gap-3 bg-white py-2 px-4 rounded-full border border-slate-200/80 shadow-sm">
            <div className="flex -space-x-2 overflow-hidden">
              {hotelImages.avatars.slice(0, 3).map((avatar, i) => (
                <div key={i} className="relative w-7 h-7 rounded-full ring-2 ring-white overflow-hidden">
                  <Image
                    src={avatar}
                    alt="Guest avatar"
                    fill
                    className="object-cover"
                    sizes="28px"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <span className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                <span className="ml-1 text-slate-900 font-bold">4.9 / 5</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">Over 1,200+ Verified Guests</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Banner with Rounded Card & Floating Badges */}
        <div className="relative w-full h-[340px] sm:h-[440px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80">
          <Image
            src={hotelImages.heroBanner}
            alt="Hotel Royal Heights Rishikesh Himalayan Valley View"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          {/* Subtle cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Floating Tag Bottom-Left */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/50 max-w-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6FEA] block">
              Boutique Hospitality
            </span>
            <p className="text-sm font-bold text-slate-900 leading-snug">
              Quiet Tapovan Location · 5 Mins to Laxman Jhula
            </p>
          </div>

          {/* Floating Tag Top-Right */}
          <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 bg-[#23225C]/90 text-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold shadow-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Safe & Sanitized Property</span>
          </div>
        </div>

        {/* Floating Search Bar (overlapping bottom of hero) */}
        <div className="relative -mt-10 sm:-mt-14 z-20">
          <FloatingSearchBar />
        </div>
      </div>
    </section>
  );
}
