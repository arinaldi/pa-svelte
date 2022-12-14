import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTE_HREF, SORT_DIRECTION } from '$lib/constants';

import { parsePageQuery, parsePerPageQuery, parseQuery } from '$lib/utils';
import type { Album } from '$lib/types';

const { ASC, DESC } = SORT_DIRECTION;

export const load: PageServerLoad = async (event) => {
  const { url } = event;
  const { supabaseClient, session } = await getSupabase(event);

  if (!session?.user) {
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

  let query = supabaseClient
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
    return fail(500, { general: albumsError.message });
  }

  const { count: cdCount, error: cdError } = await supabaseClient
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);

  if (cdError) {
    return fail(500, { general: cdError.message });
  }

  return {
    albums: albums as Album[],
    cdTotal: cdCount,
    total: count,
  };
};
