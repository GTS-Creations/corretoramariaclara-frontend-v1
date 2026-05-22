import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="py-12 text-white bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 xl:px-0">
        <div className="relative bg-clara-quaternary rounded-md p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-clara-secondary shrink-0">
            <Image
              src="/cta.png"
              alt="Corretora de imóveis"
              className="object-center p-2 bg-white w-full h-full object-contain"
              width={100}
              height={100}
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-xl lg:text-2xl font-bold mb-2">
              Não encontrou o que procura?
            </h3>
            <p className="text-sm lg:text-base">
              Conte pra mim o que você precisa que eu te ajudo a encontrar o
              imóvel ideal!
            </p>
          </div>

          <Link
            href="https://wa.me/5587999380401?text=Olá! Preciso de ajuda para encontrar um imóvel."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-clara-secondary text-white hover:bg-clara-tertiary rounded-full px-8 py-6 font-medium shrink-0 cursor-pointer">
              Fale com a corretora
              <MessagesSquare className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
