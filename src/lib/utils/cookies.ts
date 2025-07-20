export function setAccessTokenCookie(token: string, maxAgeSeconds = 3600) {
    
	const isSecure = location.protocol === "https:";
	const cookie = [
		`accessToken=${token}`,
		`path=/`,
		`max-age=${maxAgeSeconds}`,
		`SameSite=Lax`,
		isSecure ? `Secure` : ``
	]
		.filter(Boolean)
		.join("; ");

	document.cookie = cookie;
}
