import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTE_HREF } from '$lib/constants';
import type { Song } from '$lib/types';

export const load: PageServerLoad = async (event) => {
  const { supabaseClient, session } = await getSupabase(event);
  const { data, error } = await supabaseClient
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });
  const songs: Song[] = data ?? [];

  if (error) {
    return fail(500, { error: error.message });
  }

  return { songs, user: session?.user };
};

export const actions: Actions = {
  createSong: async (event) => {
    const { supabaseClient, session } = await getSupabase(event);

    if (!session) {
      return fail(401, { general: 'Not authorized' });
    }

    const formData = await event.request.formData();
    const artist = formData.get('artist');
    const title = formData.get('title');
    const link = formData.get('link');

    if (typeof artist !== 'string' || artist.length === 0) {
      return fail(400, { error: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return fail(400, { error: 'Title is required' });
    }

    if (typeof link !== 'string' || !link.startsWith('http')) {
      return fail(400, { error: 'Link is invalid' });
    }

    const { error } = await supabaseClient
      .from('songs')
      .insert([{ artist, title, link }]);

    if (error) {
      return fail(500, { general: error.message });
    }

    throw redirect(303, ROUTE_HREF.FEATURED_SONGS);
  },
  deleteSong: async (event) => {
    const { supabaseClient, session } = await getSupabase(event);

    if (!session) {
      return fail(401, { error: 'Not authorized' });
    }

    const formData = await event.request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { error: 'ID is required' });
    }

    const { error } = await supabaseClient.from('songs').delete().eq('id', id);

    if (error) {
      return fail(500, { general: error.message });
    }

    throw redirect(303, ROUTE_HREF.FEATURED_SONGS);
  },
};
