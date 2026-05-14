"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ShoppingBag, Minus, Plus, Star, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/data/products";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import toast from "react-hot-toast";

export default function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative w-full max-w-4xl rounded-3xl glass-strong overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 grid place-items-center rounded-full glass hover:bg-white/20"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto bg-ink-700">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                <div className="text-[10px] uppercase tracking-widest text-brand-300">
                  {product.category}
                </div>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight">
                  {product.name}
                </h2>

                <div className="mt-3 flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} className="fill-yellow-400" />
                    <span className="text-white/80">{product.rating}</span>
                  </div>
                  <span className="text-white/40">•</span>
                  <span className={product.stock > 0 ? "text-emerald-400" : "text-red-400"}>
                    {product.stock > 0 ? `${product.stock} en stock` : "Rupture"}
                  </span>
                </div>

                <div className="mt-5 flex items-end gap-3">
                  <div className="font-display text-4xl font-bold gradient-text">
                    {product.price} <span className="text-base">TND</span>
                  </div>
                  {product.oldPrice && (
                    <div className="text-white/40 line-through pb-1">{product.oldPrice} TND</div>
                  )}
                </div>

                <p className="mt-5 text-sm text-white/70 leading-relaxed">{product.description}</p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center gap-1 glass rounded-xl p-1">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-9 h-9 grid place-items-center rounded-lg hover:bg-white/10"
                    >
                      <Minus size={14} />
                    </button>
                    <div className="w-10 text-center font-semibold">{qty}</div>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-9 h-9 grid place-items-center rounded-lg hover:bg-white/10"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      add(
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        },
                        qty
                      );
                      toast.success(`${product.name} ajouté (${qty})`);
                      onClose();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold transition"
                  >
                    <ShoppingBag size={16} /> Ajouter au panier
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70">
                  <div className="flex items-center gap-2 glass rounded-xl px-3 py-2.5">
                    <ShieldCheck size={16} className="text-brand-300" />
                    Garantie boutique
                  </div>
                  <div className="flex items-center gap-2 glass rounded-xl px-3 py-2.5">
                    <Truck size={16} className="text-brand-300" />
                    Livraison rapide
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
