"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const properties = [
  {
    image: "/images/property1.jpg",
    title: "Casa em Condomínio",
    price: "R$ 1.350.000",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    area: "180m²",
    location: "Condomínio Vila Verde",
  },
  {
    image: "/images/property2.jpg",
    title: "Apartamento",
    price: "R$ 850.000",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: "90m²",
    location: "Jardim das Flores",
  },
  {
    image: "/images/property3.jpg",
    title: "Casa",
    price: "R$ 980.000",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: "150m²",
    location: "Parque das Águas",
  },
  {
    image: "/images/property4.jpg",
    title: "Apartamento",
    price: "R$ 650.000",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: "70m²",
    location: "Centro",
  },
];

export default function HomeLands() {
  return (
    <section id="imoveis" className="py-16 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 xl:px-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extralight">Terrenos em destaque</h2>
          <Link
            href="/imoveis"
            className="flex items-center gap-1 text-sm font-extralight border-red-500 border px-4 py-2 rounded text-red-500 hover:scale-105 transition-transform"
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
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {properties.map((property, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-1/1 md:basis-1/2 lg:basis-1/4"
              >
                <div>
                  <PropertyCard {...property} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
