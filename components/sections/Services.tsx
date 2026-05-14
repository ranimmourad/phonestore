"use client";
import { motion } from "framer-motion";
import { Smartphone, Laptop, ShoppingBag, Headphones } from "lucide-react";
import { useLang } from "@/lib/lang";

const services = [
  {
    icon: Smartphone,
    title: "Réparation Téléphone",
    desc: "Écrans, batteries, connecteurs, déblocage. Toutes marques : iPhone, Samsung, Xiaomi, Huawei...",
    points: ["Diagnostic gratuit", "Pièces de qualité", "Garantie 3 mois"],
    color: "from-brand-500 to-brand-700",
  },
  {
    icon: Laptop,
    title: "Réparation PC",
    desc: "Ordinateurs portables & fixes : panne hardware, installation, formatage, nettoyage.",
    points: ["Récupération données", "Mise à jour logiciels", "Nettoyage interne"],
    color: "from-brand-400 to-brand-600",
  },
  {
    icon: ShoppingBag,
    title: "Vente Accessoires",
    desc: "Chargeurs, câbles, coques, écouteurs, smartwatches, ring lights et accessoires gaming.",
    points: ["Produits premium", "Prix imbattables", "Stock disponible"],
    color: "from-brand-600 to-brand-800",
  },
  {
    icon: Headphones,
    title: "Support Technique",
    desc: "Assistance technique personnalisée pour vos appareils. Conseils experts et SAV réactif.",
    points: ["Hotline dédiée", "Réponse rapide", "Suivi personnalisé"],
    color: "from-brand-500 to-brand-900",
  },
];

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300 mb-4"
          >
            Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            {t("services_title")} <span className="gradient-text">Premium</span>
          </motion.h2>
          <p className="mt-4 text-white/60">Une équipe d'experts à votre service pour tous vos besoins technologiques.</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const I = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl p-6 glass overflow-hidden"
              >
                <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${s.color} opacity-20 blur-2xl group-hover:opacity-40 transition`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center mb-5 group-hover:scale-110 transition`}>
                  <I size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
