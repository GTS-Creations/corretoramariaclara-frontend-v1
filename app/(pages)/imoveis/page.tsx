"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import PropertyCard from "@/components/PropertyCard";
import { useFindAllProperties } from "@/hooks/usePropertyQuery";
import { IProperty } from "@/interfaces/property";
import { Skeleton } from "@/components/ui/skeleton";

export function PropertiesContent() {
  const searchParams = useSearchParams();

  const purpose = searchParams.get("purpose") || "";
  const type = searchParams.get("type") || "";

  const page = 1;
  const limit = 4;

  const { data, isLoading } = useFindAllProperties({
    page,
    limit,
    type,
    purpose,
  });

  const properties: IProperty[] = data?.data ?? [];

  return (
    <section id="imoveis" className="py-10 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 xl:px-0">
        <h1 className="text-3xl font-light mb-8">
          {purpose === "Venda"
            ? "Todos à venda"
            : purpose === "Aluguel"
              ? "Todos para aluguel"
              : type
                ? `Todos os ${type}s`
                : "Todos os imóveis"}
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="basis-1/1 md:basis-1/2 lg:basis-1/4 overflow-hidden rounded-md border border-border bg-card"
                >
                  <div className="group">
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
                </div>
              ))
            : properties.map((property, index) => (
                <Link href={`/imovel/${property.id}`} key={index}>
                  <PropertyCard {...property} />
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}

import { Suspense } from "react";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<></>}>
      <PropertiesContent />
    </Suspense>
  );
}
