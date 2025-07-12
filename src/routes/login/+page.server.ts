import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { setFlash, getFlash } from "$lib/server/flash";

export const load: PageServerLoad = async ({ cookies, url }) => {
  let isR = getFlash(cookies, "without_aut"); // Get event of invalid authorization

  let msg = "";
  if (isR == "SIN_LOGIN") {
    msg = "¡Debe loguearse!"
  }
  return {msg: msg};
};
