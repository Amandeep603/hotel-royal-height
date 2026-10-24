import React from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import hotelImages from "@/data/images";

export default function Testimonials() {
  const reviews = [
    {
      name: "Aarav & Priya Sharma",
      location: "New Delhi",
      type: "Couple Getaway",
      avatar: hotelImages.avatars[0],
      stars: 5,
      comment:
        "The Ganga View suite exceeded all our expectations! Waking up to the morning bells and tea on the balcony was pure magic. Staff arranged a private cab for Triveni Ghat Aarti seamlessly.",
    },
    {
      name: "Marcus Vance",
      location: "Melbourne, Australia",
      type: "Solo Yoga Retreat",
      avatar: hotelImages.avatars[1],
      stars: 5,
      comment:
        "Stayed for 10 days while completing my 200h yoga certification in Tapovan. Reliable high-speed fiber Wi-Fi, peaceful rooftop, super clean rooms, and genuine Garhwali hospitality.",
    },
    {
      name: "Rohit Deshmukh",
      location: "Mumbai",
      type: "Family Vacation",
      avatar: hotelImages.avatars[2],
      stars: 5,
      comment:
        "We booked the Family Suite for 4 adults and 2 kids. Very spacious, impeccable hygiene, and great vegetarian food at the rooftop cafe. The hotel arranged Shivpuri rafting for us at the best price.",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EEF0FC] text-[#23225C] text-xs font-bold uppercase tracking-wider mb-3">
            Guest Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#111030] tracking-tight">
            Loved by Travelers from Around the Globe
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3">
            Read real stories from guests who chose Hotel Royal Heights for their Rishikesh journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-600 leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <span className="text-xs text-slate-400">
                    {rev.location} · {rev.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
