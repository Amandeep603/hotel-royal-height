"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  CheckCircle2, 
  Download, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Printer, 
  ChevronRight,
  ShieldCheck,
  Compass
} from "lucide-react";
import hotelConfig from "@/config/hotel";
import { formatPrice } from "@/lib/utils";
import { fetchBookingById } from "@/lib/api";

export default function ConfirmationPage() {
  const params = useParams();
  const id = params?.id as string;

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetchBookingById(id);
        if (res?.success && res.booking) {
          setBooking(res.booking);
        }
      } catch (e) {
        // Fallback mock booking if offline
        setBooking({
          bookingNumber: id || "RH-2026-1042",
          guestDetails: {
            name: "Vikram Malhotra",
            email: "vikram.m@example.com",
            phone: "+91 98100 12345",
          },
          room: {
            title: "Executive Ganga View Suite",
            roomType: "Executive Suite",
          },
          checkInDate: new Date(),
          checkOutDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          nights: 2,
          roomsCount: 1,
          guests: { adults: 2, children: 0 },
          priceBreakdown: {
            grandTotal: 8958,
          },
          paymentMethod: "pay_at_hotel",
          paymentStatus: "pending",
        });
      } finally {
        setLoading(false);
      }
    }
    if (id) loadBooking();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-12 lg:py-20 bg-slate-50/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#6B6FEA]">
            Reservation Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight mt-1 mb-2">
            We Look Forward to Welcoming You to Rishikesh!
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            A confirmation receipt and stay instructions have been sent to{" "}
            <strong className="text-slate-800">{booking?.guestDetails?.email || "your email"}</strong>.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden mb-8">
          {/* Top Banner with Booking Reference Number */}
          <div className="bg-[#23225C] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9FA2F8]">
                Booking Reference ID
              </span>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white mt-0.5">
                {booking?.bookingNumber || id}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`http://localhost:5000/api/v1/bookings/${id}/invoice`}
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-white/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Invoice PDF</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="bg-white text-[#23225C] hover:bg-slate-100 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Stay Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8 border-b border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Reserved Room
                </span>
                <h4 className="font-bold text-sm text-slate-800">
                  {booking?.room?.title || "Executive Ganga View Suite"}
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Dates & Duration
                </span>
                <h4 className="font-bold text-sm text-slate-800">
                  {booking?.nights || 2} Nights Stay
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Guest Name
                </span>
                <h4 className="font-bold text-sm text-slate-800">
                  {booking?.guestDetails?.name || "Vikram Malhotra"}
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Total Amount
                </span>
                <h4 className="font-bold text-base text-[#23225C]">
                  {formatPrice(booking?.priceBreakdown?.grandTotal || 8958)}
                </h4>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  {booking?.paymentMethod === "pay_at_hotel" ? "Pay at Reception" : "Paid Online"}
                </span>
              </div>
            </div>

            {/* Check-In Instructions */}
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-4">
                Important Arrival & Stay Instructions
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#6B6FEA] shrink-0 mt-0.5" />
                  <span>
                    <strong>Standard Check-in:</strong> 12:00 PM | <strong>Check-out:</strong> 11:00 AM. Complimentary early check-in subject to room availability upon arrival.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#6B6FEA] shrink-0 mt-0.5" />
                  <span>
                    <strong>Address:</strong> Badrinath National Highway, Upper Tapovan, Rishikesh, Uttarakhand 249192 (Near Tapovan Auto Stand).
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Please carry valid government photo IDs (Aadhaar, Passport, Voter ID or DL) for all checking-in adult guests.
                  </span>
                </div>
              </div>
            </div>

            {/* Concierge Assistance */}
            <div className="bg-[#EEF0FC]/50 p-5 rounded-2xl border border-[#6B6FEA]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#23225C] text-white flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#9FA2F8]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Need Rafting or Taxi Arrangements?</h4>
                  <p className="text-xs text-slate-500">Contact our 24/7 Rishikesh travel desk</p>
                </div>
              </div>

              <a
                href="tel:+919876543210"
                className="btn-navy px-5 py-2.5 rounded-full text-xs font-bold inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-bold text-[#23225C] hover:text-[#6B6FEA] transition-colors"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
