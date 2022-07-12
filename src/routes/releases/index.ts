import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from '@sveltejs/kit';

import { ROUTE_HREF } from '$lib/constants';
import type { Release } from '$lib/types';

export const get: RequestHandler = async ({ request }) => {
  const { data: releases, error } = await supabaseServerClient(request)
    .from<Release>('releases')
    .select('*')
    .order('artist', { ascending: true });

  if (error) {
    return {
      body: { error },
    };
  }

  return {
    body: { releases },
  };
};

export const post: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const artist = formData.get('artist');
  const title = formData.get('title');
  const date = formData.get('date');

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

  const { error } = await supabaseServerClient(request)
    .from<Release>('releases')
    .insert([
      {
        artist,
        title,
        date: typeof date === 'string' && date.length ? date : null,
      },
    ]);

  if (error) {
    return {
      body: { error },
      status: 500,
    };
  }

  return {
    headers: { location: ROUTE_HREF.NEW_RELEASES },
    status: 303,
  };
};

export const put: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const artist = formData.get('artist');
  const title = formData.get('title');
  const date = formData.get('date');

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

  const { error } = await supabaseServerClient(request)
    .from<Release>('releases')
    .update({
      artist,
      title,
      date: typeof date === 'string' && date.length ? date : null,
    })
    .eq('id', id);

  if (error) {
    return {
      body: { error },
      status: 500,
    };
  }

  return {
    headers: { location: ROUTE_HREF.NEW_RELEASES },
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
    .from<Release>('releases')
    .delete()
    .eq('id', id);

  if (error) {
    return {
      body: { error },
      status: 500,
    };
  }

  return {
    headers: { location: ROUTE_HREF.NEW_RELEASES },
    status: 303,
  };
};
