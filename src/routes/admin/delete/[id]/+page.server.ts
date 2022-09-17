import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { type Actions, invalid, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTES_ADMIN, ROUTE_HREF } from '$lib/constants';
import type { Album } from '$lib/types';

export const load: PageServerLoad = async ({ params, parent, request }) => {
  const { user } = await parent();

  if (!user) {
    throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
  }

  const { data: album, error } = await supabaseServerClient(request)
    .from<Album>('albums')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return invalid(500, { general: error.message });
  }

  return { album };
};

export const actions: Actions = {
  default: async ({ locals, params, request, url }) => {
    if (!locals.user) {
      throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
    }

    const { id } = params;

    if (!id || typeof id !== 'string') {
      return invalid(400, { general: 'ID is required' });
    }

    const { error } = await supabaseServerClient(request)
      .from<Album>('albums')
      .delete()
      .eq('id', id);

    if (error) {
      return invalid(500, { general: error.message });
    }

    throw redirect(303, `${ROUTES_ADMIN.base.href}${url.search}`);
  },
};
