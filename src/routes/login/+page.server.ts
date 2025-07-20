import type { PageServerLoad } from "./$types";
import { getFlash } from "$lib/server/flash";

export const load: PageServerLoad = async ({ cookies, url }) => {
  let msg = getFlash(cookies, "without_aut");
  return { message: msg };
};
