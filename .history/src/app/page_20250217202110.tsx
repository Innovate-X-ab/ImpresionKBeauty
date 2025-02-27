// src/app/page.tsx
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import FeaturedProducts from "@/components/layout/FeaturedProducts";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts />
    </main>
  );
}