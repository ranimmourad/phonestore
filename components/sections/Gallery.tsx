"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/lib/lang";

const shots = [
  "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1581993192873-bf5e9d5a8e2a?auto=format&fit=crop&w=900&q=80",
];

export default function Gallery() {
  const { t } = useLang();
  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300">
            Galerie
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t("gallery_title")} <span className="gradient-text">en images</span>
          </h2>
          <p className="mt-4 text-white/60">Découvrez l'univers Phone Store Mourouj 6.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {shots.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden group ${
                i % 5 === 0 ? "row-span-2 aspect-[3/5] sm:aspect-[3/5]" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={`Boutique ${i + 1}`}
                fill
                sizes="(max-width:768px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                Phone Store Mourouj 6
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
