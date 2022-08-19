import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from '@sveltejs/kit';

import { SORT_DIRECTION } from '$lib/constants';
import { parsePageQuery, parsePerPageQuery, parseQuery } from '$lib/utils';
import type { Album } from '$lib/types';

const { ASC, DESC } = SORT_DIRECTION;

export const GET: RequestHandler = async ({ request, url }) => {
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

  const { data: albums, count, error } = await query;

  if (error) {
    return {
      body: { error },
    };
  }

  const { count: cdCount, error: cdError } = await supabaseServerClient(request)
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

export const POST: RequestHandler = async ({ request, url }) => {
  const formData = await request.formData();
  const artist = formData.get('artist');
  const title = formData.get('title');
  const year = formData.get('year');
  const cd = formData.get('cd');
  const favorite = formData.get('favorite');
  const studio = formData.get('studio');

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
    return {
      body: { error },
      status: 500,
    };
  }

  return {
    headers: { location: url.href },
    status: 303,
  };
};
