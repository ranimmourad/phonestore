"use client";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Wrench, ShoppingBag, Star } from "lucide-react";

const stats = [
  { icon: Users, value: 5200, suffix: "+", label: "Clients satisfaits" },
  { icon: Wrench, value: 10500, suffix: "+", label: "Réparations effectuées" },
  { icon: ShoppingBag, value: 25000, suffix: "+", label: "Produits vendus" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Note Google" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setN(v),
    });
    return controls.stop;
  }, [inView, value]);

  const isFloat = value % 1 !== 0;
  return (
    <span ref={ref} className="font-display text-3xl sm:text-5xl font-bold gradient-text">
      {isFloat ? n.toFixed(1) : Math.round(n).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Counters() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl glass p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand-600/20 blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-400/20 blur-[120px]" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const I = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/30 grid place-items-center mx-auto mb-3 text-brand-300">
                    <I size={20} />
                  </div>
                  <Counter value={s.value} suffix={s.suffix} />
                  <div className="mt-2 text-xs sm:text-sm text-white/60 uppercase tracking-wider">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
