import React from "react";
import { ShieldCheck, Tag, Headphones, CheckCircle2 } from "lucide-react";

export default function FeatureStrip() {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Verified Stay",
      description: "Direct hotel reservation with instant booking confirmation",
      badge: "Verified",
    },
    {
      icon: Tag,
      title: "Best Price Guarantee",
      description: "No hidden platform commissions or sudden markups",
      badge: "Direct Save",
    },
    {
      icon: Headphones,
      title: "24/7 Guest Assistance",
      description: "Personalized concierge for rafting, cabs & temple visits",
      badge: "Always Open",
    },
    {
      icon: CheckCircle2,
      title: "Flexible Policies",
      description: "Hassle-free date rescheduling & pay at hotel options",
      badge: "Zero Risk",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEF0FC] text-[#23225C] flex items-center justify-center shrink-0 group-hover:bg-[#23225C] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="font-bold text-sm text-[#111030]">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
