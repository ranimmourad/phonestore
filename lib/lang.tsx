"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "ar" | "en";

type Dict = Record<string, { fr: string; ar: string; en: string }>;

export const dict: Dict = {
  nav_home: { fr: "Accueil", ar: "الرئيسية", en: "Home" },
  nav_products: { fr: "Produits", ar: "المنتجات", en: "Products" },
  nav_services: { fr: "Services", ar: "الخدمات", en: "Services" },
  nav_about: { fr: "À propos", ar: "من نحن", en: "About" },
  nav_contact: { fr: "Contact", ar: "اتصل بنا", en: "Contact" },
  nav_cart: { fr: "Panier", ar: "السلة", en: "Cart" },
  hero_badge: { fr: "Boutique Tech Premium • El Mourouj 2074", ar: "متجر التقنية الفاخر • المروج 2074", en: "Premium Tech Store • El Mourouj 2074" },
  hero_title_1: { fr: "Réparation & Accessoires", ar: "صيانة وملحقات", en: "Repair & Accessories" },
  hero_title_2: { fr: "Nouvelle Génération", ar: "الجيل الجديد", en: "Next Generation" },
  hero_subtitle: {
    fr: "Phone Store Mourouj 6 — votre boutique de confiance pour la réparation de téléphones, ordinateurs et accessoires premium en Tunisie.",
    ar: "فون ستور المروج 6 — متجرك الموثوق لصيانة الهواتف والحواسيب وأرقى الملحقات في تونس.",
    en: "Phone Store Mourouj 6 — your trusted shop for phone & computer repair and premium accessories in Tunisia.",
  },
  cta_shop: { fr: "Voir les produits", ar: "تسوق الآن", en: "Shop now" },
  cta_repair: { fr: "Demander une réparation", ar: "اطلب الإصلاح", en: "Request repair" },
  services_title: { fr: "Nos Services", ar: "خدماتنا", en: "Our Services" },
  why_title: { fr: "Pourquoi nous choisir", ar: "لماذا تختارنا", en: "Why choose us" },
  reviews_title: { fr: "Avis Clients", ar: "آراء العملاء", en: "Customer Reviews" },
  categories_title: { fr: "Catégories", ar: "الفئات", en: "Categories" },
  featured_title: { fr: "Produits Vedettes", ar: "منتجات مميزة", en: "Featured Products" },
  gallery_title: { fr: "Notre Boutique", ar: "متجرنا", en: "Our Store" },
  faq_title: { fr: "Questions Fréquentes", ar: "الأسئلة الشائعة", en: "FAQ" },
  contact_title: { fr: "Contactez-nous", ar: "اتصل بنا", en: "Get in touch" },
  add_to_cart: { fr: "Ajouter au panier", ar: "أضف إلى السلة", en: "Add to cart" },
  quick_view: { fr: "Aperçu rapide", ar: "عرض سريع", en: "Quick view" },
  in_stock: { fr: "En stock", ar: "متوفر", en: "In stock" },
  out_stock: { fr: "Rupture", ar: "نفذ", en: "Out of stock" },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string }>({
  lang: "fr",
  setLang: () => {},
  t: (k) => dict[k]?.fr ?? String(k),
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem("psm6_lang") as Lang)) || "fr";
    setLangState(stored);
    document.documentElement.lang = stored;
    document.documentElement.dir = stored === "ar" ? "rtl" : "ltr";
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("psm6_lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };
  const t = (k: keyof typeof dict) => dict[k]?.[lang] ?? String(k);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
