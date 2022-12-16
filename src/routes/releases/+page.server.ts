import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { ROUTE_HREF } from '$lib/constants';
import type { Release } from '$lib/types';

export const load: PageServerLoad = async (event) => {
  const { supabaseClient, session } = await getSupabase(event);
  const { data, error } = await supabaseClient
    .from('releases')
    .select('*')
    .order('artist', { ascending: true });
  const releases: Release[] = data ?? [];

  if (error) {
    return fail(500, { general: error.message });
  }

  return { releases, user: session?.user };
};

export const actions: Actions = {
  createRelease: async (event) => {
    const { supabaseClient, session } = await getSupabase(event);

    if (!session) {
      return fail(401, { error: 'Not authorized' });
    }

    const formData = await event.request.formData();
    const artist = formData.get('artist');
    const title = formData.get('title');
    const date = formData.get('date');

    if (typeof artist !== 'string' || artist.length === 0) {
      return fail(400, { error: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return fail(400, { error: 'Title is required' });
    }

    const { error } = await supabaseClient.from('releases').insert([
      {
        artist,
        title,
        date: typeof date === 'string' && date.length ? date : null,
      },
    ]);

    if (error) {
      return fail(500, { error: error.message });
    }

    throw redirect(303, ROUTE_HREF.NEW_RELEASES);
  },
  editRelease: async (event) => {
    const { supabaseClient, session } = await getSupabase(event);

    if (!session) {
      return fail(401, { general: 'Not authorized' });
    }

    const formData = await event.request.formData();
    const id = formData.get('id');
    const artist = formData.get('artist');
    const title = formData.get('title');
    const date = formData.get('date');

    if (!id || typeof id !== 'string') {
      return fail(400, { error: 'ID is required' });
    }

    if (typeof artist !== 'string' || artist.length === 0) {
      return fail(400, { error: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return fail(400, { error: 'Title is required' });
    }

    const { error } = await supabaseClient
      .from('releases')
      .update({
        artist,
        title,
        date: typeof date === 'string' && date.length ? date : null,
      })
      .eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    throw redirect(303, ROUTE_HREF.NEW_RELEASES);
  },
  deleteRelease: async (event) => {
    const { supabaseClient, session } = await getSupabase(event);

    if (!session) {
      return fail(401, { error: 'Not authorized' });
    }

    const formData = await event.request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return fail(400, { error: 'ID is required' });
    }

    const { error } = await supabaseClient
      .from('releases')
      .delete()
      .eq('id', id);

    if (error) {
      return fail(500, { error: error.message });
    }

    throw redirect(303, ROUTE_HREF.NEW_RELEASES);
  },
};
