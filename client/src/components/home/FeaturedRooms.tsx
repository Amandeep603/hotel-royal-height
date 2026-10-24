"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  Maximize2, 
  Wifi, 
  Coffee, 
  Wind, 
  Star, 
  Eye, 
  Calendar,
  Check
} from "lucide-react";
import hotelImages from "@/data/images";
import { formatPrice } from "@/lib/utils";

interface RoomCardData {
  id: string;
  slug: string;
  title: string;
  category: string;
  tag: "Featured" | "Popular" | "Hot Deal" | "New";
  tagColor: string;
  price: number;
  originalPrice: number;
  taxes: number;
  rating: number;
  reviewsCount: number;
  capacity: string;
  size: string;
  bed: string;
  view: string;
  image: string;
  amenities: string[];
}

export default function FeaturedRooms() {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const rooms: RoomCardData[] = [
    {
      id: "1",
      slug: "executive-ganga-view-suite",
      title: "Executive Ganga View Suite",
      category: "Luxury Suite",
      tag: "Featured",
      tagColor: "bg-[#23225C] text-white",
      price: 3999,
      originalPrice: 4999,
      taxes: 480,
      rating: 4.9,
      reviewsCount: 142,
      capacity: "2 Adults, 1 Child",
      size: "360 sq.ft",
      bed: "King Bed",
      view: "River & Mountain View",
      image: hotelImages.rooms.riverViewSuite.cover,
      amenities: ["Private Balcony", "Free Wi-Fi", "Tea Maker", "Mountain Breeze"],
    },
    {
      id: "2",
      slug: "super-deluxe-mountain-balcony",
      title: "Super Deluxe Mountain Balcony",
      category: "Deluxe Collection",
      tag: "Popular",
      tagColor: "bg-[#6B6FEA] text-white",
      price: 2899,
      originalPrice: 3499,
      taxes: 348,
      rating: 4.8,
      reviewsCount: 98,
      capacity: "2 Adults",
      size: "290 sq.ft",
      bed: "Queen Bed",
      view: "Valley Facing",
      image: hotelImages.rooms.superDeluxe.cover,
      amenities: ["Valley Balcony", "Smart TV", "Air Conditioning", "Room Service"],
    },
    {
      id: "3",
      slug: "deluxe-comfort-room",
      title: "Deluxe Comfort Room",
      category: "Standard Comfort",
      tag: "Hot Deal",
      tagColor: "bg-amber-600 text-white",
      price: 2199,
      originalPrice: 2799,
      taxes: 264,
      rating: 4.7,
      reviewsCount: 76,
      capacity: "2 Guests",
      size: "240 sq.ft",
      bed: "Double Bed",
      view: "Tapovan Greens",
      image: hotelImages.rooms.deluxe.cover,
      amenities: ["High-speed Wi-Fi", "Geyser Shower", "Work Desk", "24/7 Power"],
    },
    {
      id: "4",
      slug: "royal-family-himalayan-suite",
      title: "Royal Family Himalayan Suite",
      category: "Family Special",
      tag: "New",
      tagColor: "bg-emerald-600 text-white",
      price: 5499,
      originalPrice: 6799,
      taxes: 660,
      rating: 5.0,
      reviewsCount: 54,
      capacity: "4 Adults, 2 Children",
      size: "520 sq.ft",
      bed: "2 King Beds",
      view: "360° Himalayan View",
      image: hotelImages.rooms.familySuite.cover,
      amenities: ["Double Balcony", "Mini Fridge", "Living Area", "Rooftop Access"],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white/50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#EEF0FC] text-[#23225C] text-xs font-bold uppercase tracking-wider mb-3">
              Accommodation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight">
              Featured Rooms & Suites
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Each room is intentionally created with warm wooden finishes, crisp linen, private balconies, and scenic Himalayan backdrops.
            </p>
          </div>

          <Link
            href="/rooms"
            className="mt-4 md:mt-0 text-sm font-bold text-[#23225C] hover:text-[#6B6FEA] inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Categories</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => {
            const isWishlisted = !!wishlist[room.id];
            return (
              <div
                key={room.id}
                className="hotel-card group flex flex-col justify-between overflow-hidden"
              >
                {/* Room Photo Card Header */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                  {/* Status Tag Pill (Top Left) */}
                  <div className="absolute top-3.5 left-3.5">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-md ${room.tagColor}`}
                    >
                      {room.tag}
                    </span>
                  </div>

                  {/* Wishlist Heart Button (Top Right) */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(room.id, e)}
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white shadow-md transition-all active:scale-90"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>

                  {/* View Type Badge (Bottom Left) */}
                  <div className="absolute bottom-3 left-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
                      {room.view}
                    </span>
                  </div>

                  {/* Rating Badge (Bottom Right) */}
                  <div className="absolute bottom-3 right-3.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-xs font-bold text-slate-800">
                    <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                    <span>{room.rating}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category */}
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6FEA] block mb-1">
                      {room.category}
                    </span>

                    {/* Room Title */}
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#23225C] transition-colors line-clamp-1 mb-2">
                      {room.title}
                    </h3>

                    {/* Quick Specs (Capacity, Bed, Size) */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> {room.capacity}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-400" /> {room.size}
                      </span>
                    </div>

                    {/* Amenity Badges */}
                    <div className="flex flex-wrap gap-1.5 py-3">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Transparent Pricing & CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-[#23225C]">
                          {formatPrice(room.price)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(room.originalPrice)}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        + {formatPrice(room.taxes)} taxes / night
                      </span>
                    </div>

                    <Link
                      href={`/rooms/${room.slug}`}
                      className="btn-navy px-4 py-2 rounded-xl text-xs font-bold shadow-sm shadow-[#23225C]/20 hover:shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
