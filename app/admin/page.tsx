"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, User, LogOut, Package, ShoppingCart, BarChart3, Plus, Edit3, Trash2, Bell, X, Search,
  TrendingUp, Users, DollarSign, CheckCircle2, Clock, Truck, Loader2,
} from "lucide-react";
import { categories } from "@/data/products";
import toast from "react-hot-toast";

type Order = {
  id: string;
  customer: { name: string; phone: string; address: string; note?: string };
  items: { id: string; name: string; price: number; qty: number }[];
  total: number;
  status: "new" | "confirmed" | "delivered" | "cancelled";
  createdAt: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  rating: number;
  featured?: boolean;
  badge?: string;
};

export default function AdminPage() {
  const [logged, setLogged] = useState<boolean | null>(null);
  const [creds, setCreds] = useState({ user: "", pass: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLogged(typeof document !== "undefined" && document.cookie.includes("psm6_admin=1"));
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (!r.ok) throw new Error("Identifiants invalides");
      toast.success("Connecté !");
      setLogged(true);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/login", { method: "DELETE" });
    setLogged(false);
    toast.success("Déconnecté");
  };

  if (logged === null)
    return <div className="pt-40 text-center text-white/50">Chargement...</div>;

  if (!logged)
    return (
      <div className="pt-32 pb-20 min-h-screen grid place-items-center">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={login}
          className="w-full max-w-md glass-strong rounded-3xl p-8 mx-4"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-500/20 border border-brand-500/40 grid place-items-center mb-4">
              <Lock size={26} className="text-brand-300" />
            </div>
            <h1 className="font-display text-2xl font-bold">Espace Admin</h1>
            <p className="text-white/60 text-sm mt-1">Phone Store Mourouj 6</p>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" />
              <input
                required
                value={creds.user}
                onChange={(e) => setCreds({ ...creds, user: e.target.value })}
                placeholder="Utilisateur"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 text-sm"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" />
              <input
                type="password"
                required
                value={creds.pass}
                onChange={(e) => setCreds({ ...creds, pass: e.target.value })}
                placeholder="Mot de passe"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 text-sm"
              />
            </div>
            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Connexion"}
            </button>
            <p className="text-xs text-center text-white/40 mt-4">
              Par défaut : <span className="text-brand-300">admin / phonestore2074</span>
            </p>
          </div>
        </motion.form>
      </div>
    );

  return <Dashboard onLogout={logout} />;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<"overview" | "orders" | "products">("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [lastSeen, setLastSeen] = useState<string>("");
  const [notif, setNotif] = useState(false);

  const fetchAll = async () => {
    const [o, p] = await Promise.all([
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
    ]);
    const newOrders = o.orders as Order[];
    // notification if new orders since last poll
    if (lastSeen && newOrders[0] && newOrders[0].id !== lastSeen && newOrders[0].status === "new") {
      setNotif(true);
      toast.success("🔔 Nouvelle commande reçue !");
    }
    if (newOrders[0]) setLastSeen(newOrders[0].id);
    setOrders(newOrders);
    setProducts(p.products);
  };

  useEffect(() => {
    fetchAll();
    const i = setInterval(fetchAll, 5000); // live polling every 5s
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSeen]);

  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((a, b) => a + b.total, 0);
  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">
              Dashboard <span className="gradient-text">Admin</span>
            </h1>
            <p className="text-white/60 text-sm mt-1">Phone Store Mourouj 6 · Backoffice</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNotif(false)}
              className="relative p-2.5 rounded-xl glass hover:bg-white/10"
              aria-label="Notifications"
            >
              <Bell size={16} />
              {(newCount > 0 || notif) && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-[10px] font-bold grid place-items-center">
                  {newCount}
                </span>
              )}
            </button>
            <button onClick={onLogout} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-white/10 text-sm">
              <LogOut size={14} /> Déconnexion
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {[
            { k: "overview", l: "Vue d'ensemble", i: BarChart3 },
            { k: "orders", l: `Commandes${newCount ? ` (${newCount})` : ""}`, i: ShoppingCart },
            { k: "products", l: "Produits", i: Package },
          ].map((t) => {
            const I = t.i;
            return (
              <button
                key={t.k}
                onClick={() => setTab(t.k as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                  tab === t.k ? "bg-brand-500 text-white" : "glass text-white/70 hover:bg-white/10"
                }`}
              >
                <I size={15} /> {t.l}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div key="o" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { i: ShoppingCart, l: "Commandes totales", v: orders.length, c: "from-brand-500 to-brand-700" },
                  { i: Clock, l: "Nouvelles", v: newCount, c: "from-yellow-500 to-orange-600" },
                  { i: DollarSign, l: "Revenu (TND)", v: revenue.toFixed(0), c: "from-emerald-500 to-emerald-700" },
                  { i: Package, l: "Produits", v: products.length, c: "from-purple-500 to-purple-700" },
                ].map((s) => {
                  const I = s.i;
                  return (
                    <div key={s.l} className="glass rounded-2xl p-5">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.c} grid place-items-center mb-3`}>
                        <I size={18} />
                      </div>
                      <div className="text-2xl font-display font-bold">{s.v}</div>
                      <div className="text-xs text-white/60 mt-1">{s.l}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 glass rounded-2xl p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-brand-300" /> Dernières commandes</h3>
                <div className="space-y-2">
                  {orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex items-center justify-between glass rounded-xl px-4 py-3 text-sm">
                      <div>
                        <div className="font-semibold">{o.customer.name}</div>
                        <div className="text-xs text-white/50">{o.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{o.total.toFixed(2)} TND</div>
                        <StatusBadge s={o.status} />
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <div className="text-center text-white/40 py-8 text-sm">Aucune commande pour le moment.</div>}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "orders" && (
            <motion.div key="orders" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <OrdersPanel orders={orders} refresh={fetchAll} />
            </motion.div>
          )}

          {tab === "products" && (
            <motion.div key="products" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ProductsPanel products={products} refresh={fetchAll} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatusBadge({ s }: { s: Order["status"] }) {
  const map: Record<Order["status"], { l: string; c: string }> = {
    new: { l: "Nouvelle", c: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
    confirmed: { l: "Confirmée", c: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    delivered: { l: "Livrée", c: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    cancelled: { l: "Annulée", c: "bg-red-500/20 text-red-300 border-red-500/30" },
  };
  return <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${map[s].c}`}>{map[s].l}</span>;
}

function OrdersPanel({ orders, refresh }: { orders: Order[]; refresh: () => void }) {
  const [filter, setFilter] = useState<Order["status"] | "all">("all");
  const list = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const update = async (id: string, status: Order["status"]) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    toast.success("Statut mis à jour");
    refresh();
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer la commande ?")) return;
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    toast.success("Supprimée");
    refresh();
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {(["all", "new", "confirmed", "delivered", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              filter === s ? "bg-brand-500" : "glass hover:bg-white/10"
            }`}
          >
            {s === "all" ? "Toutes" : s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.length === 0 && <div className="text-center text-white/40 py-12 glass rounded-2xl">Aucune commande.</div>}
        {list.map((o) => (
          <motion.div key={o.id} layout className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold">{o.customer.name}</span>
                  <StatusBadge s={o.status} />
                </div>
                <div className="text-xs text-white/50 mt-1">{o.id} · {new Date(o.createdAt).toLocaleString("fr-FR")}</div>
                <div className="text-sm text-white/70 mt-2">📞 {o.customer.phone}</div>
                <div className="text-sm text-white/70">📍 {o.customer.address}</div>
                {o.customer.note && <div className="text-xs text-white/50 mt-1 italic">"{o.customer.note}"</div>}
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-bold gradient-text">{o.total.toFixed(2)} TND</div>
                <div className="text-xs text-white/50">{o.items.length} article(s)</div>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-2 text-xs">
              {o.items.map((it) => (
                <div key={it.id} className="flex justify-between glass rounded-lg px-3 py-1.5">
                  <span className="truncate pr-2">{it.name} × {it.qty}</span>
                  <span className="font-semibold whitespace-nowrap">{(it.price * it.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {o.status !== "confirmed" && o.status !== "delivered" && (
                <button onClick={() => update(o.id, "confirmed")} className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30">
                  <CheckCircle2 size={12} className="inline mr-1" /> Confirmer
                </button>
              )}
              {o.status !== "delivered" && (
                <button onClick={() => update(o.id, "delivered")} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30">
                  <Truck size={12} className="inline mr-1" /> Livrée
                </button>
              )}
              {o.status !== "cancelled" && (
                <button onClick={() => update(o.id, "cancelled")} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30">
                  Annuler
                </button>
              )}
              <button onClick={() => del(o.id)} className="text-xs px-3 py-1.5 rounded-lg glass hover:bg-white/10 ml-auto">
                <Trash2 size={12} className="inline mr-1" /> Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProductsPanel({ products, refresh }: { products: Product[]; refresh: () => void }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const del = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    toast.success("Supprimé");
    refresh();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500 text-sm"
          />
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-sm font-semibold"
        >
          <Plus size={15} /> Nouveau produit
        </button>
      </div>

      <div className="overflow-x-auto glass rounded-2xl">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="text-left text-xs uppercase tracking-widest text-white/50">
            <tr>
              <th className="p-3">Produit</th>
              <th className="p-3">Catégorie</th>
              <th className="p-3">Prix</th>
              <th className="p-3">Stock</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold line-clamp-1">{p.name}</div>
                      <div className="text-[10px] text-white/40">{p.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-white/70">{p.category}</td>
                <td className="p-3 font-semibold">{p.price} TND</td>
                <td className="p-3">
                  <span className={p.stock > 0 ? "text-emerald-300" : "text-red-300"}>{p.stock}</span>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(p)} className="p-2 rounded-lg hover:bg-white/10 mr-1">
                    <Edit3 size={14} className="text-brand-300" />
                  </button>
                  <button onClick={() => del(p.id)} className="p-2 rounded-lg hover:bg-white/10">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {(editing || creating) && (
          <ProductForm
            product={editing}
            onClose={() => { setEditing(null); setCreating(false); }}
            onSaved={() => { setEditing(null); setCreating(false); refresh(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductForm({
  product, onClose, onSaved,
}: {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(
    product ?? { name: "", price: 0, category: categories[0].id, stock: 0, image: "", description: "" }
  );
  const [loading, setLoading] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = product ? "PATCH" : "POST";
      const r = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error("Erreur");
      toast.success(product ? "Mis à jour" : "Créé");
      onSaved();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result as string });
    reader.readAsDataURL(f);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.form
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={save}
        className="w-full max-w-lg glass-strong rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold">{product ? "Modifier" : "Nouveau"} produit</h3>
          <button type="button" onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X size={16} /></button>
        </div>

        <div className="space-y-3 text-sm">
          <input required value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom du produit" className="w-full px-4 py-2.5 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" required value={form.price ?? 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Prix (TND)" className="px-4 py-2.5 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500" />
            <input type="number" value={form.stock ?? 0} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} placeholder="Stock" className="px-4 py-2.5 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500" />
          </div>
          <input value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="URL de l'image" className="w-full px-4 py-2.5 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500" />
          <div>
            <label className="text-xs text-white/50">Ou téléverser une image</label>
            <input type="file" accept="image/*" onChange={onImage} className="block mt-1 text-xs file:mr-2 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-brand-500 file:text-white" />
          </div>
          {form.image && <img src={form.image} alt="" className="w-full h-32 object-cover rounded-xl" />}
          <textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full px-4 py-2.5 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500 resize-none" />
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Produit vedette
          </label>
        </div>

        <button disabled={loading} className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : product ? "Enregistrer" : "Créer"}
        </button>
      </motion.form>
    </motion.div>
  );
}
