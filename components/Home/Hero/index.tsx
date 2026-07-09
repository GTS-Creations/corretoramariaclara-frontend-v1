"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useFindAllLocations } from "@/hooks/usePropertyQuery";

export default function HomeHero() {
  const router = useRouter();

  const [purpose, setPurpose] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const { data: locations, isLoading } = useFindAllLocations();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (purpose) params.set("purpose", purpose);
    if (type) params.set("type", type);
    if (location) params.set("location", location);

    router.push(`/buscar?${params.toString()}`);
  };

  return (
    <section className="w-full bg-white mx-auto">
      <div className="relative w-full shadow-lg transition-shadow rounded-b-md">
        <div className="relative flex items-center justify-center min-h-125 md:h-125 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/banner-mobile.png"
              alt="Banner Mobile"
              fill
              className="object-cover md:hidden"
            />

            <div className="flex md:hidden absolute inset-0 items-center justify-center -translate-y-48 -translate-x-20 z-10">
              <Image
                src="/logo-banner.png"
                alt="Logo Maria Clara Mobile"
                width={150}
                height={150}
                priority
                className="object-contain"
              />
            </div>

            <Image
              src="/banner-desktop.png"
              alt="Banner Desktop"
              fill
              className="hidden md:block object-cover"
            />

            <div className="hidden md:flex absolute inset-0 items-center justify-center -translate-y-28 z-10">
              <Image
                src="/logo-banner.png"
                alt="Logo Maria Clara Desktop"
                width={450}
                height={180}
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="relative z-10 px-6 max-w-5xl w-full flex flex-col items-center pt-20 pb-12 mt-48 md:mt-30">
            <div className="w-full p-3 md:p-4 bg-white rounded-2xl shadow-2xl border border-slate-100">
              <div className="flex flex-col md:flex-row items-end gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {/* Finalidade */}
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label className="font-urban text-slate-400 ml-3">
                      Finalidade
                    </label>

                    <Select onValueChange={setPurpose}>
                      <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-slate-700 font-medium bg-slate-50/80 hover:bg-slate-100 transition-all rounded-xl gap-3 h-12 px-4 cursor-pointer">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-slate-100 shadow-2xl p-2">
                        <SelectItem value="Venda">Venda</SelectItem>
                        <SelectItem value="Aluguel">
                          Aluguel / Locação
                        </SelectItem>
                        <SelectItem value="Temporada">Temporada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tipo */}
                  <div className="flex flex-col space-y-1.5 text-left md:border-l md:border-slate-100 md:pl-4">
                    <label className="font-urban text-slate-400 ml-3">
                      Tipo de Imóvel
                    </label>

                    <Select onValueChange={setType}>
                      <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-slate-700 font-medium bg-slate-50/80 hover:bg-slate-100 transition-all rounded-xl gap-3 h-12 px-4 cursor-pointer">
                        <SelectValue placeholder="O que deseja?" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-slate-100 shadow-2xl p-2">
                        <SelectGroup>
                          <SelectLabel className="font-bold text-muted-foreground">
                            Residencial
                          </SelectLabel>
                          <SelectItem value="Casa">Casa</SelectItem>
                          <SelectItem value="Apartamento">
                            Apartamento
                          </SelectItem>
                          <SelectItem value="Casa-Condominio">
                            Casa em Condomínio
                          </SelectItem>
                          <SelectItem value="Cobertura">Cobertura</SelectItem>
                          <SelectItem value="Duplex">Duplex</SelectItem>
                          <SelectItem value="Kitnet">Kitnet / Loft</SelectItem>
                          <SelectItem value="Modelo-Para-Construcao">
                            Modelos para Construção
                          </SelectItem>
                        </SelectGroup>

                        <SelectGroup className="mt-2">
                          <SelectLabel className="font-bold text-muted-foreground">
                            Comercial / Outros
                          </SelectLabel>
                          <SelectItem value="Sala-Comercial">
                            Sala Comercial
                          </SelectItem>
                          <SelectItem value="Galpao">
                            Galpão / Depósito
                          </SelectItem>
                          <SelectItem value="Terreno">
                            Terreno / Lote
                          </SelectItem>
                          <SelectItem value="Chacara">
                            Chácara / Sítio
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Localização */}
                  <div className="flex flex-col space-y-1.5 text-left md:border-l md:border-slate-100 md:pl-4">
                    <label className="font-urban text-slate-400 ml-3">
                      Localização
                    </label>

                    <Select onValueChange={setLocation}>
                      <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-slate-700 font-medium bg-slate-50/80 hover:bg-slate-100 transition-all rounded-xl gap-3 h-12 px-4 cursor-pointer">
                        <SelectValue placeholder="Onde?" />
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-slate-100 shadow-2xl p-2">
                        {locations?.map((location: string) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  className="w-full md:w-auto bg-clara-secondary hover:bg-clara-tertiary text-white px-10 h-12 rounded-xl transition-colors font-cinzel cursor-pointer"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
