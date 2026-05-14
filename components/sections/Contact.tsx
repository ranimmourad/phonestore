"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "@/lib/lang";

export default function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-brand-600/15 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300">
            Contact
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t("contact_title")}
          </h2>
          <p className="mt-4 text-white/60">
            Une question, un devis, une réparation ? Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-3"
          >
            {[
              { icon: MapPin, title: "Adresse", value: "Phone Store, El Mourouj 2074, Tunisie", href: "https://maps.app.goo.gl/G59Ro3ZfmUW6DEFN9" },
              { icon: Phone, title: "Téléphone", value: "54 663 209", href: "tel:+21654663209" },
              { icon: Phone, title: "Service Technique", value: "51 884 577", href: "tel:+21651884577" },
              { icon: Mail, title: "Email", value: "phonestoremourouj6@gmail.com", href: "mailto:phonestoremourouj6@gmail.com" },
              { icon: Clock, title: "Horaires", value: "Lun - Sam : 9h00 - 20h00", href: "#" },
            ].map((c) => {
              const I = c.icon;
              return (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 glass rounded-2xl p-4 hover:bg-brand-500/10 transition group"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-500/15 border border-brand-500/30 grid place-items-center text-brand-300 group-hover:scale-110 transition flex-shrink-0">
                    <I size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-white/40">{c.title}</div>
                    <div className="font-semibold text-sm mt-0.5 break-all">{c.value}</div>
                  </div>
                </a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-3xl overflow-hidden glass relative min-h-[460px]"
          >
            <iframe
              title="Phone Store Mourouj 6"
              src="https://www.google.com/maps?q=El+Mourouj+2074,Tunisia&output=embed"
              className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-3xl" />
            <div className="absolute top-4 left-4 glass-strong rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-2">
              <MapPin size={14} className="text-brand-300" /> El Mourouj 2074
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
