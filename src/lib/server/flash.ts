import type { Cookies } from '@sveltejs/kit';

// Generate a temporary cookie
export function setFlash(cookies: Cookies, key: string, value: string) {
  cookies.set(key, value, { path: '/', maxAge: 5 });
}

// Get a temporary cookie
export function getFlash(cookies: Cookies, key: string) {
  const value = cookies.get(key);
  if (value) cookies.delete(key, { path: '/' });
  return value;
}