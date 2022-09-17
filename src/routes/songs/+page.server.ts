import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { type Actions, invalid, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTE_HREF } from '$lib/constants';
import type { Song } from '$lib/types';

export const load: PageServerLoad = async ({ request }) => {
  const { data: songs, error } = await supabaseServerClient(request)
    .from<Song>('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return invalid(500, { general: error.message });
  }

  return { songs };
};

export const actions: Actions = {
  createSong: async ({ locals, request }) => {
    if (!locals.user) {
      return invalid(404, { general: 'Not authorized' });
    }

    const formData = await request.formData();
    const artist = formData.get('artist');
    const title = formData.get('title');
    const link = formData.get('link');

    if (typeof artist !== 'string' || artist.length === 0) {
      return invalid(400, { artist: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return invalid(400, { title: 'Title is required' });
    }

    if (typeof link !== 'string' || !link.startsWith('http')) {
      return invalid(400, { link: 'Link is invalid' });
    }

    const { error } = await supabaseServerClient(request)
      .from<Song>('songs')
      .insert([{ artist, title, link }]);

    if (error) {
      return invalid(500, { general: error.message });
    }

    throw redirect(303, ROUTE_HREF.FEATURED_SONGS);
  },
  deleteSong: async ({ locals, request }) => {
    if (!locals.user) {
      return invalid(404, { general: 'Not authorized' });
    }

    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return invalid(400, { general: 'ID is required' });
    }

    const { error } = await supabaseServerClient(request)
      .from<Song>('songs')
      .delete()
      .eq('id', id);

    if (error) {
      return invalid(500, { general: error.message });
    }

    throw redirect(303, ROUTE_HREF.FEATURED_SONGS);
  },
};
