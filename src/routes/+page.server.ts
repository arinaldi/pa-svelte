import { redirect } from '@sveltejs/kit';
import { ROUTE_HREF } from '$lib/constants';

export async function load() {
  throw redirect(302, ROUTE_HREF.TOP_ALBUMS);
}
