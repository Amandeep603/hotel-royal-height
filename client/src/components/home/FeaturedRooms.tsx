"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Users, 
  Maximize2, 
  MapPin, 
  Eye, 
  Star,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  ArrowRight
} from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import siteConfig, { RoomItem } from "@/data/site";
import { formatPrice } from "@/lib/utils";

interface FeaturedRoomsProps {
  onOpenWhatsApp?: (roomTitle: string, price: number) => void;
  onOpen360?: (roomTitle: string, image: string) => void;
}

function RoomCard({
  room,
  onOpenWhatsApp,
  onOpen360,
}: {
  room: RoomItem;
  onOpenWhatsApp?: (title: string, price: number) => void;
  onOpen360?: (title: string, image: string) => void;
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp(room.title, room.price);
    } else {
      const msg = encodeURIComponent(
        `Hello Hotel Royal Heights, I would like to book the "${room.title}" (₹${room.price}/night). Please share date availability!`
      );
      window.open(`https://wa.me/${siteConfig.hotel.contact.whatsApp.replace(/[^0-9]/g, '')}?text=${msg}`, "_blank");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/70 shadow-[0_8px_25px_-8px_rgba(27,27,75,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(27,27,75,0.12)] transition-all flex flex-col h-full group"
    >
      {/* 1. Image with aspect-[4/3] and carousel */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={room.images[currentImgIndex]}
          alt={room.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge (Top-Left) */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md ${room.badgeColor}`}>
            {room.badge}
          </span>
        </div>

        {/* Heart Wishlist Button (Top-Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white shadow-md transition-all active:scale-90"
          aria-label="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {/* Carousel Arrow Controls */}
        {room.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Carousel Dots */}
        {room.images.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 z-10 flex justify-center gap-1.5 pointer-events-none">
            {room.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentImgIndex === i ? "bg-white w-3.5" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title (single line, truncate) + Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-[17px] text-[#1B1B4B] group-hover:text-[#C9A24B] transition-colors truncate flex-1" title={room.title}>
              {room.title}
            </h3>
            <div className="flex items-center gap-1 bg-[#FDF8EE] px-1.5 py-0.5 rounded-lg text-xs font-bold text-[#C9A24B] shrink-0">
              <Star className="w-3 h-3 fill-[#C9A24B] stroke-[#C9A24B]" />
              <span>{room.rating}</span>
            </div>
          </div>

          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-normal">
            <MapPin className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
            <span className="truncate">{room.view}</span>
          </div>

          {/* Specs Row: 3-column grid, SHORT text, no wrapping */}
          <div className="grid grid-cols-3 gap-1 py-2.5 border-y border-slate-100 text-xs text-slate-600 font-medium mb-3">
            <span className="inline-flex items-center justify-center gap-1 whitespace-nowrap">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{room.capacityText}</span>
            </span>
            <span className="inline-flex items-center justify-center gap-1 whitespace-nowrap border-x border-slate-100">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{room.sizeText}</span>
            </span>
            <span className="inline-flex items-center justify-center gap-1 whitespace-nowrap">
              <BedDouble className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{room.bedText}</span>
            </span>
          </div>

          {/* Amenity Chips: max 3 + "+2 more" */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {room.amenities.slice(0, 3).map((amenity, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-lg bg-slate-50 text-[11px] font-medium text-slate-600 border border-slate-100"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="px-2 py-0.5 rounded-lg bg-slate-50 text-[11px] font-medium text-slate-400 border border-slate-100">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* 3. Footer: Divider -> Price -> Two Equal Buttons (Pushed with mt-auto) */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          {/* Price row */}
          <div className="mb-3.5 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-[#1B1B4B]">
                  {formatPrice(room.price)}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(room.originalPrice)}
                </span>
                <span className="text-xs text-slate-500 font-medium">/night</span>
              </div>
              <span className="text-[10px] text-slate-400 block">
                + {formatPrice(room.taxes)} taxes
              </span>
            </div>
          </div>

          {/* Two Equal Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onOpen360?.(room.title, room.images[0])}
              className="min-h-[42px] px-3 py-2 rounded-full text-xs font-bold text-[#1B1B4B] bg-slate-50 hover:bg-[#FDF8EE] hover:text-[#C9A24B] border border-slate-200 transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>360° View</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="min-h-[42px] px-3 py-2 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 active:scale-95 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Book on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function FeaturedRooms({ onOpenWhatsApp, onOpen360 }: FeaturedRoomsProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"All" | "Suite" | "Deluxe" | "Family">("All");

  const categories = ["All", "Suite", "Deluxe", "Family"] as const;

  // Filter logic
  const allFiltered = activeCategory === "All"
    ? siteConfig.rooms
    : siteConfig.rooms.filter((r) => r.category === activeCategory);

  // Show exactly 3 featured unless expanded
  const displayedRooms = showAll ? allFiltered : allFiltered.slice(0, 3);

  return (
    <section id="rooms" className="py-14 md:py-20 bg-white border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        
        {/* Standard Centered Header Pattern */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C9A24B] mb-2 block">
            FEATURED ACCOMMODATION
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.4rem] font-serif font-semibold text-[#1B1B4B] tracking-tight leading-[1.15] mb-2">
            Rooms & Suites
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            Thoughtfully designed with warm wood finishes, private balconies, and scenic Himalayan vistas.
          </p>

          {/* Centered filter tabs BELOW header */}
          {showAll && (
            <div className="flex items-center justify-center gap-2 mt-6 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    activeCategory === cat
                      ? "bg-[#1B1B4B] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat === "All" ? "All Categories" : `${cat}s`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {displayedRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onOpenWhatsApp={onOpenWhatsApp}
              onOpen360={onOpen360}
            />
          ))}
        </div>

        {/* View All Rooms Button */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="btn-navy px-8 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md shadow-[#1B1B4B]/20 hover:shadow-lg active:scale-95 transition-all inline-flex items-center gap-2 min-h-[44px]"
          >
            <span>{showAll ? "Show Top 3 Rooms" : "View All Rooms & Suites"}</span>
            <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
          </button>
        </div>

      </div>
    </section>
  );
}
