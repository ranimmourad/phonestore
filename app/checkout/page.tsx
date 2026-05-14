"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, User, Phone, MapPin, MessageSquare, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const clear = useCart((s) => s.clear);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Panier vide");
    if (!form.name || !form.phone || !form.address) return toast.error("Champs obligatoires manquants");
    setSubmitting(true);
    try {
      const r = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
          total,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Erreur");
      setDone(data.order.id);
      clear();
      toast.success("Commande envoyée !");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 grid place-items-center mb-6 ring-4 ring-emerald-500/30"
          >
            <CheckCircle2 size={40} className="text-emerald-400" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold">Commande confirmée !</h1>
          <p className="mt-3 text-white/70">
            Merci pour votre confiance. Votre commande <span className="text-brand-300 font-semibold">{done}</span> a été reçue.
          </p>
          <p className="mt-2 text-sm text-white/60">
            Notre équipe vous contactera très bientôt au numéro fourni.
          </p>
          <div className="mt-8 flex gap-3 justify-center">
            <Link href="/products" className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold">
              Continuer mes achats
            </Link>
            <Link href="/" className="px-6 py-3 rounded-xl glass font-semibold">
              Accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">
          <span className="gradient-text">Commande</span>
        </h1>

        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-4 glass-strong rounded-2xl p-6">
            <h2 className="font-semibold text-lg">Informations de livraison</h2>

            {[
              { name: "name", label: "Nom complet *", icon: User, placeholder: "Jean Dupont" },
              { name: "phone", label: "Téléphone *", icon: Phone, placeholder: "+216 XX XXX XXX", type: "tel" },
              { name: "address", label: "Adresse de livraison *", icon: MapPin, placeholder: "Adresse complète" },
            ].map((f) => {
              const I = f.icon;
              return (
                <div key={f.name}>
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-1.5 block">{f.label}</label>
                  <div className="relative">
                    <I size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" />
                    <input
                      type={f.type || "text"}
                      required
                      value={(form as any)[f.name]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 text-sm"
                    />
                  </div>
                </div>
              );
            })}

            <div>
              <label className="text-xs uppercase tracking-widest text-white/50 mb-1.5 block">Note (optionnel)</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-4 top-3.5 text-brand-300" />
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Informations supplémentaires..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-700/60 border border-white/10 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 text-sm resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 font-semibold transition disabled:opacity-60"
            >
              {submitting ? <><Loader2 size={16} className="animate-spin" /> Envoi...</> : "Confirmer la commande"}
            </button>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="glass-strong rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg mb-4">Votre commande</h3>
              <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between text-sm">
                    <span className="text-white/70 line-clamp-1 pr-2">{it.name} × {it.qty}</span>
                    <span className="font-semibold whitespace-nowrap">{(it.price * it.qty).toFixed(2)} TND</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 my-4" />
              <div className="flex justify-between items-end">
                <span className="text-sm text-white/70">Total</span>
                <span className="font-display text-2xl font-bold gradient-text">{total.toFixed(2)} TND</span>
              </div>
              <p className="mt-4 text-xs text-white/50">
                Paiement à la livraison. Vous serez contacté par notre équipe pour confirmer votre commande.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
