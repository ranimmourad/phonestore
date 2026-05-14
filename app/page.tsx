import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyUs from "@/components/sections/WhyUs";
import Counters from "@/components/sections/Counters";
import Reviews from "@/components/sections/Reviews";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Categories />
      <FeaturedProducts />
      <WhyUs />
      <Counters />
      <Reviews />
      <Gallery />
      <FAQ />
      <Contact />
    </>
  );
}
