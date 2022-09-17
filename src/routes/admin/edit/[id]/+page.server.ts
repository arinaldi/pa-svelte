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
    const formData = await request.formData();
    const artist = formData.get('artist');
    const title = formData.get('title');
    const year = formData.get('year');
    const cd = formData.get('cd');
    const favorite = formData.get('favorite');
    const studio = formData.get('studio');

    if (!id || typeof id !== 'string') {
      return invalid(400, { general: 'ID is required' });
    }

    if (typeof artist !== 'string' || artist.length === 0) {
      return invalid(400, { artist: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return invalid(400, { title: 'Title is required' });
    }

    if (typeof year !== 'string' || year.length === 0) {
      return invalid(400, { year: 'Year is invalid' });
    }

    const { error } = await supabaseServerClient(request)
      .from<Album>('albums')
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
      return invalid(500, { general: error.message });
    }

    throw redirect(303, `${ROUTES_ADMIN.base.href}${url.search}`);
  },
};
