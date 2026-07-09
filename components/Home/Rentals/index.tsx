"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { IProperty } from "@/interfaces/property";
import { useFindAllProperties } from "@/hooks/usePropertyQuery";

export default function HomeRentals() {
  const page = 1;
  const limit = 4;
  const type =
    "Casa,Apartamento,Casa-Condominio,Cobertura,Duplex,Kitnet,Sala-Comercial,Galpao,Chacara";
  const purpose = "Aluguel";

  const { data, isLoading } = useFindAllProperties({
    page,
    limit,
    type,
    purpose,
  });

  const properties: IProperty[] = data?.data ?? [];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 xl:px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-urban">Imóveis para Locação</h2>

          <Link
            href="/imoveis?purpose=Aluguel&type=Casa,Apartamento,Casa-Condominio,Cobertura,Duplex,Kitnet,Sala-Comercial,Galpao,Chacara"
            className="flex items-center gap-1 text-sm font-cinzel border-clara-secondary border px-4 py-2 rounded text-clara-secondary hover:border-clara-tertiary hover:text-clara-tertiary transition-colors"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-1/1 md:basis-1/2 lg:basis-1/4"
                  >
                    <div className="overflow-hidden rounded-md border border-border bg-card">
                      <div className="relative aspect-4/3 overflow-hidden bg-muted">
                        <Skeleton className="h-full w-full rounded-none" />
                      </div>

                      <div className="p-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-7 w-40" />
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-6" />
                          </div>

                          <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-6" />
                          </div>

                          <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-6" />
                          </div>

                          <div className="flex items-center gap-1">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-10" />
                          </div>
                        </div>

                        <Skeleton className="h-4 w-3/4 mt-4" />
                      </div>
                    </div>
                  </CarouselItem>
                ))
              : properties.map((property) => (
                  <CarouselItem
                    key={property.id}
                    className="pl-4 basis-1/1 md:basis-1/2 lg:basis-1/4"
                  >
                    <Link href={`/imovel/${property.id}`}>
                      <PropertyCard {...property} />
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
