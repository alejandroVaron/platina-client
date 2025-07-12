import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { setFlash, getFlash } from "$lib/server/flash";

export const load: PageServerLoad = async ({ cookies, url }) => {
  const token = cookies.get("authToken");

  if (!token) {
    setFlash(cookies, "without_aut", "SIN_LOGIN"); // Send event to communicate invalid authorization

    throw redirect(302, `/login`);
  }
  return {};
};
