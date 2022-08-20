import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { type Action, error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTE_HREF } from '$lib/constants';
import type { Song } from '$lib/types';

export const load: PageServerLoad = async ({ request }) => {
  const { data: songs, error: supaError } = await supabaseServerClient(request)
    .from<Song>('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (supaError) {
    throw error(500, supaError.message);
  }

  return { songs };
};

export const POST: Action = async ({ request }) => {
  const formData = await request.formData();
  const artist = formData.get('artist');
  const title = formData.get('title');
  const link = formData.get('link');

  if (typeof artist !== 'string' || artist.length === 0) {
    throw error(400, 'Artist is required');
  }

  if (typeof title !== 'string' || title.length === 0) {
    throw error(400, 'Title is required');
  }

  if (typeof link !== 'string' || !link.startsWith('http')) {
    throw error(400, 'Link is invalid');
  }

  const { error: supaError } = await supabaseServerClient(request)
    .from<Song>('songs')
    .insert([{ artist, title, link }]);

  if (supaError) {
    throw error(500, supaError.message);
  }

  throw redirect(303, ROUTE_HREF.FEATURED_SONGS);
};

export const DELETE: Action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');

  if (!id || typeof id !== 'string') {
    throw error(400, 'ID is required');
  }

  const { error: supaError } = await supabaseServerClient(request)
    .from<Song>('songs')
    .delete()
    .eq('id', id);

  if (supaError) {
    throw error(500, supaError.message);
  }

  throw redirect(303, ROUTE_HREF.FEATURED_SONGS);
};
