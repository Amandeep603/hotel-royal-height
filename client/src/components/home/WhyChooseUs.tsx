import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mountain, Coffee, Wifi, Sparkles } from "lucide-react";
import hotelImages from "@/data/images";

export default function WhyChooseUs() {
  const highlights = [
    {
      title: "Pristine Tapovan Location",
      desc: "Away from highway congestion yet minutes away from Laxman Jhula footbridges, spiritual cafes, and the sacred river bank.",
    },
    {
      title: "Rooftop Cafe with 360° Valley Views",
      desc: "Savor freshly prepared Indian and continental delicacies while soaking in the majestic morning sunrise over Shivalik ranges.",
    },
    {
      title: "Workation & Spiritual Retreat Ready",
      desc: "Equipped with high-speed 200 Mbps fiber Wi-Fi, dedicated power backups, quiet work corners, and an open yoga lawn.",
    },
    {
      title: "Personalized Adventure & Temple Concierge",
      desc: "Direct coordination for white-water river rafting, bungee jumping, scooters, and evening Triveni Ghat Ganga Aarti taxis.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with Rounded Image & Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Rounded Photo */}
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={hotelImages.hotelExterior}
                  alt="Hotel Royal Heights Rishikesh Exterior and Mountain Surroundings"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Secondary Floating Mini Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 max-w-[240px] sm:max-w-[270px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF0FC] text-[#23225C] flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5 text-[#6B6FEA]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Top Rated</span>
                    <h4 className="text-sm font-bold text-slate-900">4.9 / 5.0 Rating</h4>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Recognized for cleanliness, mountain views, and genuine hospitality.
                </p>
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#6B6FEA]/15 rounded-full blur-2xl -z-10" />
            </div>
          </div>

          {/* Right Column: Narrative & Feature Checklist */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#EEF0FC] text-[#23225C] text-xs font-bold uppercase tracking-wider mb-4">
              Why Choose Royal Heights
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight leading-tight mb-5">
              Experience the True Essence of Rishikesh Hospitality
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-8">
              At Hotel Royal Heights, we blend modern comfort with the timeless serenity of the Himalayas. Whether you are traveling for peace, yoga teacher training, family vacations, or adrenaline rafting, our retreat provides an authentic sanctuary.
            </p>

            {/* Checklist */}
            <div className="space-y-4 mb-8 w-full">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/rooms"
              className="btn-navy px-6 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2.5 shadow-md shadow-[#23225C]/20 hover:gap-3 transition-all"
            >
              <span>Explore Our Rooms & Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
