"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, MessagesSquare, X } from "lucide-react";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.jpeg";
import Image from "next/image";

interface NavbarProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  mobile?: boolean;
}

export const NavLink: React.FC<NavbarProps> = ({
  href,
  children,
  onClick,
  mobile,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseStyle = mobile
    ? "block rounded-lg px-3 py-2 text-base font-medium transition-colors"
    : "transition-colors";

  const activeStyle = isActive
    ? "text-red-500 underline underline-offset-4 decoration-2 decoration-red-500 bg-red-50/50 lg:bg-transparent"
    : "text-gray-800 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-red-500 hover:bg-muted lg:hover:bg-transparent";

  return (
    <Link
      href={href}
      className={`${baseStyle} ${activeStyle}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const navigation = [
  { name: "Encontre seu Imóvel", href: "/" },
  {
    name: "Entenda Sobre o Financiamento",
    href: "/entenda-sobre-o-financiamento",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80 border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 xl:px-0 py-4 font-serif">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200">
            <Image
              src={logo}
              alt="Logo Maria Clara Corretora"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight uppercase tracking-wider">
              Maria Clara
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold leading-tight uppercase">
              Corretora
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex">
          <Link
            href="https://wa.me/5587999380401?text=Olá! Gostaria de saber como faço para indicar meu imóvel."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gray-800 hover:bg-red-500 transition-colors cursor-pointer rounded-full px-6 py-5">
              Anuncie Aqui
              <MessagesSquare className="ml-1" />
            </Button>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu</span>
            {mobileMenuOpen ? (
              <X
                className="h-7 w-7 transition-all cursor-pointer"
                aria-hidden="true"
              />
            ) : (
              <Menu
                className="h-7 w-7 transition-all cursor-pointer"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden animate-in slide-in-from-top-2 duration-200 font-serif">
          <div className="space-y-1 px-4 pb-6 pt-2 border-t border-border bg-card">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                mobile
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4">
              <Link
                href="https://wa.me/5587999380401"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-gray-800 hover:bg-red-500 transition-colors cursor-pointer rounded-full py-6 text-base">
                  Anuncie Aqui
                  <MessagesSquare className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
