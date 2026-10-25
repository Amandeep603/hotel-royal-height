"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Send, Check, ShieldCheck, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import siteConfig from "@/data/site";
import { formatPrice } from "@/lib/utils";

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomTitle?: string;
  initialPrice?: number;
}

export default function WhatsAppBookingModal({
  isOpen,
  onClose,
  initialRoomTitle = "Executive Ganga View Suite",
  initialPrice = 3999,
}: WhatsAppBookingModalProps) {
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState(initialRoomTitle);
  const [checkIn, setCheckIn] = useState(formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDate(defaultCheckOut));
  const [adults, setAdults] = useState("2");
  const [specialNote, setSpecialNote] = useState("");

  // Calculate nights and estimated pricing
  const { nights, roomPrice, baseTotal, taxes, grandTotal } = useMemo(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.max(d2.getTime() - d1.getTime(), 1000 * 60 * 60 * 24);
    const calcNights = Math.round(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const matchedRoom = siteConfig.rooms.find((r) => r.title === room);
    const rate = matchedRoom ? matchedRoom.price : initialPrice;
    const calcBase = rate * calcNights;
    const calcTaxes = Math.round(calcBase * 0.12);
    const calcGrand = calcBase + calcTaxes;

    return {
      nights: calcNights,
      roomPrice: rate,
      baseTotal: calcBase,
      taxes: calcTaxes,
      grandTotal: calcGrand,
    };
  }, [checkIn, checkOut, room, initialPrice]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = 
`*Hotel Royal Heights — Direct WhatsApp Reservation*
---------------------------------------
👤 *Guest Name:* ${name.trim() || "Guest"}
📞 *Contact Phone:* ${phone.trim() || "Not provided"}
🏨 *Selected Room:* ${room}
📅 *Check-In:* ${checkIn}
📅 *Check-Out:* ${checkOut} (${nights} Night${nights > 1 ? "s" : ""})
👥 *Guests:* ${adults} Person(s)
💰 *Estimated Total:* ₹${grandTotal.toLocaleString("en-IN")} (incl. 12% GST)
📝 *Special Notes:* ${specialNote.trim() || "None"}
---------------------------------------
_Please confirm room availability and direct booking privileges for our stay._`;

    const encoded = encodeURIComponent(text);
    const phoneDigits = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${phoneDigits}?text=${encoded}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#1B1B4B] text-white p-5 sm:p-6 relative flex items-center justify-between border-b border-[#C9A24B]/30">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 shrink-0">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-lg sm:text-xl text-white">
                  Instant WhatsApp Booking
                </h3>
                <p className="text-xs text-[#F5ECDA]">Direct front desk confirmation &bull; Zero platform fees</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C9A24B] transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C9A24B] transition-colors"
                />
              </div>
            </div>

            {/* Room Selector */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Select Suite / Room Category
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#1B1B4B] focus:outline-none focus:border-[#C9A24B] bg-white cursor-pointer"
              >
                {siteConfig.rooms.map((r) => (
                  <option key={r.id} value={r.title}>
                    {r.title} — ₹{r.price.toLocaleString("en-IN")}/night
                  </option>
                ))}
              </select>
            </div>

            {/* Date Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Check-In Date
                </label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  min={formatDate(today)}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#C9A24B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  min={checkIn || formatDate(today)}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#C9A24B]"
                />
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Number of Guests
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#C9A24B] bg-white cursor-pointer"
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults / Family</option>
              </select>
            </div>

            {/* Special Request */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Special Requests (Optional)
              </label>
              <input
                type="text"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. High floor Ganga view, river rafting booking, airport pickup"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#C9A24B]"
              />
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="bg-[#FAF9F7] p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Room Rate:</span>
                <span className="font-semibold">{formatPrice(roomPrice)} &times; {nights} Night{nights > 1 ? "s" : ""}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Estimated Taxes (12% GST):</span>
                <span>{formatPrice(taxes)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between font-semibold text-[#1B1B4B]">
                <span className="text-sm">Estimated Total:</span>
                <span className="text-base text-[#C9A24B] font-bold">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full min-h-[48px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Confirm &amp; Send on WhatsApp</span>
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>No advance payment required. Instant chat with manager.</span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
