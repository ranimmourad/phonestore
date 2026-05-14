"use client";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.6 6.3a4.9 4.9 0 0 1-3.4-1.4 4.9 4.9 0 0 1-1.4-3.4h-3.5v13.5a2.7 2.7 0 1 1-2.7-2.7c.27 0 .53.04.78.12V8.84a6.1 6.1 0 0 0-.78-.05 6.16 6.16 0 1 0 6.16 6.16V9.1a8.3 8.3 0 0 0 4.8 1.55V6.3Z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8 grid lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Phone Store Mourouj 6" width={56} height={56} className="rounded-xl ring-1 ring-brand-500/40" />
            <div>
              <div className="font-display font-bold text-lg">Phone Store</div>
              <div className="text-xs text-brand-300 tracking-widest uppercase">Mourouj 6</div>
            </div>
          </Link>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            Votre boutique tech de confiance à El Mourouj. Réparation rapide, accessoires premium et service client exceptionnel.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[
              { href: "https://www.facebook.com/phonestoremourouj/", icon: <Facebook size={18} />, label: "Facebook" },
              { href: "https://www.instagram.com/phone_store_mourouj6", icon: <Instagram size={18} />, label: "Instagram" },
              { href: "https://www.tiktok.com/@phone_store_mourouj_6", icon: <TikTokIcon />, label: "TikTok" },
            ].map((s) => (
              <motion.a
                whileHover={{ y: -3 }}
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 grid place-items-center rounded-xl glass hover:bg-brand-500/30 hover:text-white border border-white/10 transition"
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Boutique</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/products" className="hover:text-brand-300">Tous les produits</Link></li>
            <li><Link href="/products?category=chargers" className="hover:text-brand-300">Chargeurs</Link></li>
            <li><Link href="/products?category=cases" className="hover:text-brand-300">Coques</Link></li>
            <li><Link href="/products?category=smartwatches" className="hover:text-brand-300">Smartwatches</Link></li>
            <li><Link href="/products?category=gaming" className="hover:text-brand-300">Gaming</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/services" className="hover:text-brand-300">Réparation téléphone</Link></li>
            <li><Link href="/services" className="hover:text-brand-300">Réparation PC</Link></li>
            <li><Link href="/services" className="hover:text-brand-300">Support technique</Link></li>
            <li><Link href="/cart" className="hover:text-brand-300">Panier</Link></li>
            <li><Link href="/admin" className="hover:text-brand-300">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><MapPin size={16} className="text-brand-400 mt-0.5 flex-shrink-0" /><span>Phone Store, El Mourouj 2074, Tunisie</span></li>
            <li className="flex gap-3"><Phone size={16} className="text-brand-400 mt-0.5 flex-shrink-0" /><a href="tel:+21654663209" className="hover:text-brand-300">54 663 209</a></li>
            <li className="flex gap-3"><Phone size={16} className="text-brand-400 mt-0.5 flex-shrink-0" /><a href="tel:+21651884577" className="hover:text-brand-300">51 884 577 (SAV)</a></li>
            <li className="flex gap-3"><Mail size={16} className="text-brand-400 mt-0.5 flex-shrink-0" /><a href="mailto:phonestoremourouj6@gmail.com" className="hover:text-brand-300 break-all">phonestoremourouj6@gmail.com</a></li>
          </ul>

          <form className="mt-5 relative" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Newsletter — votre email"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-ink-700/60 border border-white/10 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 grid place-items-center rounded-lg bg-brand-500 hover:bg-brand-400 transition" aria-label="Subscribe">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Phone Store Mourouj 6. Tous droits réservés.</p>
          <p>Conçu avec passion en Tunisie 🇹🇳</p>
        </div>
      </div>
    </footer>
  );
}
