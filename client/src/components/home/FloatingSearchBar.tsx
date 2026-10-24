"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  Users, 
  Search, 
  MapPin, 
  BedDouble, 
  ChevronDown 
} from "lucide-react";

export default function FloatingSearchBar() {
  const router = useRouter();

  // Tomorrow as default check-in, day after as check-out
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
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      roomType,
    });
    router.push(`/rooms?${query.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="floating-search-card p-4 sm:p-6 transition-all duration-300">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Check-In Date */}
          <div className="flex flex-col p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#6B6FEA]" /> Check-In
            </span>
            <input
              type="date"
              value={checkIn}
              min={formatDate(today)}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              required
            />
          </div>

          {/* Check-Out Date */}
          <div className="flex flex-col p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#6B6FEA]" /> Check-Out
            </span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || formatDate(today)}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              required
            />
          </div>

          {/* Guests & Room Category */}
          <div className="flex flex-col p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-[#6B6FEA]" /> Guests & Category
            </span>
            <div className="flex items-center justify-between gap-2">
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer w-1/2"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Family</option>
              </select>
              <span className="text-slate-300">|</span>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer w-1/2"
              >
                <option value="all">Any Room</option>
                <option value="deluxe">Deluxe</option>
                <option value="riverView">Ganga View</option>
                <option value="suite">Suite</option>
              </select>
            </div>
          </div>

          {/* Search Trigger Button */}
          <div className="h-full flex items-end">
            <button
              type="submit"
              className="btn-navy w-full h-[58px] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#23225C]/25 hover:shadow-xl transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Search Availability</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
