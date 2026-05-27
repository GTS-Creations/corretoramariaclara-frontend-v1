import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TfiFaceSad } from "react-icons/tfi";

export default function NotFound() {
  return (
    <>
      <>
        <Header />
      </>
      <section className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center text-center">
          <TfiFaceSad size={120} className="text-clara-secondary" />

          <h3 className="text-4xl font-bold tracking-tight mb-2 text-clara-secondary">
            404
          </h3>

          <h4 className="text-xl font-semibold tracking-wider mb-2 text-clara-secondary">
            Página não encontrada
          </h4>

          <p className="mb-8 text-clara-tertiary">
            Ops! O link que você seguiu pode estar quebrado ou a página pode ter
            sido removida.
          </p>

          <Link href="/">
            <Button className="px-8 py-6 text-lg transition-colors bg-clara-secondary hover:bg-clara-tertiary cursor-pointer">
              Voltar para o início
            </Button>
          </Link>
        </div>
      </section>
      <>
        <Footer />
      </>
    </>
  );
}
