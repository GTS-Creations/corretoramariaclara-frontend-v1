"use server";

import { apiRequest } from "@/utils/api";
import { cookies } from "next/headers";
import { toast } from "sonner";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nextauth.token")?.value;
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function FindAllProperties(
  page?: number,
  limit?: number,
  location?: string,
  type?: string,
  purpose?: string,
) {
  const headers = await getAuthHeaders();

  try {
    const queryParams = new URLSearchParams();

    if (page !== undefined) queryParams.append("page", page.toString());
    if (limit !== undefined) queryParams.append("limit", limit.toString());
    if (location) queryParams.append("location", location);
    if (type) queryParams.append("type", type);
    if (purpose) queryParams.append("purpose", purpose);

    const url =
      queryParams.toString().length > 0
        ? `/catalog/properties?${queryParams.toString()}`
        : "/catalog/properties";

    const res = await apiRequest(url, {
      method: "GET",
      headers,
    });

    return res;
  } catch (error) {
    toast.error("Erro ao buscar os imóveis");
  }
}

export async function FindOneProperty(id: string) {
  const headers = await getAuthHeaders();

  try {
    const res = await apiRequest(`/catalog/properties/${id}`, {
      method: "GET",
      headers,
    });

    return res;
  } catch (error) {
    toast.error("Erro ao buscar o imóvel");
  }
}

export async function FindLocations() {
  const headers = await getAuthHeaders();

  try {
    const res = await apiRequest(`/catalog/properties/locations`, {
      method: "GET",
      headers,
    });

    return res;
  } catch (error) {
    toast.error("Erro ao buscar as localizações");
  }
}

export async function StoreProperty(formData: FormData) {
  const headers = await getAuthHeaders();

  try {
    const res = await apiRequest("/catalog/properties", {
      method: "POST",
      headers,
      body: formData,
    });

    return { success: true, data: res };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro inesperado ao criar imóvel",
    };
  }
}

export async function UpdateProperty(id: string, formData: FormData) {
  const headers = await getAuthHeaders();

  try {
    const res = await apiRequest(`/catalog/properties/${id}`, {
      method: "PUT",
      headers,
      body: formData,
    });

    return { success: true, data: res };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro inesperado ao atualizar imóvel",
    };
  }
}

export async function DeleteProperty(id: string) {
  const headers = await getAuthHeaders();

  try {
    const res = await apiRequest(`/catalog/properties/${id}`, {
      method: "DELETE",
      headers,
    });

    return { success: true, data: res };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Erro inesperado ao remover imóvel",
    };
  }
}
