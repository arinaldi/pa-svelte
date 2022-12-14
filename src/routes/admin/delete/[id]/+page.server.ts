import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTES_ADMIN, ROUTE_HREF } from '$lib/constants';

export const load: PageServerLoad = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);

  if (!session) {
    throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
  }

  const { data: album, error } = await supabaseClient
    .from('albums')
    .select('*')
    .eq('id', event.params.id)
    .single();

  if (error) {
    return fail(500, { error: error.message });
  }

  return { album };
};

export const actions: Actions = {
  default: async (event) => {
    const { supabaseClient, session } = await getSupabase(event);

    if (!session) {
      throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
    }

    const { id } = event.params;

    if (!id || typeof id !== 'string') {
      return fail(400, { error: 'ID is required' });
    }

    const { error } = await supabaseClient.from('albums').delete().eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    throw redirect(303, `${ROUTES_ADMIN.base.href}${event.url.search}`);
  },
};
