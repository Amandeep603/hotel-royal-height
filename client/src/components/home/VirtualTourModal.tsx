"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Compass, RotateCw, BedDouble, Maximize2, Sparkles } from "lucide-react";
import siteConfig from "@/data/site";

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomTitle?: string;
  image?: string;
}

export default function VirtualTourModal({
  isOpen,
  onClose,
  roomTitle = "Executive Ganga View Suite",
  image = siteConfig.rooms[0].images[0],
}: VirtualTourModalProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!isOpen) return null;

  const views = siteConfig.virtualTour.tabs;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-950 text-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C9A24B] text-white flex items-center justify-center shadow-md">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] block">
                  360° Virtual Inspection Mode
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                  {views[activeIdx].title} — {views[activeIdx].subtitle}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Panoramic Viewport */}
          <div className="relative h-[360px] sm:h-[500px] w-full bg-black overflow-hidden flex items-center justify-center group select-none">
            <Image
              src={views[activeIdx].image}
              alt={views[activeIdx].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

            {/* Hint */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Panoramic Preview Active</span>
            </div>

            {/* Bottom viewpoint switcher */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
              <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
                <p className="text-xs text-white font-medium">{views[activeIdx].caption}</p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                {views.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveIdx(i)}
                    className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeIdx === i
                        ? "bg-[#C9A24B] text-white shadow-md"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-white">
                <BedDouble className="w-3.5 h-3.5 text-[#C9A24B]" /> King Plush Mattresses
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-white">
                <Maximize2 className="w-3.5 h-3.5 text-[#C9A24B]" /> Private Mountain Balconies
              </span>
            </div>

            <button
              onClick={onClose}
              className="min-h-[40px] px-6 py-2 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Exit Tour
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
