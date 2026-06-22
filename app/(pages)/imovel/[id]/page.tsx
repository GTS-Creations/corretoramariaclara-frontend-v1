"use client";

import {
  MapPin,
  Bed,
  Bath,
  Car,
  Home,
  BadgeCheck,
  CircleX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useFindOneProperty } from "@/hooks/usePropertyQuery";
import { IProperty } from "@/interfaces/property";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils/format-currency";
import { getYoutubeEmbedUrl } from "@/utils/embed-url";

export default function PropertyPage() {
  const { id } = useParams() as { id: string };

  const { data, isLoading } = useFindOneProperty({
    id,
  });

  const property: IProperty = data;

  const handleWhatsAppClick = () => {
    const whatsappNumber = "558799380401";
    const bedroomsLabel = property.bedrooms > 1 ? "quartos" : "quarto";
    const bathroomsLabel = property.bathrooms > 1 ? "banheiros" : "banheiro";
    const garageLabel =
      property.garage > 1 ? "vagas na garagem" : "vaga na garagem";

    const message = `Olá, vim do site e gostaria de mais informações sobre o imóvel:
*${property.name}*
Valor: ${formatCurrency(property.value)}
Localização: ${property.location}
Configuração: ${property.squareMeters}m², ${property.bedrooms} ${bedroomsLabel}, ${property.bathrooms} ${bathroomsLabel} e ${property.garage} ${garageLabel}.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 xl:px-0 py-10 animate-pulse">
        {/* Galeria */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-2 h-75 md:h-125 mb-8 rounded-xl overflow-hidden">
          <div className="md:col-span-2 relative bg-muted rounded-xl">
            <Skeleton className="h-full w-full rounded-none" />

            <Skeleton className="absolute bottom-4 left-4 h-10 w-28 rounded-md" />
          </div>

          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 md:col-span-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-full w-full rounded-none" />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna esquerda */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4">
              <div className="space-y-3 w-full">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <div className="space-y-2 w-full md:w-40">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>

            {/* Infos */}
            <div className="flex justify-around pb-4 border-b">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>

            {/* Descrição */}
            <section className="space-y-4">
              <Skeleton className="h-6 w-40" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <Card className="bg-slate-50/50">
              <CardContent className="p-4 text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />

                <div className="space-y-2 mb-6">
                  <Skeleton className="h-6 w-40 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mx-auto" />
                </div>

                <Skeleton className="h-14 w-full rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    );
  }

  const images =
    property.images && property.images.length > 0
      ? property.images
      : ["/banner-desktop.png"];

  const mediaItems = [
    ...images.map((image) => ({
      type: "image" as const,
      url: image,
    })),
    ...(property.video_url
      ? [
          {
            type: "video" as const,
            url: property.video_url,
          },
        ]
      : []),
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 xl:px-0 py-10">
      {/* --- Galeria de Imagens --- */}
      <section
        className={`
        grid gap-2 mb-8 rounded-xl overflow-hidden
       ${mediaItems.length === 1 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-4"}
      `}
      >
        {mediaItems.slice(0, 5).map((item, index) => {
          const total = mediaItems.length;

          const dynamicClass = (() => {
            // Mobile
            const mobile = total === 1 ? "h-[300px]" : "h-[180px]";

            // Desktop
            if (total === 1) {
              return `${mobile} md:col-span-4 md:h-[500px]`;
            }

            if (total === 2) {
              return `${mobile} md:col-span-2 md:h-[500px]`;
            }

            if (total === 3) {
              return index === 0
                ? `${mobile} col-span-2 md:col-span-2 md:row-span-2 md:h-[500px]`
                : `${mobile} md:col-span-2 md:h-[246px]`;
            }

            if (total === 4) {
              return index === 0
                ? `${mobile} col-span-2 md:col-span-2 md:row-span-2 md:h-[500px]`
                : `${mobile} md:h-[246px]`;
            }

            return index === 0
              ? `${mobile} col-span-2 md:col-span-2 md:row-span-2 md:h-[500px]`
              : `${mobile} md:h-[246px]`;
          })();

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg ${dynamicClass}`}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  src={getYoutubeEmbedUrl(item.url)}
                  title="Vídeo do imóvel"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          );
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Coluna da Esquerda --- */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b text-slate-600 pb-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold font-cinzel text-slate-800 tracking-tight">
                {property.name}
              </h1>

              <p className="text-slate-500 flex items-center gap-1.5 text-sm md:text-base">
                <MapPin size={18} className="text-slate-400 shrink-0" />
                {property.location}
              </p>

              <p className="text-slate-600 text-sm md:text-base font-medium">
                {property.type} • {property.purpose}
              </p>

              <div>
                {property.canFinance ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 border border-green-200">
                    <BadgeCheck size={16} />
                    Financiamento disponível
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 border border-red-200">
                    <CircleX size={16} />
                    Não aceita financiamento
                  </span>
                )}
              </div>
            </div>

            <div className="text-left md:text-right bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg w-full md:w-auto">
              <p className="text-xs uppercase font-urban font-semibold text-slate-500 md:mb-1">
                Valor
              </p>
              <p className="font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tighter font-urban">
                {formatCurrency(property.value)}
              </p>
            </div>
          </div>

          <div className="flex justify-around pb-4 border-b text-slate-600">
            <div className="flex flex-col items-center gap-1">
              <Home size={24} />
              <span className="text-[10px] uppercase font-urban">Área</span>
              <p className="font-bold font-urban">{property.squareMeters}m²</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Bed size={24} />
              <span className="text-[10px] uppercase font-urban">
                {property.bedrooms > 1 ? "Quartos" : "Quarto"}
              </span>
              <p className="font-bold font-urban">{property.bedrooms}</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Bath size={24} />
              <span className="text-[10px] uppercase font-urban">
                {property.bathrooms > 1 ? "Banheiros" : "Banheiro"}
              </span>
              <p className="font-bold font-urban">{property.bathrooms}</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Car size={24} />
              <span className="text-[10px] uppercase font-urban">
                {property.garage > 1 ? "Vagas" : "Vaga"}
              </span>
              <p className="font-bold font-urban">{property.garage}</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold font-urban mb-4">Descrição</h2>
            <p className="text-slate-600 leading-relaxed font-urban wrap-break-word">
              {property.description}
            </p>
          </section>
        </div>

        {/* --- Coluna da Direita (Botão WhatsApp) --- */}
        <aside className="space-y-4">
          <Card className="bg-slate-50/50">
            <CardContent className="p-4 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 font-urban">
                Ficou interessado?
              </h3>
              <p className="text-sm text-slate-500 mb-6 font-urban">
                Clique no botão abaixo para conversar agora e tirar suas dúvidas
                sobre este imóvel.
              </p>

              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-7 text-lg gap-3 transition-colors cursor-pointer font-semibold font-urban"
              >
                Saiba Mais via WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="/perfil.png"
                  alt="Maria Clara"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-urban">Maria Clara</p>
                <p className="text-xs text-slate-500">CRECI: 21203</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
