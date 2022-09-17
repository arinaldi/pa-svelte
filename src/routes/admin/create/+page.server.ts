import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { type Actions, invalid, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTES_ADMIN, ROUTE_HREF } from '$lib/constants';
import type { Album } from '$lib/types';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (!user) {
    throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
  }

  return {};
};

export const actions: Actions = {
  default: async ({ locals, request, url }) => {
    if (!locals.user) {
      throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
    }

    const formData = await request.formData();
    const artist = formData.get('artist');
    const title = formData.get('title');
    const year = formData.get('year');
    const cd = formData.get('cd');
    const favorite = formData.get('favorite');
    const studio = formData.get('studio');

    if (typeof artist !== 'string' || artist.length === 0) {
      return invalid(400, { artist: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return invalid(400, { title: 'Title is required' });
    }

    if (typeof year !== 'string' || year.length === 0) {
      return invalid(400, { year: 'Year is invalid' });
    }

    const { error: error } = await supabaseServerClient(request)
      .from<Album>('albums')
      .insert([
        {
          artist,
          title,
          year,
          cd: cd === 'on',
          favorite: favorite === 'on',
          studio: studio === 'on',
        },
      ]);

    if (error) {
      return invalid(500, { general: error.message });
    }

    throw redirect(303, `${ROUTES_ADMIN.base.href}${url.search}`);
  },
};
