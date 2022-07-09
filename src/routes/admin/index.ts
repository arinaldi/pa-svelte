import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import type { Album } from '$lib/types';

import { SORT_DIRECTION } from '$lib/constants';
import { supabase } from '$lib/supabase';
import { parsePageQuery, parsePerPageQuery, parseQuery } from '$lib/utils';

const { ASC, DESC } = SORT_DIRECTION;

export const get: RequestHandler = async ({ url }: RequestEvent) => {
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

  if (error) {
    return {
      body: { error },
    };
  }

  const { count: cdCount, error: cdError } = await supabase
    .from<Album>('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);

  if (cdError) {
    return {
      body: { error: cdError },
    };
  }

  return {
    body: {
      albums,
      cdTotal: cdCount,
      total: count,
    },
  };
};
