"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const update = useCart((s) => s.update);
  const remove = useCart((s) => s.remove);
  const total = useCart((s) => s.total());
  const clear = useCart((s) => s.clear);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Mon <span className="gradient-text">Panier</span>
          </h1>
          <p className="text-white/60 mt-2">{items.length} article{items.length > 1 ? "s" : ""} dans votre panier</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 glass rounded-3xl">
            <ShoppingBag size={48} className="mx-auto text-brand-300 mb-4" />
            <p className="text-white/60 mb-6">Votre panier est vide.</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold">
              Continuer mes achats <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-6">
            <div className="space-y-3">
              <AnimatePresence>
                {items.map((it) => (
                  <motion.div
                    key={it.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass rounded-2xl p-4 flex gap-4"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-ink-700">
                      <Image src={it.image} alt={it.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-brand-300">{it.category}</div>
                      <div className="font-semibold text-sm mt-0.5 line-clamp-2">{it.name}</div>
                      <div className="mt-2 font-display font-bold gradient-text">{it.price} TND</div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => remove(it.id)} className="text-white/40 hover:text-red-400 transition">
                        <Trash2 size={16} />
                      </button>
                      <div className="flex items-center gap-1 glass rounded-lg p-1">
                        <button onClick={() => update(it.id, it.qty - 1)} className="w-7 h-7 grid place-items-center rounded-md hover:">
                          <Minus size={12} />
                        </button>
                        <div className="w-8 text-center text-sm font-semibold">{it.qty}</div>
                        <button onClick={() => update(it.id, it.qty + 1)} className="w-7 h-7 grid place-items-center rounded-md hover:">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button onClick={clear} className="text-xs text-white/40 hover:text-red-400 transition mt-2">
                Vider le panier
              </button>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <div className="glass-strong rounded-2xl p-6 space-y-4">
                <h3 className="font-display font-semibold text-lg">Récapitulatif</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Sous-total</span>
                    <span>{total.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Livraison</span>
                    <span className="text-emerald-400">À calculer</span>
                  </div>
                  <div className="border-t border-white/10 my-3" />
                  <div className="flex justify-between items-end">
                    <span className="text-sm text-white/70">Total</span>
                    <span className="font-display text-2xl font-bold gradient-text">{total.toFixed(2)} TND</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold transition"
                >
                  Passer commande <ArrowRight size={16} />
                </Link>
                <Link
                  href="/products"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass hover: text-sm font-semibold"
                >
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
