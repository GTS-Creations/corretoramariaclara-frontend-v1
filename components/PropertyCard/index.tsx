"use client";

import Image from "next/image";
import { Bed, Bath, Car, Maximize, MapPin } from "lucide-react";
import { IProperty } from "@/interfaces/property";
import { formatCurrency } from "@/utils/format-currency";

const propertyTypeLabels: Record<string, string> = {
  Casa: "Casa",
  Apartamento: "Apartamento",
  "Casa-Condominio": "Casa em Condomínio",
  Cobertura: "Cobertura",
  Duplex: "Duplex",
  Kitnet: "Kitnet / Loft",
  "Modelo-Para-Construcao": "Modelo para Construção",
  "Sala-Comercial": "Sala Comercial",
  Galpao: "Galpão / Depósito",
  Terreno: "Terreno / Lote",
  Chacara: "Chácara / Sítio",
};

export default function PropertyCard({
  name,
  value,
  bedrooms,
  bathrooms,
  purpose,
  type,
  garage,
  squareMeters,
  location,
  images,
}: IProperty) {
  return (
    <div className="group bg-card rounded-md overflow-hidden border border-border hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <Image
          src={images?.[0] || "/placeholder.jpg"}
          alt={name ? name : "Imagem do imóvel"}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <span className="text-sm text-muted-foreground font-urban wrap-break-word">
          {name} - {purpose}
        </span>

        <p className="text-xl font-bold font-urban mt-1">
          {formatCurrency(value)}
        </p>

        <div className="flex flex-wrap gap-4 mt-4 text-muted-foreground">
          {type !== "Terreno" && (
            <>
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span className="text-sm">{bedrooms}</span>
              </div>

              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span className="text-sm">{bathrooms}</span>
              </div>

              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span className="text-sm">{garage}</span>
              </div>
            </>
          )}

          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span className="text-sm">{squareMeters}m²</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3 line-clamp-1 font-urban flex wrap-break-word">
          <MapPin className="h-4 w-4" />
          {location} - {propertyTypeLabels[type] ?? type}
        </p>
      </div>
    </div>
  );
}
