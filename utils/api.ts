const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    let errorMessage = "Erro desconhecido";
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } catch {
      errorMessage = await res.text();
    }
    throw new Error(`Erro na API: ${res.status} - ${errorMessage}`);
  }

  if (res.status === 204) return null;

  const contentType = res.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return res.json();
  }

  return res;
}
