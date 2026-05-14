"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Globe } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLang, Lang } from "@/lib/lang";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const count = useCart((s) => s.count());
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t("nav_home") },
    { href: "/products", label: t("nav_products") },
    { href: "/services", label: t("nav_services") },
    { href: "/#gallery", label: t("nav_about") },
    { href: "/#contact", label: t("nav_contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2 bg-ink-900/80 border-b border-white/5" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden ring-1 ring-brand-500/40 group-hover:ring-brand-400 transition ">
            <Image src="/logo.png" alt="Phone Store Mourouj 6" fill sizes="44px" className="object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold tracking-tight text-white text-[15px]">Phone Store</div>
            <div className="text-[10px] uppercase tracking-[.25em] text-brand-300">Mourouj 6</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition group"
            >
              {l.label}
              <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg glass text-xs font-semibold uppercase tracking-wider hover:"
            >
              <Globe size={14} /> {lang}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 mt-2 w-32 glass-strong rounded-xl overflow-hidden"
                >
                  {(["fr", "ar", "en"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-500/20 ${lang === l ? "text-brand-300" : "text-white/80"}`}
                    >
                      {l === "fr" ? "Français" : l === "ar" ? "العربية" : "English"}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/products" className="hidden md:inline-flex p-2 rounded-lg glass hover:">
            <Search size={18} />
          </Link>

          <Link href="/cart" className="relative p-2 rounded-lg glass hover:">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-brand-500 text-[10px] font-bold flex items-center justify-center [0_0_10px_rgba(11,103,255,.8)]">
                {count}
              </span>
            )}
          </Link>

          <button
            className="lg:hidden p-2 rounded-lg glass hover:"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-ink-900/95 border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg hover: text-sm"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-2 px-2">
                {(["fr", "ar", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase ${lang === l ? "bg-brand-500 text-white" : "glass"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
