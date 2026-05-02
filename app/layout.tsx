import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        url: "/logo.jpeg",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
