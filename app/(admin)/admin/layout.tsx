import type React from "react";
import { AuthMe } from "@/services/auth.service";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await AuthMe();

  if (!user) {
    redirect("/login");
  }

  return <AdminSidebar user={user}>{children}</AdminSidebar>;
}
