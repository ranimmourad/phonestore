"use client";
import { Smartphone, Headphones, Watch, Gamepad2, Cable, Plug, Shield, Laptop, Sun, Zap, Ear } from "lucide-react";

const items = [
  { icon: Smartphone, label: "Phone Repair" },
  { icon: Laptop, label: "PC Repair" },
  { icon: Headphones, label: "Headphones" },
  { icon: Watch, label: "Smartwatches" },
  { icon: Gamepad2, label: "Gaming" },
  { icon: Cable, label: "USB Cables" },
  { icon: Plug, label: "Adapters" },
  { icon: Shield, label: "Screen Protection" },
  { icon: Sun, label: "Ring Lights" },
  { icon: Zap, label: "Fast Chargers" },
  { icon: Ear, label: "EarPods" },
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="relative py-8 border-y border-white/5 bg-ink-800/60 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />
      <div className="marquee-track flex gap-10 sm:gap-16 animate-marquee whitespace-nowrap">
        {doubled.map((it, i) => {
          const I = it.icon;
          return (
            <div key={i} className="flex items-center gap-3 text-white/80 hover:text-white transition">
              <I size={20} className="text-brand-400" />
              <span className="font-display font-semibold text-lg tracking-tight">{it.label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
