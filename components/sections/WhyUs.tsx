"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Award, Headphones, Clock, Truck } from "lucide-react";
import { useLang } from "@/lib/lang";

const features = [
  { icon: Zap, title: "Service Express", desc: "Réparations en moins de 24h pour la plupart des pannes." },
  { icon: ShieldCheck, title: "Garantie Totale", desc: "Pièces de qualité et garantie sur toutes nos réparations." },
  { icon: Award, title: "Experts Certifiés", desc: "Techniciens qualifiés et expérimentés depuis des années." },
  { icon: Headphones, title: "Support 7j/7", desc: "Hotline dédiée pour répondre à toutes vos questions." },
  { icon: Clock, title: "Diagnostic Gratuit", desc: "Évaluation sans frais avant toute intervention." },
  { icon: Truck, title: "Livraison Rapide", desc: "Livraison à domicile dans tout El Mourouj et environs." },
];

export default function WhyUs() {
  const { t } = useLang();
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-600/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300">
            Avantages
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t("why_title")} <span className="gradient-text">?</span>
          </h2>
          <p className="mt-4 text-white/60">
            Une expérience client premium, des services rapides et une qualité irréprochable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const I = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative gradient-border rounded-2xl p-6 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-brand-500/10 via-transparent to-transparent" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-500/30 grid place-items-center mb-4 group-hover:rotate-6 group-hover:scale-110 transition">
                    <I size={22} className="text-brand-300" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
