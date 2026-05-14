import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Toaster } from "react-hot-toast";
import { LangProvider } from "@/lib/lang";

export const metadata: Metadata = {
  title: "Phone Store Mourouj 6 — Accessoires & Réparation Premium",
  description:
    "Phone Store Mourouj 6 — Réparation téléphones & PC, accessoires premium, service technique rapide à El Mourouj 2074. Boutique tech de confiance en Tunisie.",
  keywords:
    "Phone Store, Mourouj 6, réparation téléphone, réparation PC, accessoires, chargeurs, écouteurs, smartwatch, Tunisie, El Mourouj",
  openGraph: {
    title: "Phone Store Mourouj 6",
    description:
      "Accessoires Tech & Réparation Premium — Phone Store Mourouj 6",
    images: ["/logo.png"],
  },
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-ink-900 text-white antialiased overflow-x-hidden">
        <LangProvider>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <FloatingActions />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(10,14,26,0.95)",
                color: "#fff",
                border: "1px solid rgba(11,103,255,0.4)",
                backdropFilter: "blur(12px)",
              },
            }}
          />
        </LangProvider>
      </body>
    </html>
  );
}
