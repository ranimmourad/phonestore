"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full glass-strong hover:bg-brand-500 grid place-items-center transition"
            aria-label="Up"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="tel:+21654663209"
        className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-400 grid place-items-center "
        aria-label="Call"
      >
        <Phone size={18} />
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="https://wa.me/21654663209?text=Bonjour%20Phone%20Store%20Mourouj%206%2C%20je%20souhaite%20avoir%20plus%20d%27informations."
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full grid place-items-center  bg-[#25D366] hover:bg-[#1ebd5a]"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle size={22} className="relative z-10" />
      </motion.a>
    </div>
  );
}
