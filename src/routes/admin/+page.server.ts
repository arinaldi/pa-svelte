import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { type Action, error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTE_HREF, SORT_DIRECTION } from '$lib/constants';
import { parsePageQuery, parsePerPageQuery, parseQuery } from '$lib/utils';
import type { Album } from '$lib/types';

const { ASC, DESC } = SORT_DIRECTION;

export const load: PageServerLoad = async ({ parent, request, url }) => {
  const { user } = await parent();

  if (!user) {
    throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
  }

  const artist = parseQuery(url.searchParams.get('artist'));
  const page = parsePageQuery(url.searchParams.get('page'));
  const perPage = parsePerPageQuery(url.searchParams.get('perPage'));
  const sort = parseQuery(url.searchParams.get('sort'));
  const studio = parseQuery(url.searchParams.get('studio'));
  const title = parseQuery(url.searchParams.get('title'));
  const [sortProp, desc] = sort.split(':') ?? [];
  const direction = desc ? DESC : ASC;
  const start = (page - 1) * perPage;
  const end = page * perPage - 1;

  let query = supabaseServerClient(request)
    .from('albums')
    .select('*', { count: 'exact' })
    .ilike('artist', `%${artist}%`)
    .ilike('title', `%${title}%`)
    .range(start, end);

  if (studio === 'true') {
    query = query.eq('studio', true);
  }

  if (sortProp) {
    query = query.order(sortProp, { ascending: direction === ASC });
  } else {
    query = query
      .order('artist', { ascending: true })
      .order('title', { ascending: true });
  }

  if (sortProp === 'artist') {
    query = query.order('title', { ascending: true });
  } else {
    query = query.order('artist', { ascending: direction === ASC });
  }

  const { data: albums, count, error: albumsError } = await query;

  if (albumsError) {
    throw error(500, albumsError.message);
  }

  const { count: cdCount, error: cdError } = await supabaseServerClient(request)
    .from<Album>('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);

  if (cdError) {
    throw error(500, cdError.message);
  }

  return {
    albums: albums as Album[],
    cdTotal: cdCount,
    total: count,
  };
};

export const POST: Action = async ({ request, url }) => {
  const formData = await request.formData();
  const artist = formData.get('artist');
  const title = formData.get('title');
  const year = formData.get('year');
  const cd = formData.get('cd');
  const favorite = formData.get('favorite');
  const studio = formData.get('studio');

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

  if (supaError) {
    throw error(500, supaError.message);
  }

  throw redirect(303, url.href);
};
