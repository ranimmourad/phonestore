"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/lang";

const faqs = [
  {
    q: "Combien de temps prend une réparation ?",
    a: "La majorité des réparations courantes (écran, batterie, connecteur) sont effectuées en moins de 24h. Certaines interventions complexes peuvent prendre 2 à 3 jours.",
  },
  {
    q: "Offrez-vous une garantie sur les réparations ?",
    a: "Oui, toutes nos réparations sont garanties 3 mois sur la pièce remplacée et la main d'œuvre. Les pièces utilisées sont de qualité d'origine ou premium.",
  },
  {
    q: "Acceptez-vous les paiements à la livraison ?",
    a: "Oui, vous pouvez payer en espèces à la livraison ou directement en boutique. Nous acceptons également les virements bancaires.",
  },
  {
    q: "Livrez-vous partout en Tunisie ?",
    a: "Oui, nous livrons dans toute la Tunisie via nos partenaires logistiques. Les délais varient entre 24h et 72h selon votre région.",
  },
  {
    q: "Comment suivre ma commande ?",
    a: "Après confirmation, vous recevrez un appel ou un message de notre équipe avec le suivi détaillé. Vous pouvez aussi nous contacter sur WhatsApp au 54 663 209.",
  },
  {
    q: "Puis-je retourner un produit ?",
    a: "Oui, vous disposez d'un délai de 7 jours pour tout retour d'un produit non utilisé et dans son emballage d'origine.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useLang();

  return (
    <section className="relative py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300">
            FAQ
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t("faq_title")}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  size={18}
                  className={`transition flex-shrink-0 text-brand-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-white/70 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
