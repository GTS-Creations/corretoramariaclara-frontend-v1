"use client";

import { MapPin, Bed, Bath, Car, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaWhatsapp } from "react-icons/fa";

export default function ImovelPage() {
  const property = {
    title: "Sobrado mobiliado",
    price: "R$ 380.000",
    location: "Pinheiros - Estrela - RS",
    bedrooms: 2,
    bathrooms: 2,
    area: "70 m²",
    vagas: 1,
  };

  const whatsappNumber = "5587999380401";
  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de mais informações sobre o imóvel:
*${property.title}*
Valor: ${property.price}
Localização: ${property.location}
Configuração: ${property.bedrooms} quartos, ${property.bathrooms} banheiros e ${property.area}.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 xl:px-0 pt-6 pb-10 bg-white">
      {/* --- Galeria de Imagens --- */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-2 h-75 md:h-125 mb-8 rounded-xl overflow-hidden">
        <div className="md:col-span-2 relative bg-gray-200">
          <img
            src="/placeholder-main.jpg"
            alt="Principal"
            className="w-full h-full object-cover"
          />
          <Button
            variant="secondary"
            className="absolute bottom-4 left-4 gap-2"
          >
            Fotos (10)
          </Button>
        </div>
        <div className="hidden md:grid grid-rows-2 gap-2 md:col-span-2">
          <div className="bg-gray-200">
            <img
              src="/placeholder-kitchen.jpg"
              className="w-full h-full object-cover"
              alt="Cozinha"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-200">
              <img
                src="/placeholder-room.jpg"
                className="w-full h-full object-cover"
                alt="Quarto"
              />
            </div>
            <div className="bg-gray-200 relative">
              <img
                src="/placeholder-more.jpg"
                className="w-full h-full object-cover brightness-50"
                alt="Mais"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                + Ver mais
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Coluna da Esquerda --- */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b text-slate-600 pb-4">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                {property.title}
              </h1>
              <p className="text-slate-500 flex items-center gap-1.5 text-sm md:text-base">
                <MapPin size={18} className="text-slate-400" />
                {property.location}
              </p>
            </div>

            <div className="text-left md:text-right bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg w-full md:w-auto">
              <p className="text-xs uppercase font-semibold text-slate-500 md:mb-1">
                Valor
              </p>
              <p className="font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tighter">
                {property.price}
              </p>
            </div>
          </div>

          <div className="flex justify-around pb-4 border-b text-slate-600">
            <div className="flex flex-col items-center gap-1">
              <Home size={24} />
              <span className="text-[10px] uppercase">Área</span>
              <p className="font-bold">{property.area}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bed size={24} />
              <span className="text-[10px] uppercase">Quartos</span>
              <p className="font-bold">{property.bedrooms}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bath size={24} />
              <span className="text-[10px] uppercase">Banh.</span>
              <p className="font-bold">{property.bathrooms}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Car size={24} />
              <span className="text-[10px] uppercase">Vagas</span>
              <p className="font-bold">{property.vagas}</p>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold mb-4">Descrição</h2>
            <p className="text-slate-600 leading-relaxed">
              Sobrado disponível para venda e locação no bairro Pinheiros,
              localizado em rua asfaltada. O imóvel conta com 2 dormitórios,
              sala aconchegante integrada à cozinha, além de ser mobiliado.
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
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Ficou interessado?
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Clique no botão abaixo para conversar agora e tirar suas dúvidas
                sobre este imóvel.
              </p>

              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-7 text-lg gap-3 transition-transform cursor-pointer shadow-lg hover:scale-95 font-extralight"
              >
                Saiba Mais via WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="/corretor.jpg"
                  alt="Corretor"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="font-extralight text-sm">Maria Clara</p>
                <p className="text-xs text-slate-500">CRECI: 21203</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
