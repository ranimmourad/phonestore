"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import toast from "react-hot-toast";

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
}) {
  const add = useCart((s) => s.add);

  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl glass overflow-hidden h-full flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-700">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />

        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-brand-500 text-white shadow-[0_0_20px_rgba(11,103,255,.7)]">
            {product.badge}
          </div>
        )}

        {product.oldPrice && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold bg-red-500/90 text-white">
            -{Math.round(100 - (product.price / product.oldPrice) * 100)}%
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition duration-300">
          <button
            onClick={handleAdd}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-semibold transition"
          >
            <ShoppingBag size={14} /> Ajouter
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="w-10 h-10 grid place-items-center rounded-xl glass-strong hover:bg-white/20 transition"
              aria-label="Quick view"
            >
              <Eye size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-brand-300/80">
          {product.category}
        </div>
        <h3 className="mt-1 font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-xs text-white/60">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span>{product.rating}</span>
          <span className="mx-1">•</span>
          <span className={product.stock > 0 ? "text-emerald-400" : "text-red-400"}>
            {product.stock > 0 ? "En stock" : "Rupture"}
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="font-display font-bold text-lg gradient-text">
              {product.price} <span className="text-xs">TND</span>
            </div>
            {product.oldPrice && (
              <div className="text-xs text-white/40 line-through">
                {product.oldPrice} TND
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
