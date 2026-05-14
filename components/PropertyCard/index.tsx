"use client";

import Image from "next/image";
import { Bed, Bath, Car, Maximize, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import image from "@/public/hero.png";
import { FaWhatsapp } from "react-icons/fa";

interface PropertyCardProps {
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: string;
  location: string;
}

export default function PropertyCard({
  title,
  price,
  bedrooms,
  bathrooms,
  parking,
  area,
  location,
}: PropertyCardProps) {
  const whatsappNumber = "5587999380401";

  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de mais informações sobre o imóvel:
*${title}*
Valor: ${price}
Localização: ${location}
Configuração: ${bedrooms} quartos, ${bathrooms} banheiros e ${area}.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="group bg-card rounded-md overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <span className="text-sm text-muted-foreground">{title}</span>
        <p className="text-xl font-bold mt-1">{price}</p>

        <div className="flex flex-wrap gap-4 mt-4 text-muted-foreground">
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
            <span className="text-sm">{parking}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span className="text-sm">{area}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-3">{location}</p>

        {/* <Button
          onClick={(e) => {
            e.stopPropagation();
            handleWhatsAppClick();
          }}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white flex gap-2 cursor-pointer"
        >
          <FaWhatsapp className="h-4 w-4" />
          Saiba mais
        </Button> */}
      </div>
    </div>
  );
}
