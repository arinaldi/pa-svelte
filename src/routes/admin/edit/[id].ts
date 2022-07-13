import type { RequestHandler } from '@sveltejs/kit';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';

import { ROUTES_ADMIN } from '$lib/constants';
import type { Album } from '$lib/types';

export const get: RequestHandler = async ({ params, request }) => {
  const { data: album, error } = await supabaseServerClient(request)
    .from<Album>('albums')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return {
      body: { error },
    };
  }

  return {
    body: { album },
  };
};

export const put: RequestHandler = async ({ params, request, url }) => {
  const { id } = params;
  const formData = await request.formData();
  const artist = formData.get('artist');
  const title = formData.get('title');
  const year = formData.get('year');
  const cd = formData.get('cd');
  const favorite = formData.get('favorite');
  const studio = formData.get('studio');

  if (!id || typeof id !== 'string') {
    return {
      body: { errors: { id: 'ID is required' } },
      status: 400,
    };
  }

  if (typeof artist !== 'string' || artist.length === 0) {
    return {
      body: { errors: { artist: 'Artist is required' } },
      status: 400,
    };
  }

  if (typeof title !== 'string' || title.length === 0) {
    return {
      body: { errors: { title: 'Title is required' } },
      status: 400,
    };
  }

  if (typeof year !== 'string' || year.length === 0) {
    return {
      body: { errors: { year: 'Year is invalid' } },
      status: 400,
    };
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
    return {
      body: { error },
      status: 500,
    };
  }

  const [query] = url.search.split('&_');

  return {
    headers: { location: `${ROUTES_ADMIN.base.href}${query}` },
    status: 303,
  };
};
