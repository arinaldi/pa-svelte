import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from '@sveltejs/kit';

import { ROUTE_HREF } from '$lib/constants';
import type { Song } from '$lib/types';

export const get: RequestHandler = async ({ request }) => {
  const { data: songs, error } = await supabaseServerClient(request)
    .from<Song>('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return {
      body: { error },
    };
  }

  return {
    body: { songs },
  };
};

export const post: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const artist = formData.get('artist');
  const title = formData.get('title');
  const link = formData.get('link');

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

  if (typeof link !== 'string' || !link.startsWith('http')) {
    return {
      body: { errors: { link: 'Link is invalid' } },
      status: 400,
    };
  }

  const { error } = await supabaseServerClient(request)
    .from<Song>('songs')
    .insert([{ artist, title, link }]);

  if (error) {
    return {
      body: { error },
      status: 500,
    };
  }

  return {
    headers: { location: ROUTE_HREF.FEATURED_SONGS },
    status: 303,
  };
};

export const del: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  if (!id || typeof id !== 'string') {
    return {
      body: { errors: { id: 'ID is required' } },
      status: 400,
    };
  }

  const { error } = await supabaseServerClient(request)
    .from<Song>('songs')
    .delete()
    .eq('id', id);

  if (error) {
    return {
      body: { error },
      status: 500,
    };
  }

  return {
    headers: { location: ROUTE_HREF.FEATURED_SONGS },
    status: 303,
  };
};
