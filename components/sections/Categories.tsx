"use client";
import { motion } from "framer-motion"; 
import Link from "next/link";
import * as Icons from "lucide-react";
import { categories } from "@/data/products";
import { useLang } from "@/lib/lang";

export default function Categories() {
  const { t } = useLang();
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand-300">Boutique</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t("categories_title")} <span className="gradient-text">Produits</span>
            </h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-brand-300 hover:text-brand-200 inline-flex items-center gap-1">
            Voir tout <Icons.ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((c, i) => {
            const I = (Icons as any)[c.icon] ?? Icons.Box;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={`/products?category=${c.id}`}
                  className="group relative block rounded-2xl glass p-5 overflow-hidden hover:bg-brand-500/10 transition"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-brand-500/20 via-transparent to-transparent" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-brand-500/15 border border-brand-500/30 grid place-items-center text-brand-300 group-hover:scale-110 transition">
                      <I size={20} />
                    </div>
                    <div className="mt-4 font-medium text-sm">{c.name}</div>
                    <div className="text-[11px] text-white/40 mt-1">Voir la collection →</div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
