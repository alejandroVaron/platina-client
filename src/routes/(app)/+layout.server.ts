import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { setFlash } from '$lib/server/flash'

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('accessToken')

	if (!token) {
		setFlash(cookies, 'without_aut', 'Inicie sesión y vuelva a probar.')
		throw redirect(302, '/login')
	}

	return {}
}
