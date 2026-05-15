import Footer from "@/components/Footer";
import GTS from "@/components/GTS";
import Header from "@/components/Header";
import HomeCTA from "@/components/Home/CTA";
import HomeHero from "@/components/Home/Hero";
import HomeLands from "@/components/Home/Lands";
import HomeProperties from "@/components/Home/Properties";
import HomeRentals from "@/components/Home/Rentals";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <HomeHero />
      <HomeRentals />
      <HomeProperties />
      <HomeLands />
      <HomeCTA />
      <Footer />
      <GTS />
      <WhatsAppButton />
    </>
  );
}
