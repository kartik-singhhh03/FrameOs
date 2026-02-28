import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductHuntBadge from "@/components/ProductHuntBadge";
import Features from "@/components/Features";
import ForCreators from "@/components/ForCreators";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProductHuntBadge />
      <Features />
      <ForCreators />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
