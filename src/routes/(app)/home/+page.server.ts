import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { setFlash, getFlash } from "$lib/server/flash";

export const load: PageServerLoad = async ({ cookies, url }) => {
  // const token = cookies.get("accessToken");
  // if (!token) {
  //   setFlash(cookies, "without_aut", "Inicie sesión y vuelva a probar.");
  //   throw redirect(302, `/login`);
  // }
  return {};
};
