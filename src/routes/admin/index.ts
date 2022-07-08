import { supabase } from '$lib/supabase';

import { SORT_DIRECTION } from '$lib/constants';
// import type { RequestEvent } from '@sveltejs/kit';
import type { RequestHandler } from './__types';

const { ASC, DESC } = SORT_DIRECTION;

export const get: RequestHandler = async () => {
  const { artist, page, perPage, sort, studio, title } = {
    artist: '',
    page: 1,
    perPage: 25,
    sort: '',
    studio: '',
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
