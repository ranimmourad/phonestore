"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { useLang } from "@/lib/lang";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-brand-600/30 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-10 -right-24 w-[360px] h-[360px] rounded-full bg-brand-500/30 blur-[120px] animate-float" />
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
              className="btn-glow group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold text-white transition shadow-[0_10px_40px_-10px_rgba(11,103,255,.8)]"
            >
              {t("cta_shop")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass hover:bg-white/10 font-semibold transition"
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

          {/* Center logo */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 grid place-items-center"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-[2.5rem] overflow-hidden ring-2 ring-brand-500/40 shadow-[0_0_80px_rgba(11,103,255,.45)] glass">
              <Image src="/logo.png" alt="Logo" fill priority className="object-cover" />
            </div>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-6 left-0 sm:left-6 glass-strong rounded-2xl p-3 sm:p-4 flex items-center gap-3 animate-float"
          >
            <div className="w-10 h-10 grid place-items-center rounded-xl bg-brand-500/30 text-brand-300">
              <Zap size={18} />
            </div>
            <div>
              <div className="text-xs text-white/60">Service rapide</div>
              <div className="font-semibold text-sm">24h chrono</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
            className="absolute top-1/2 right-0 sm:right-2 glass-strong rounded-2xl p-3 sm:p-4 flex items-center gap-3 animate-float-slow"
          >
            <div className="w-10 h-10 grid place-items-center rounded-xl bg-brand-500/30 text-brand-300">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-xs text-white/60">Garantie</div>
              <div className="font-semibold text-sm">Pièces d'origine</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-4 left-4 sm:left-10 glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 animate-float"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full ring-2 ring-ink-900 bg-gradient-to-br from-brand-400 to-brand-700" />
              ))}
            </div>
            <div>
              <div className="text-xs text-white/60">+5000 clients</div>
              <div className="font-semibold text-sm">satisfaits</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
