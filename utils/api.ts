const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    let errorMessage = "Erro desconhecido";

    const responseText = await res.text();

    try {
      const errorData = JSON.parse(responseText);

      errorMessage = errorData.message || JSON.stringify(errorData);
    } catch {
      errorMessage = responseText;
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
