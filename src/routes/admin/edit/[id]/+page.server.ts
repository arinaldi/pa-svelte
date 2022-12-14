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
    const { session, supabaseClient } = await getSupabase(event);

    if (!session) {
      throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
    }

    const { id } = event.params;
    const formData = await event.request.formData();
    const artist = formData.get('artist');
    const title = formData.get('title');
    const year = formData.get('year');
    const cd = formData.get('cd');
    const favorite = formData.get('favorite');
    const studio = formData.get('studio');

    if (!id || typeof id !== 'string') {
      return fail(400, { error: 'ID is required' });
    }

    if (typeof artist !== 'string' || artist.length === 0) {
      return fail(400, { error: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return fail(400, { error: 'Title is required' });
    }

    if (typeof year !== 'string' || year.length === 0) {
      return fail(400, { error: 'Year is invalid' });
    }

    const { error } = await supabaseClient
      .from('albums')
      .update({
        artist,
        title,
        year,
        cd: cd === 'on',
        favorite: favorite === 'on',
        studio: studio === 'on',
      })
      .eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    throw redirect(303, `${ROUTES_ADMIN.base.href}${event.url.search}`);
  },
};
