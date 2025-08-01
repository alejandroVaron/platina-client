import { goto } from "$app/navigation";
import {
  getAccessTokenCookie,
  deleteAccessTokenCookie,
} from "$lib/utils/cookies";
import { addToast } from "$lib/stores/toast";

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  token?: string;
  headers?: Record<string, string>;
};

export async function fetcher<T>(
  url: string,
  { method = "GET", body, headers = {} }: FetcherOptions = {}
): Promise<T> {
  const tokenCookies = getAccessTokenCookie("accessToken");
  url = `${import.meta.env.VITE_API_URL}/${url}`;
  if (method === "GET" && body) {
    const query = new URLSearchParams(body).toString();
    url += url.includes("?") ? `&${query}` : `?${query}`;
    body = undefined;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(tokenCookies ? { Authorization: `Bearer ${tokenCookies}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

      if (response.status === 401) {
    addToast({
      data: {
        title: "Debe loguearse de nuevo.",
        description: "",
        state: "error",
      },
    });
    deleteAccessTokenCookie("accessToken");
    goto("/login");
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  console.log(response);

  return response.json();
}
