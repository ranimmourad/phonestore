"use client";
import { motion } from "framer-motion";
import { Smartphone, Laptop, Headphones, ShoppingBag, Wrench, ShieldCheck, Battery, Wifi, HardDrive, Cpu } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Smartphone,
    title: "Réparation Téléphone",
    items: ["Écran cassé / fissuré", "Batterie usée", "Connecteur de charge", "Caméra / haut-parleur", "Déblocage iCloud / FRP", "Remplacement vitre arrière"],
    price: "À partir de 25 TND",
  },
  {
    icon: Laptop,
    title: "Réparation Ordinateur",
    items: ["Diagnostic complet", "Remplacement clavier / écran", "Changement batterie", "Mise à niveau RAM / SSD", "Nettoyage interne + pâte thermique", "Installation Windows / macOS"],
    price: "À partir de 35 TND",
  },
  {
    icon: HardDrive,
    title: "Récupération de Données",
    items: ["Disque dur défaillant", "SSD / Carte SD", "Téléphones cassés", "Sauvegarde sécurisée", "Récupération photos / vidéos", "Migration de données"],
    price: "Devis gratuit",
  },
  {
    icon: Cpu,
    title: "Maintenance & Optimisation",
    items: ["Suppression virus / malware", "Optimisation Windows", "Mise à jour drivers", "Nettoyage logiciel", "Configuration réseau", "Sauvegarde système"],
    price: "À partir de 30 TND",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300">
            Services Pro
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
            Nos <span className="gradient-text">Services</span>
          </h1>
          <p className="mt-4 text-white/60">
            Une expertise reconnue pour la réparation, l'entretien et le conseil sur tous vos appareils.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, i) => {
            const I = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden group"
              >
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-brand-600/20 blur-[80px] group-hover:bg-brand-500/40 transition" />
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 grid place-items-center shadow-[0_10px_30px_-10px_rgba(11,103,255,.6)]">
                      <I size={24} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-xl">{s.title}</h2>
                      <div className="text-xs text-brand-300 mt-0.5">{s.price}</div>
                    </div>
                  </div>

                  <ul className="mt-6 grid sm:grid-cols-2 gap-2">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-white/75">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                        {it}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://wa.me/21651884577?text=Bonjour%2C%20je%20souhaite%20demander%20une%20r%C3%A9paration."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-sm font-semibold transition"
                  >
                    <Wrench size={14} /> Demander un devis
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl glass-strong p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand-600/30 blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-400/30 blur-[120px]" />
          <div className="relative">
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Service Technique <span className="gradient-text">51 884 577</span>
            </h3>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">
              Notre équipe technique est joignable directement pour toute urgence ou demande spécifique.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a href="tel:+21651884577" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold">
                Appeler maintenant
              </a>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 font-semibold">
                Voir les produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
