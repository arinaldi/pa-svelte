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

export const PUT: Action = async ({ params, request, url }) => {
  const { id } = params;
  const formData = await request.formData();
  const artist = formData.get('artist');
  const title = formData.get('title');
  const year = formData.get('year');
  const cd = formData.get('cd');
  const favorite = formData.get('favorite');
  const studio = formData.get('studio');

  if (!id || typeof id !== 'string') {
    throw error(400, 'ID is required');
  }

  if (typeof artist !== 'string' || artist.length === 0) {
    throw error(400, 'Artist is required');
  }

  if (typeof title !== 'string' || title.length === 0) {
    throw error(400, 'Title is required');
  }

  if (typeof year !== 'string' || year.length === 0) {
    throw error(400, 'Year is invalid');
  }

  const { error: supaError } = await supabaseServerClient(request)
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

  if (supaError) {
    throw error(500, supaError.message);
  }

  const [query] = url.search.split('&_');

  throw redirect(303, `${ROUTES_ADMIN.base.href}${query}`);
};
