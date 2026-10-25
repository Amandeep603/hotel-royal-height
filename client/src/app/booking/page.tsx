"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  ChevronRight,
  AlertCircle,
  Award
} from "lucide-react";
import hotelConfig from "@/config/hotel";
import hotelImages from "@/data/images";
import { formatPrice } from "@/lib/utils";
import { createBooking, validateCoupon } from "@/lib/api";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomSlug = searchParams.get("room") || "executive-ganga-view-suite";
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const couponParam = searchParams.get("coupon") || "";

  // Dates fallback
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(checkInParam || formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(checkOutParam || formatDate(defaultCheckOut));
  const [roomsCount, setRoomsCount] = useState(1);
  const [adults, setAdults] = useState(2);

  // Guest details form state
  const [name, setName] = useState("Vikram Malhotra");
  const [email, setEmail] = useState("vikram.m@example.com");
  const [phone, setPhone] = useState("+91 98100 12345");
  const [address, setAddress] = useState("New Delhi, India");
  const [specialRequests, setSpecialRequests] = useState("High floor room with Ganga view if possible.");

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<"pay_at_hotel" | "razorpay">("pay_at_hotel");

  // Coupon state
  const [couponCode, setCouponCode] = useState(couponParam || "");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentRoom =
    hotelConfig.roomCategories.find((r) => r.slug === roomSlug) ||
    hotelConfig.roomCategories[2];

  // Pricing math
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  const roomRate = currentRoom.basePrice;
  const baseTotal = roomRate * nights * roomsCount;

  // Auto-apply initial coupon
  useEffect(() => {
    if (couponCode.toUpperCase() === "DIRECT10" && baseTotal > 0) {
      const disc = Math.round(baseTotal * 0.1);
      setDiscountAmount(disc);
      setCouponMessage("DIRECT10 applied! 10% Direct Booking Discount.");
    }
  }, [baseTotal, couponCode]);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    try {
      const res = await validateCoupon(couponCode, baseTotal);
      if (res?.success && res.coupon) {
        setDiscountAmount(res.coupon.discountAmount);
        setCouponMessage(`Coupon applied! Saved ${formatPrice(res.coupon.discountAmount)}`);
      } else {
        setDiscountAmount(0);
        setCouponMessage(res?.message || "Invalid coupon.");
      }
    } catch (e) {
      if (couponCode.toUpperCase() === "DIRECT10") {
        setDiscountAmount(Math.round(baseTotal * 0.1));
        setCouponMessage("DIRECT10 applied! 10% Direct Booking Discount.");
      }
    }
  };

  const taxableAmount = Math.max(0, baseTotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.12);
  const grandTotal = taxableAmount + tax;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        roomSlug: currentRoom.slug,
        checkIn,
        checkOut,
        roomsCount,
        guests: { adults, children: 0 },
        guestDetails: {
          name,
          email,
          phone,
          address,
          specialRequests,
        },
        couponCode: discountAmount > 0 ? couponCode : undefined,
        paymentMethod,
      };

      const res = await createBooking(payload);

      if (res?.success && res.booking) {
        const bookingId = res.booking.bookingNumber || res.booking._id;
        router.push(`/booking/confirmation/${bookingId}`);
      } else {
        setErrorMessage(res?.message || "Failed to confirm reservation. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Step Tracker */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#23225C]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/rooms" className="hover:text-[#23225C]">Rooms</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#23225C]">Direct Booking Checkout</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight">
            Complete Your Reservation
          </h1>
        </div>

        <form onSubmit={handleSubmitBooking}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Guest Details & Payment Method */}
            <div className="lg:col-span-8 space-y-8">
              {/* Alert Error Box if Any */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Stay Details Review */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <h2 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#23225C] text-white text-xs flex items-center justify-center font-sans">
                      1
                    </span>
                    <span>Your Selected Stay</span>
                  </h2>
                  <Link href={`/rooms/${currentRoom.slug}`} className="text-xs font-bold text-[#6B6FEA] hover:underline">
                    Change Room
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-full sm:w-44 h-28 rounded-2xl overflow-hidden shrink-0">
                    <Image
                      src={
                        hotelImages.rooms[currentRoom.slug === "executive-ganga-view-suite" ? "riverViewSuite" : "deluxe"]?.cover ||
                        hotelImages.heroBanner
                      }
                      alt={currentRoom.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6FEA]">
                      {currentRoom.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{currentRoom.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-3">
                      Tapovan, Rishikesh · {currentRoom.view}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-In</span>
                        <span className="font-bold text-slate-800">{checkIn} (12 PM)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-Out</span>
                        <span className="font-bold text-slate-800">{checkOut} (11 AM)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                        <span className="font-bold text-slate-800">{nights} {nights === 1 ? "Night" : "Nights"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Guest Contact Information */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                <h2 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#23225C] text-white text-xs flex items-center justify-center font-sans">
                    2
                  </span>
                  <span>Primary Guest Details</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#23225C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Email Address (for Instant Confirmation) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#23225C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#23225C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      City of Residence
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="New Delhi, Mumbai, etc."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#23225C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="E.g., early check-in, high floor, quiet room, rafting booking assistance..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#23225C]"
                  />
                </div>
              </div>

              {/* Step 3: Payment Options */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                <h2 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#23225C] text-white text-xs flex items-center justify-center font-sans">
                    3
                  </span>
                  <span>Select Payment Preference</span>
                </h2>

                <div className="space-y-3">
                  {/* Option 1: Pay at Hotel */}
                  <label
                    onClick={() => setPaymentMethod("pay_at_hotel")}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "pay_at_hotel"
                        ? "border-[#23225C] bg-[#EEF0FC]/40"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "pay_at_hotel"}
                      onChange={() => setPaymentMethod("pay_at_hotel")}
                      className="mt-1 accent-[#23225C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">
                          Pay at Hotel (Cash, UPI or Card on Arrival)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          Zero Advance Required
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Reserve with instant confirmation today. Pay at reception when you check-in at Tapovan, Rishikesh.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Razorpay Test Mode */}
                  <label
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "razorpay"
                        ? "border-[#23225C] bg-[#EEF0FC]/40"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="mt-1 accent-[#23225C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#6B6FEA]" />
                          Online Payment (UPI, Debit/Credit Card, Net Banking)
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          Secure Gateway
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Encrypted 256-bit checkout via Razorpay Test mode.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Order Summary & Instant Checkout */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
                <h3 className="font-serif font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
                  Fare Summary
                </h3>

                {/* Price Lines */}
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>
                      {formatPrice(roomRate)} × {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                    <span className="font-semibold text-slate-800">{formatPrice(baseTotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Direct Promo ({couponCode})</span>
                      <span>- {formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>12% GST & Hotel Fees</span>
                    <span className="font-semibold text-slate-800">{formatPrice(tax)}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Total Payable</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#23225C]">
                        {formatPrice(grandTotal)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Inclusive of all taxes
                      </span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase font-bold text-slate-800 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] mt-1.5 ${discountAmount > 0 ? "text-emerald-600 font-semibold" : "text-rose-500"}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                {/* Confirm Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-navy w-full py-4 rounded-2xl font-bold text-sm shadow-xl shadow-[#23225C]/25 hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Securing Your Reservation...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Book Room</span>
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="space-y-2 pt-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Free cancellation up to 48 hrs before check-in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Official Direct Reservation Confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-600">Loading reservation checkout...</div>}>
      <BookingContent />
    </Suspense>
  );
}
