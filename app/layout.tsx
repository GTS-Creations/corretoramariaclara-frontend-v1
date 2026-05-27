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
  title: "Corretora em Arcoverde | Maria Clara | Imóveis e Consultoria",
  description:
    "Encontre os melhores imóveis em Arcoverde e região com Maria Clara. Consultoria imobiliária especializada em compra, venda e aluguel com segurança e transparência.",
  keywords: [
    "Corretora Arcoverde",
    "Imobiliária Arcoverde",
    "Comprar casa Arcoverde",
    "Aluguel de imóveis Arcoverde",
    "Maria Clara Corretora",
    "Apartamentos em Arcoverde",
    "Investimento imobiliário Pernambuco",
    "Terrenos em Arcoverde",
    "Avaliação de imóveis Arcoverde",
  ],
  openGraph: {
    title: "Maria Clara - Consultoria Imobiliária em Arcoverde",
    description:
      "Ajudando você a encontrar o imóvel dos seus sonhos em Arcoverde e região.",
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
