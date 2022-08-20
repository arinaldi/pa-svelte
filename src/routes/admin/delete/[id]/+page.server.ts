import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { type Action, error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTES_ADMIN, ROUTE_HREF } from '$lib/constants';
import type { Album } from '$lib/types';

export const load: PageServerLoad = async ({ params, parent, request }) => {
  const { user } = await parent();

  if (!user) {
    throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
  }

  const { data: album, error: supaError } = await supabaseServerClient(request)
    .from<Album>('albums')
    .select('*')
    .eq('id', params.id)
    .single();

  if (supaError) {
    throw error(500, supaError.message);
  }

  return { album };
};

export const DELETE: Action = async ({ params, request, url }) => {
  const { id } = params;

  if (!id || typeof id !== 'string') {
    throw error(400, 'ID is required');
  }

  const { error: supaError } = await supabaseServerClient(request)
    .from<Album>('albums')
    .delete()
    .eq('id', id);

  if (supaError) {
    throw error(500, supaError.message);
  }

  const [query] = url.search.split('&_');

  throw redirect(303, `${ROUTES_ADMIN.base.href}${query}`);
};
