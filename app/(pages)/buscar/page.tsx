"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import PropertyCard from "@/components/PropertyCard";

import {
  useFindAllLocations,
  useFindAllProperties,
} from "@/hooks/usePropertyQuery";

import { IProperty } from "@/interfaces/property";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";

export function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPurpose = searchParams.get("purpose") || "";
  const initialType = searchParams.get("type") || "";
  const initialLocation = searchParams.get("location") || "";

  const [purpose, setPurpose] = useState(initialPurpose);
  const [type, setType] = useState(initialType);
  const [location, setLocation] = useState(initialLocation);

  const { data: locations } = useFindAllLocations();

  const [filters, setFilters] = useState({
    purpose: initialPurpose,
    type: initialType,
    location: initialLocation,
  });

  const { data, isLoading } = useFindAllProperties({
    purpose: filters.purpose || undefined,
    type: filters.type || undefined,
    location: filters.location || undefined,
  });

  const properties: IProperty[] = data?.data ?? [];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (purpose) params.set("purpose", purpose);
    if (type) params.set("type", type);
    if (location) params.set("location", location);

    setFilters({
      purpose,
      type,
      location,
    });

    router.push(`/buscar?${params.toString()}`);
  };

  return (
    <section className="py-10 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 xl:px-0">
        {/* Filtros */}
        <div className="w-full p-3 md:p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-10">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Finalidade */}
              <div className="flex flex-col space-y-1.5 text-left">
                <label className="font-urban text-slate-400 ml-3">
                  Finalidade
                </label>

                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger className="w-full border-none shadow-none focus:ring-0 bg-slate-50 hover:bg-slate-100 rounded-xl h-12 px-4 cursor-pointer">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Venda">Venda</SelectItem>
                    <SelectItem value="Aluguel">Aluguel / Locação</SelectItem>
                    <SelectItem value="Temporada">Temporada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo */}
              <div className="flex flex-col space-y-1.5 text-left">
                <label className="font-urban text-slate-400 ml-3">
                  Tipo de Imóvel
                </label>

                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full border-none shadow-none focus:ring-0 bg-slate-50 hover:bg-slate-100 rounded-xl h-12 px-4 cursor-pointer">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="font-bold text-muted-foreground">
                        Residencial
                      </SelectLabel>
                      <SelectItem value="Casa">Casa</SelectItem>
                      <SelectItem value="Apartamento">Apartamento</SelectItem>
                      <SelectItem value="Casa-Condominio">
                        Casa em Condomínio
                      </SelectItem>
                      <SelectItem value="Cobertura">Cobertura</SelectItem>
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
                      <SelectItem value="Galpao">Galpão / Depósito</SelectItem>
                      <SelectItem value="Terreno">Terreno / Lote</SelectItem>
                      <SelectItem value="Chacara">Chácara / Sítio</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Localização */}
              <div className="flex flex-col space-y-1.5 text-left">
                <label className="font-urban text-slate-400 ml-3">
                  Localização
                </label>

                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full border-none shadow-none focus:ring-0 bg-slate-50 hover:bg-slate-100 rounded-xl h-12 px-4 cursor-pointer">
                    <SelectValue placeholder="Onde?" />
                  </SelectTrigger>

                  <SelectContent>
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
              className="w-full md:w-auto bg-clara-secondary hover:bg-clara-tertiary text-white px-10 h-12 rounded-xl font-cinzel cursor-pointer"
            >
              <Search className="mr-2 h-4 w-4" />
              BUSCAR
            </Button>
          </div>
        </div>

        {/* Imóveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-md border border-border bg-card"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
                  <Skeleton className="h-full w-full rounded-none" />
                </div>

                <div className="p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-7 w-40" />
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-6" />
                      </div>
                    ))}
                  </div>

                  <Skeleton className="h-4 w-3/4 mt-4" />
                </div>
              </div>
            ))
          ) : properties.length > 0 ? (
            properties.map((property, index) => (
              <Link href={`/imovel/${property.id}`} key={index}>
                <PropertyCard {...property} />
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-urban text-slate-700">
                Nenhum resultado encontrado.
              </h3>

              <p className="text-slate-500 mt-2 max-w-md font-urban">
                Não encontramos itens com os filtros selecionados. Tente ajustar
                sua busca.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { Suspense } from "react";

export default function BuscarPage() {
  return (
    <Suspense fallback={<main className="min-h-screen"></main>}>
      <SearchContent />
    </Suspense>
  );
}
