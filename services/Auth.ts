"use server";

import { apiRequest } from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

export async function LoginAdminService({ email, password }: LoginData) {
  try {
    const { access_token } = await apiRequest("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const cookieStore = await cookies();
    cookieStore.set("nextauth.token", access_token, {
      maxAge: 60 * 60 * 24,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return access_token;
  } catch (error: any) {
    throw error;
  }
}

export async function AuthMe() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nextauth.token")?.value;

  if (!token) return null;

  try {
    const res = await apiRequest(`/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function LogoutAdminService() {
  const cookieStore = await cookies();
  cookieStore.delete("nextauth.token");

  redirect("/");
}
