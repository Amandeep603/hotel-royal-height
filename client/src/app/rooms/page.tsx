"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Filter, 
  Search, 
  Calendar, 
  Users, 
  Heart, 
  Maximize2, 
  Star, 
  Sparkles, 
  ChevronRight,
  SlidersHorizontal,
  Check
} from "lucide-react";
import hotelConfig from "@/config/hotel";
import hotelImages from "@/data/images";
import { formatPrice } from "@/lib/utils";
import { fetchRooms } from "@/lib/api";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>(hotelConfig.roomCategories);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [selectedGuests, setSelectedGuests] = useState<string>("all");

  useEffect(() => {
    async function loadBackendRooms() {
      const data = await fetchRooms();
      if (data?.rooms && data.rooms.length > 0) {
        setRooms(data.rooms);
      }
    }
    loadBackendRooms();
  }, []);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((r) => {
        if (selectedType !== "all" && r.roomType !== selectedType) return false;
        if (priceRange === "budget" && r.basePrice > 2500) return false;
        if (priceRange === "mid" && (r.basePrice < 2500 || r.basePrice > 4000)) return false;
        if (priceRange === "luxury" && r.basePrice < 4000) return false;
        if (selectedGuests !== "all" && r.capacity?.adults < Number(selectedGuests)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.basePrice - b.basePrice;
        if (sortBy === "price_desc") return b.basePrice - a.basePrice;
        if (sortBy === "rating") return (b.ratingAverage || 4.8) - (a.ratingAverage || 4.8);
        return 0; // recommended order
      });
  }, [rooms, selectedType, priceRange, sortBy, selectedGuests]);

  const roomTypes = [
    { label: "All Accommodations", value: "all" },
    { label: "Deluxe", value: "Deluxe" },
    { label: "Super Deluxe", value: "Super Deluxe" },
    { label: "Executive Suite", value: "Executive Suite" },
    { label: "Family Suite", value: "Family Suite" },
  ];

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
            <Link href="/" className="hover:text-[#23225C]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#23225C]">Rooms & Suites</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#EEF0FC] text-[#23225C] text-xs font-bold uppercase tracking-wider mb-2">
                Tapovan, Rishikesh
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#111030] tracking-tight">
                Our Rooms & Luxury Suites
              </h1>
              <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
                Experience sound sleep enveloped in fresh Himalayan mountain breezes. All rooms feature private balconies, high-speed fiber Wi-Fi, and plush bedding.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-600">
              <Sparkles className="w-4 h-4 text-[#C9A24B]" />
              <span>Direct Booking: <strong>Best Rate Guarantee &amp; Free 48h Cancellation</strong></span>
            </div>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {roomTypes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setSelectedType(t.value)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedType === t.value
                      ? "btn-navy shadow-md shadow-[#23225C]/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Price & Sort Dropdowns */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                <span>Price:</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="all">Any Price</option>
                  <option value="budget">Under ₹2,500</option>
                  <option value="mid">₹2,500 – ₹4,000</option>
                  <option value="luxury">₹4,000+</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const isWishlisted = !!wishlist[room._id || room.id];
            const coverImage =
              room.images?.[0]?.url ||
              hotelImages.rooms[room.slug === "executive-ganga-view-suite" ? "riverViewSuite" : "deluxe"]?.cover ||
              hotelImages.heroBanner;

            return (
              <div
                key={room._id || room.slug}
                className="hotel-card group flex flex-col justify-between overflow-hidden"
              >
                {/* Photo & Tag Header */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={coverImage}
                    alt={room.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                  {/* Status Tag Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#23225C] text-white shadow-md">
                      {room.tag || "Available"}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(room._id || room.id, e)}
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white shadow-md transition-all active:scale-90"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>

                  {/* View Badge */}
                  <div className="absolute bottom-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                      {room.view}
                    </span>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    <span>{room.ratingAverage || 4.8}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B6FEA] block mb-1">
                      {room.roomType}
                    </span>

                    <Link href={`/rooms/${room.slug}`}>
                      <h2 className="font-serif font-bold text-xl text-slate-900 group-hover:text-[#23225C] transition-colors mb-2">
                        {room.title}
                      </h2>
                    </Link>

                    {/* Room Specs */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 pb-3.5 border-b border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>Up to {room.capacity?.adults || 2} Guests</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-slate-400" />
                        <span>{room.sizeSqFt || room.roomSizeSqFt || 280} sq.ft</span>
                      </span>
                    </div>

                    {/* Amenity Badges */}
                    <div className="flex flex-wrap gap-1.5 py-3.5">
                      {(room.amenities || []).slice(0, 4).map((amenity: string, i: number) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Transparent Pricing & CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-end justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold text-[#23225C]">
                          {formatPrice(room.basePrice)}
                        </span>
                        {room.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatPrice(room.originalPrice)}
                          </span>
                        )}
                        <span className="text-xs text-slate-500">/ night</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block">
                        + {formatPrice(Math.round(room.basePrice * 0.12))} taxes & fees
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/booking?room=${room.slug}`}
                        className="btn-navy px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#23225C]/20 transition-all flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
