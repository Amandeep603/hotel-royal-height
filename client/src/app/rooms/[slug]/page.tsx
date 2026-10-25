"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  Users, 
  Maximize2, 
  Bed, 
  Eye, 
  Star, 
  Calendar, 
  ShieldCheck, 
  Check, 
  X, 
  Share2, 
  Heart, 
  ChevronRight,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight
} from "lucide-react";
import hotelConfig from "@/config/hotel";
import hotelImages from "@/data/images";
import { formatPrice } from "@/lib/utils";
import { fetchRoomBySlug, validateCoupon } from "@/lib/api";

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [room, setRoom] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Booking Card State
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDate(defaultCheckOut));
  const [adults, setAdults] = useState("2");
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function loadRoom() {
      // Find in config first
      const configRoom = (hotelConfig.roomCategories as any[]).find((r) => r.slug === slug);
      let foundRoom: any = configRoom;

      try {
        const backendData = await fetchRoomBySlug(slug);
        if (backendData?.success && backendData.room) {
          foundRoom = backendData.room;
        }
      } catch (e) {
        // use config fallback
      }

      setRoom(foundRoom);

      // Set initial image
      const cover =
        foundRoom?.images?.[0]?.url ||
        hotelImages.rooms[slug === "executive-ganga-view-suite" ? "riverViewSuite" : "deluxe"]?.cover ||
        hotelImages.heroBanner;
      setActiveImage(cover);
    }
    if (slug) loadRoom();
  }, [slug]);

  if (!room) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-[#23225C] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Loading room details...</p>
      </div>
    );
  }

  // Calculate Nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  const baseRate = room.basePrice || 2499;
  const baseTotal = baseRate * nights;
  const taxableTotal = Math.max(0, baseTotal - discountAmount);
  const taxes = Math.round(taxableTotal * 0.12);
  const grandTotal = taxableTotal + taxes;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    try {
      const res = await validateCoupon(couponCode, baseTotal);
      if (res?.success && res.coupon) {
        setDiscountAmount(res.coupon.discountAmount);
        setCouponMessage(`Promo applied! Saved ${formatPrice(res.coupon.discountAmount)}`);
      } else {
        setDiscountAmount(0);
        setCouponMessage(res?.message || "Invalid coupon code.");
      }
    } catch (e) {
      if (couponCode.toUpperCase() === "DIRECT10") {
        const disc = Math.round(baseTotal * 0.1);
        setDiscountAmount(disc);
        setCouponMessage(`DIRECT10 applied! 10% Off saved.`);
      } else {
        setCouponMessage("Invalid coupon code.");
      }
    }
  };

  const handleProceedToBooking = () => {
    const query = new URLSearchParams({
      room: room.slug,
      checkIn,
      checkOut,
      adults,
      ...(discountAmount > 0 && couponCode ? { coupon: couponCode } : {}),
    });
    router.push(`/booking?${query.toString()}`);
  };

  // Gallery Photos
  const galleryImages = room.images?.map((img: any) => img.url) || [
    activeImage,
    hotelImages.hotelExterior,
    hotelImages.lobby,
    hotelImages.rooftopCafe,
  ];

  return (
    <div className="min-h-screen py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#23225C]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/rooms" className="hover:text-[#23225C]">Rooms</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#23225C]">{room.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 hover:text-rose-500 shadow-sm"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
              <span>{isWishlisted ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Title & Location Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#EEF0FC] text-[#23225C] text-xs font-bold uppercase tracking-wider">
                {room.roomType}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                {room.view}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight">
              {room.title}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Hotel Royal Heights · Upper Tapovan, Rishikesh, Uttarakhand 249192
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
            <Star className="w-5 h-5 fill-amber-400 stroke-amber-500" />
            <div>
              <span className="text-sm font-bold text-slate-900">{room.ratingAverage || 4.9} / 5.0</span>
              <span className="text-xs text-slate-400 ml-1.5">({room.ratingQuantity || 120}+ Reviews)</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid with Lightbox Trigger */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {/* Main Large Visual */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="md:col-span-3 relative h-[360px] sm:h-[460px] rounded-3xl overflow-hidden cursor-pointer group shadow-lg"
          >
            <Image
              src={activeImage}
              alt={room.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 75vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>View Fullscreen Gallery ({galleryImages.length} Photos)</span>
            </div>
          </div>

          {/* Side Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {galleryImages.slice(0, 3).map((imgUrl: string, idx: number) => (
              <div
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`relative h-24 md:h-36 w-32 md:w-full rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${
                  activeImage === imgUrl ? "border-[#23225C] shadow-md" : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content & Sticky Booking Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details & Amenities */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF0FC] text-[#23225C] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400">Capacity</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {room.capacity?.adults || 2} Adults
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF0FC] text-[#23225C] flex items-center justify-center">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400">Bed Type</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {room.bedType || "King Bed"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF0FC] text-[#23225C] flex items-center justify-center">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400">Room Size</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {room.sizeSqFt || 320} sq.ft
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF0FC] text-[#23225C] flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400">Balcony View</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {room.view || "Himalayan"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold font-serif text-slate-900 mb-4">
                About This Room
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Immerse yourself in serenity with handcrafted interiors that reflect the peaceful charm of the Rishikesh foothills. Designed with high ceilings, soundproof mountain-facing windows, and plush organic cotton linens, this sanctuary ensures restorative slumber after days spent rafting on the Ganges or practicing yoga.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Step out onto your private balcony at dawn to witness morning mists lifting over the Shivalik range, accompanied by piping hot ginger-lemon-honey tea from our 24/7 room service.
              </p>
            </div>

            {/* Room Amenities */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold font-serif text-slate-900 mb-6">
                Room Amenities & Privileges
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(room.amenities || [
                  "High-Speed Fiber Wi-Fi",
                  "Air Conditioning",
                  "Private Mountain Balcony",
                  "Smart LED TV",
                  "Hot Water Geyser (24/7)",
                  "Tea & Coffee Maker",
                  "Electric Kettle",
                  "Workstation Desk",
                  "Daily Housekeeping",
                  "Complimentary Toiletries",
                  "Fresh Bath Linens",
                  "Room Service Available",
                ]).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies & House Rules */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-bold font-serif text-slate-900 mb-4">
                Stay Policies & House Rules
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <p className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#6B6FEA] shrink-0 mt-0.5" />
                  <span><strong>Check-in:</strong> 12:00 PM | <strong>Check-out:</strong> 11:00 AM</span>
                </p>
                <p className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cancellation:</strong> {room.cancellationPolicy || hotelConfig.policies.cancellation}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Valid government-issued photo ID required at check-in for all adult guests.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Reservation Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 hotel-card p-6 sm:p-8 bg-white border border-slate-200/80 shadow-xl">
              {/* Price Header */}
              <div className="flex items-baseline justify-between pb-5 border-b border-slate-100 mb-6">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-[#23225C]">
                      {formatPrice(baseRate)}
                    </span>
                    <span className="text-xs text-slate-500">/ night</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    + {formatPrice(Math.round(baseRate * 0.12))} taxes & fees
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Best Rate Guaranteed
                </span>
              </div>

              {/* Date Inputs */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={formatDate(today)}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-800 w-full focus:outline-none"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-800 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Guests
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-800 w-full focus:outline-none"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                  </select>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs uppercase font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#23225C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-[11px] mt-1.5 ${discountAmount > 0 ? "text-emerald-600 font-semibold" : "text-rose-500"}`}>
                    {couponMessage}
                  </p>
                )}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-600 pb-5 border-b border-slate-100 mb-6">
                <div className="flex justify-between">
                  <span>{formatPrice(baseRate)} × {nights} {nights === 1 ? "night" : "nights"}</span>
                  <span className="font-semibold text-slate-800">{formatPrice(baseTotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Direct Promo Discount</span>
                    <span>- {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Goods & Services Tax (12% GST)</span>
                  <span className="font-semibold text-slate-800">{formatPrice(taxes)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Amount</span>
                  <span className="text-[#23225C]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleProceedToBooking}
                className="btn-navy w-full py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#23225C]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-3"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                You won&apos;t be charged yet · Pay at Hotel option available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          <div className="flex items-center justify-between text-white pb-4">
            <h3 className="font-serif font-bold text-lg">{room.title} Gallery</h3>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 max-w-5xl mx-auto w-full my-4">
            <Image
              src={activeImage}
              alt="Room full view"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
            {galleryImages.map((img: string, idx: number) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImage === img ? "border-white scale-105" : "border-transparent opacity-60"
                }`}
              >
                <Image src={img} alt="Thumbnail" fill className="object-cover" sizes="80px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
