"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Users, 
  Search, 
  BedDouble,
  ChevronDown 
} from "lucide-react";

export default function FloatingSearchBar() {
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDate(defaultCheckOut));
  const [roomType, setRoomType] = useState("all");
  const [adults, setAdults] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll smoothly to rooms section and select category
    const roomsSection = document.getElementById("rooms");
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className="floating-search-card bg-white rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-2xl border border-slate-200/90 transition-all duration-300">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-1 items-center">
          
          {/* Segment 1: Check-In Date */}
          <div className="flex flex-col justify-center px-4 py-2.5 sm:py-1.5 hover:bg-slate-50/80 rounded-xl sm:rounded-full transition-colors lg:border-r border-slate-200/80">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Check-In Date
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <Calendar className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <input
                type="date"
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer w-full"
                required
              />
            </div>
          </div>

          {/* Segment 2: Check-Out Date */}
          <div className="flex flex-col justify-center px-4 py-2.5 sm:py-1.5 hover:bg-slate-50/80 rounded-xl sm:rounded-full transition-colors lg:border-r border-slate-200/80">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Check-Out Date
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <Calendar className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <input
                type="date"
                value={checkOut}
                min={checkIn || formatDate(today)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer w-full"
                required
              />
            </div>
          </div>

          {/* Segment 3: Guests & Category */}
          <div className="flex flex-col justify-center px-4 py-2.5 sm:py-1.5 hover:bg-slate-50/80 rounded-xl sm:rounded-full transition-colors">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Guests & Room Type
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <Users className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Family</option>
              </select>
              <span className="text-slate-300">·</span>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">Any Category</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Ganga Suite</option>
                <option value="family">Family Suite</option>
              </select>
            </div>
          </div>

          {/* Segment 4: Search Button */}
          <div className="p-1 sm:p-0">
            <button
              type="submit"
              className="btn-navy w-full h-[52px] sm:h-[54px] rounded-xl sm:rounded-full font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#1B1B4B]/25 hover:shadow-xl active:scale-95 transition-all min-h-[44px]"
            >
              <Search className="w-4 h-4 text-[#C9A24B]" />
              <span>Search Rooms</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
