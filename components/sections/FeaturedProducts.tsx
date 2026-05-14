"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);
  const [qv, setQv] = useState<Product | null>(null);
  const { t } = useLang();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-600/15 blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300"
          >
            Best Sellers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            {t("featured_title")} <span className="gradient-text">Vedettes</span>
          </motion.h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Découvrez notre sélection de produits les plus populaires, choisis pour leur qualité et leur design.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          autoplay={{ delay: 3800, disableOnInteraction: false }}
          loop
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="!pb-12"
        >
          {featured.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} onQuickView={setQv} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <QuickView product={qv} onClose={() => setQv(null)} />
    </section>
  );
}
