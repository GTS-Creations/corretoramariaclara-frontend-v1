import Image from "next/image";
import image from "@/public/banner.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="w-full bg-white mx-auto">
      <div className="relative w-full shadow-lg transition-shadow rounded-b-md">
        <div className="relative flex items-center justify-center min-h-125 md:h-125 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={image}
              alt="Interior de imóvel luxuoso"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
          </div>

          <div className="relative z-10 px-6 max-w-5xl w-full flex flex-col items-center pt-20 pb-12">
            <div className="text-center space-y-4 mb-10">
              <h1 className="text-4xl md:text-6xl text-shadow-sm font-extralight font-serif text-white leading-tight">
                Encontre o seu imóvel perfeito.
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-serif leading-relaxed italic">
                Buscou, encontrou, se mudou. Sem burocracias.
              </p>
            </div>

            <div className="w-full p-3 md:p-4 bg-white rounded-2xl shadow-2xl border border-slate-100">
              <div className="flex flex-col md:flex-row items-end gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-3">
                      Pretenção
                    </label>
                    <Select>
                      <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-slate-700 font-medium bg-slate-50/80 hover:bg-slate-100 transition-all rounded-xl gap-3 h-12 px-4 cursor-pointer">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-2xl p-2">
                        <SelectItem
                          value="comprar"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Comprar
                        </SelectItem>
                        <SelectItem
                          value="alugar"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Alugar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col space-y-1.5 text-left md:border-l md:border-slate-100 md:pl-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-3">
                      Tipo de Imóvel
                    </label>
                    <Select>
                      <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-slate-700 font-medium bg-slate-50/80 hover:bg-slate-100 transition-all rounded-xl gap-3 h-12 px-4 cursor-pointer">
                        <SelectValue placeholder="O que deseja?" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-2xl p-2">
                        <SelectItem
                          value="casa"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Casa
                        </SelectItem>
                        <SelectItem
                          value="apartamento"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Apartamento
                        </SelectItem>
                        <SelectItem
                          value="terreno"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Terreno
                        </SelectItem>
                        <SelectItem
                          value="kitnet"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Kitnet
                        </SelectItem>
                        <SelectItem
                          value="comercial"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Comercial
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col space-y-1.5 text-left md:border-l md:border-slate-100 md:pl-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-3">
                      Localização
                    </label>
                    <Select>
                      <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-slate-700 font-medium bg-slate-50/80 hover:bg-slate-100 transition-all rounded-xl gap-3 h-12 px-4 cursor-pointer">
                        <SelectValue placeholder="Onde?" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-2xl p-2">
                        <SelectItem
                          value="centro"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Centro
                        </SelectItem>
                        <SelectItem
                          value="jardins"
                          className="rounded-lg focus:bg-red-50 cursor-pointer transition-colors"
                        >
                          Jardins
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full md:w-auto bg-clara-secondary hover:bg-clara-tertiary text-white px-10 h-12 rounded-xl transition-all font-bold cursor-pointer">
                  <Search className="mr-2 h-4 w-4" />
                  BUSCAR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
