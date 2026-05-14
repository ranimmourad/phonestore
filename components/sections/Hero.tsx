"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, Sparkles } from "lucide-react";
import { useLang } from "@/lib/lang";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-brand-600/30 blur-[120px]" />
      <div className="absolute bottom-10 -right-24 w-[360px] h-[360px] rounded-full bg-brand-500/30 blur-[120px]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-ink-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] sm:text-xs font-medium tracking-wide text-brand-200"
          >
            <Sparkles size={14} className="text-brand-300" />
            {t("hero_badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            <span className="block text-white">{t("hero_title_1")}</span>
            <span className="block gradient-text">{t("hero_title_2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed"
          >
            {t("hero_subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/products"
              className="btn-glow group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold text-white transition"
            >
              {t("cta_shop")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass hover: font-semibold transition"
            >
              <Wrench size={18} className="text-brand-300" />
              {t("cta_repair")}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg"
          >
            {[
              { v: "5K+", l: "Clients" },
              { v: "10K+", l: "Réparations" },
              { v: "4.9★", l: "Avis Google" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-white/50 mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative h-[460px] sm:h-[560px] lg:h-[600px]"
        >
          {/* Rotating ring */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="w-[420px] h-[420px] rounded-full border border-brand-500/30 animate-spin-slow" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-brand-500/20" />
            <div className="absolute w-[220px] h-[220px] rounded-full bg-brand-500/10 blur-2xl" />
          </div>

          {/* Center logo (No more floating animation) */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-[2.5rem] overflow-hidden ring-2 ring-brand-500/40">
              <Image src="/logo.png" alt="Logo" fill priority className="object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}