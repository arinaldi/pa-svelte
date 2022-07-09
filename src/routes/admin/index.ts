import { supabase } from '$lib/supabase';

import type { RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './__types';

import { SORT_DIRECTION } from '$lib/constants';
import { parsePageQuery, parsePerPageQuery, parseQuery } from '$lib/utils';

const { ASC, DESC } = SORT_DIRECTION;

export const get: RequestHandler = async ({ url }: RequestEvent) => {
  const page = parsePageQuery(url.searchParams.get('page'));
  const perPage = parsePerPageQuery(url.searchParams.get('perPage'));
  const sort = parseQuery(url.searchParams.get('sort'));
  const studio = parseQuery(url.searchParams.get('studio'));
  const { artist, title } = {
    artist: '',
    title: '',
  };
  const [sortProp, desc] = sort.split(':') ?? [];
  const direction = desc ? DESC : ASC;
  const start = (page - 1) * perPage;
  const end = page * perPage - 1;

  let query = supabase
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

  const { data: albums, count, error } = await query;

  if (error) throw error;

  return {
    body: {
      albums: albums || [],
      total: count || 0,
    },
  };
};

/* interface Queries {
  artist: string;
  page: number;
  perPage: PER_PAGE;
  sort: string;
  studio: string;
  title: string;
}
*/
