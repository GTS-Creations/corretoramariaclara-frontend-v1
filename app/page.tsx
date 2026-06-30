import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GTS from "@/components/GTS";
import Header from "@/components/Header";
import HomeCTA from "@/components/Home/CTA";
import HomeHero from "@/components/Home/Hero";
import HomeLands from "@/components/Home/Lands";
import HomeProperties from "@/components/Home/Sales";
import HomeRentals from "@/components/Home/Rentals";
import WhatsAppButton from "@/components/WhatsAppButton";
import HomeConstruction from "@/components/Home/Construction";

export const metadata: Metadata = {
  title: "Corretora de Imóveis em Arcoverde PE | Maria Clara",
  description:
    "Encontre os melhores imóveis em Arcoverde e região com Maria Clara. Consultoria imobiliária para compra, venda e aluguel.",
  alternates: {
    canonical: "https://www.corretoramariaclara.com.br",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeHero />
        <HomeRentals />
        <HomeProperties />
        <HomeConstruction />
        <HomeLands />
        <HomeCTA />
      </main>
      <Footer />
      <GTS />
      <WhatsAppButton />
    </>
  );
}
