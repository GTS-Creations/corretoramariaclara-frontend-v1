import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TanstackQueryProvider } from "@/providers/useTanstackQueryProvider";
import { Urbanist, Cinzel_Decorative } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700"],
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel-decorative",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Corretora de Imóveis em Arcoverde PE | Maria Clara",
  description:
    "Encontre os melhores imóveis em Arcoverde e região com Maria Clara. Consultoria imobiliária especializada em compra, venda e aluguel com segurança e transparência.",
  keywords: [
    "imobiliária em Arcoverde PE",
    "corretora de imóveis em Arcoverde PE",
    "imóveis em Arcoverde PE",
    "casas à venda em Arcoverde PE",
    "apartamentos à venda em Arcoverde PE",
    "terrenos à venda em Arcoverde PE",
    "imóveis para aluguel em Arcoverde PE",
    "consultoria imobiliária em Arcoverde",
    "imóveis no Sertão de Pernambuco",
    "Maria Clara Corretora",
    "corretora em Arcoverde",
  ],
  openGraph: {
    title: "Maria Clara - Corretora de Imóveis em Arcoverde PE",
    description:
      "Ajudando você a encontrar imóveis em Arcoverde e região com compra, venda e aluguel.",
    url: "https://www.corretoramariaclara.com.br",
    siteName: "Maria Clara Corretora",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Maria Clara Corretora de Imóveis",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`h-full antialiased ${urbanist.variable} ${cinzelDecorative.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <TanstackQueryProvider>
          {children} <Toaster richColors position="top-right" />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
