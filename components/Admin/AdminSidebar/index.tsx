"use client";

import type React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { BookOpenText, LogOut, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import logo from "@/public/logo.png";

import { LogoutAdminService } from "@/services/auth.service";

interface AdminSidebarProps {
  children: React.ReactNode;

  user: {
    name: string;
  };
}

export default function AdminSidebar({ children, user }: AdminSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const navigation = [
    {
      name: "Catálogo",
      href: "/admin/catalogo",
      icon: BookOpenText,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-urban">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-clara-primary shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 mt-4">
          <Link href="/" className="flex items-center ml-10">
            <Image src={logo} alt="logo" width={150} />
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-clara-secondary hover:text-clara-tertiary transition-colors cursor-pointer mr-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-clara-tertiary text-white border-r-2 border-clara-secondary"
                    : "hover:bg-clara-tertiary hover:text-white"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />

                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <form action={LogoutAdminService}>
            <Button
              type="submit"
              className="w-full bg-clara-secondary hover:bg-clara-quaternary cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </form>
        </div>
      </div>

      <div className="lg:pl-64">
        <header className="bg-clara-tertiary shadow-sm text-white border-b h-16 flex items-center justify-between px-6 lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-clara-primary hover:text-clara-secondary transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <p>
              Seja bem-vindo, <strong>{user?.name}</strong>
            </p>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
