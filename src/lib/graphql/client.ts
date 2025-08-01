import { createClient, cacheExchange, fetchExchange } from "@urql/svelte";
import { getAccessTokenCookie } from "$lib/utils/cookies";

let url = import.meta.env.VITE_API_URL;

// Initialize graphql client
export const urqlClient = createClient({
  url: `${url}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const tokenCookies = getAccessTokenCookie("accessToken");
    return {
      headers: {
        Authorization: tokenCookies ? `Bearer ${tokenCookies}` : "",
      },
    };
  },
});
