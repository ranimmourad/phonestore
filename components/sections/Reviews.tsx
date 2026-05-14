"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

const reviews = [
  {
    name: "Ranim Bach",
    text: "Je tiens à vous remercier pour votre excellent service. Votre professionnalisme et votre sérieux donnent vraiment confiance. Merci encore pour votre accueil et votre efficacité !",
    rating: 5,
  },
  {
    name: "Sana El Kadhi",
    text: "Best phone repair shop. Very punctual, serious and helpful staff, and good prices. I highly recommend it.",
    rating: 5,
  },
  {
    name: "Kalil Zouaghia",
    text: "Excellent customer service tfol metrabi w les prix ahsen haja fel zone.",
    rating: 5,
  },
];

export default function Reviews() {
  const { t } = useLang();
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-600/15 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-brand-300">
            Témoignages
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t("reviews_title")} <span className="gradient-text">Réels</span>
          </h2>
          <p className="mt-4 text-white/60">
            La satisfaction de nos clients est notre plus belle récompense.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
          pagination={{ clickable: true }}
          className="!pb-14"
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i} style={{ width: "min(560px, 90%)" }}>
              <motion.div className="glass-strong rounded-3xl p-8 sm:p-10 relative">
                <Quote className="absolute top-6 right-6 text-brand-500/40" size={48} />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/85 leading-relaxed text-lg italic">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 grid place-items-center font-bold text-white">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-brand-300">Client vérifié • Google</div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
