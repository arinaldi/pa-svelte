import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from '@sveltejs/kit';

import { ROUTES_ADMIN } from '$lib/constants';
import type { Album } from '$lib/types';

export const GET: RequestHandler = async ({ params, request }) => {
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

export const DEL: RequestHandler = async ({ params, request, url }) => {
  const { id } = params;

  if (!id || typeof id !== 'string') {
    return {
      body: { errors: { id: 'ID is required' } },
      status: 400,
    };
  }

  const { error } = await supabaseServerClient(request)
    .from<Album>('albums')
    .delete()
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
