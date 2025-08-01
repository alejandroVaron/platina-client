export function setAccessTokenCookie(name: string, token: string, maxAgeSeconds = 3600) {
    
	const isSecure = location.protocol === "https:";
	const cookie = [
		`${name}=${token}`,
		`path=/`,
		`max-age=${maxAgeSeconds}`,
		`SameSite=Lax`,
		isSecure ? `Secure` : ``
	]
		.filter(Boolean)
		.join("; ");

	document.cookie = cookie;
}

export function getAccessTokenCookie(name: string): string | null {
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));

  return value ? decodeURIComponent(value.split('=')[1]) : null;
}

export function deleteAccessTokenCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}
