import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { type Action, error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTE_HREF } from '$lib/constants';
import type { Release } from '$lib/types';

export const load: PageServerLoad = async ({ request }) => {
  const { data: releases, error: supaError } = await supabaseServerClient(
    request,
  )
    .from<Release>('releases')
    .select('*')
    .order('artist', { ascending: true });

  if (supaError) {
    throw error(500, supaError.message);
  }

  return { releases };
};

export const POST: Action = async ({ request }) => {
  const formData = await request.formData();
  const artist = formData.get('artist');
  const title = formData.get('title');
  const date = formData.get('date');

  if (typeof artist !== 'string' || artist.length === 0) {
    throw error(400, 'Artist is required');
  }

  if (typeof title !== 'string' || title.length === 0) {
    throw error(400, 'Title is required');
  }

  const { error: supaError } = await supabaseServerClient(request)
    .from<Release>('releases')
    .insert([
      {
        artist,
        title,
        date: typeof date === 'string' && date.length ? date : null,
      },
    ]);

  if (supaError) {
    throw error(500, supaError.message);
  }

  throw redirect(303, ROUTE_HREF.NEW_RELEASES);
};

export const PUT: Action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const artist = formData.get('artist');
  const title = formData.get('title');
  const date = formData.get('date');

  if (!id || typeof id !== 'string') {
    throw error(400, 'ID is required');
  }

  if (typeof artist !== 'string' || artist.length === 0) {
    throw error(400, 'Artist is required');
  }

  if (typeof title !== 'string' || title.length === 0) {
    throw error(400, 'Title is required');
  }

  const { error: supaError } = await supabaseServerClient(request)
    .from<Release>('releases')
    .update({
      artist,
      title,
      date: typeof date === 'string' && date.length ? date : null,
    })
    .eq('id', id);

  if (supaError) {
    throw error(500, supaError.message);
  }

  throw redirect(303, ROUTE_HREF.NEW_RELEASES);
};

export const DELETE: Action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  if (!id || typeof id !== 'string') {
    throw error(400, 'ID is required');
  }

  const { error: supaError } = await supabaseServerClient(request)
    .from<Release>('releases')
    .delete()
    .eq('id', id);

  if (supaError) {
    throw error(500, supaError.message);
  }

  throw redirect(303, ROUTE_HREF.NEW_RELEASES);
};
