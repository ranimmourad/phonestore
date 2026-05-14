"use client";
import { useState, useMemo, Suspense } from "react";
import { products, categories, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import { Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const sp = useSearchParams();
  const initialCat = sp.get("category") || "all";
  const [cat, setCat] = useState<string>(initialCat);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"popular" | "asc" | "desc">("popular");
  const [qv, setQv] = useState<Product | null>(null);
  const [mobileFilter, setMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    let res = [...products];
    if (cat !== "all") res = res.filter((p) => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      res = res.filter(
        (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
      );
    }
    if (sort === "asc") res.sort((a, b) => a.price - b.price);
    if (sort === "desc") res.sort((a, b) => b.price - a.price);
    if (sort === "popular") res.sort((a, b) => b.rating - a.rating);
    return res;
  }, [cat, q, sort]);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300">
            Boutique
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold">
            Tous nos <span className="gradient-text">Produits</span>
          </h1>
          <p className="mt-3 text-white/60">{filtered.length} produits disponibles</p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 text-sm"
          />
        </div>

        <div className="lg:grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block">
            <div className="glass rounded-2xl p-5 sticky top-24">
              <div className="text-xs uppercase tracking-widest text-brand-300 mb-3">Catégories</div>
              <div className="space-y-1">
                <button
                  onClick={() => setCat("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    cat === "all" ? "bg-brand-500 text-white" : "hover text-white/70"
                  }`}
                >
                  Toutes les catégories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      cat === c.id ? "bg-brand-500 text-white" : "hover: text-white/70"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="text-xs uppercase tracking-widest text-brand-300 mt-6 mb-3">Trier par</div>
              <div className="space-y-1">
                {[
                  { v: "popular", l: "Populaire" },
                  { v: "asc", l: "Prix croissant" },
                  { v: "desc", l: "Prix décroissant" },
                ].map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setSort(o.v as any)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      sort === o.v ? "bg-brand-500 text-white" : "hover: text-white/70"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFilter(true)}
            className="lg:hidden mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-semibold"
          >
            <Filter size={16} /> Filtres
          </button>

          {/* Mobile filter overlay */}
          {mobileFilter && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/70 p-4" onClick={() => setMobileFilter(false)}>
              <div className="glass-strong rounded-2xl p-5 mt-20" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filtres</h3>
                  <button onClick={() => setMobileFilter(false)}><X size={18} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => { setCat("all"); setMobileFilter(false); }} className={`px-3 py-1.5 rounded-full text-xs ${cat==="all"?"bg-brand-500":"glass"}`}>Tout</button>
                  {categories.map((c) => (
                    <button key={c.id} onClick={() => { setCat(c.id); setMobileFilter(false); }} className={`px-3 py-1.5 rounded-full text-xs ${cat===c.id?"bg-brand-500":"glass"}`}>{c.name}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-white/50">Aucun produit trouvé.</div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQv} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <QuickView product={qv} onClose={() => setQv(null)} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-white/50">Chargement...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
