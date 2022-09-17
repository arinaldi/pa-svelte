import { type Actions, invalid, redirect } from '@sveltejs/kit';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { PageServerLoad } from './$types';

import { ROUTE_HREF } from '$lib/constants';
import type { Release } from '$lib/types';

export const load: PageServerLoad = async ({ request }) => {
  const { data: releases, error } = await supabaseServerClient(request)
    .from<Release>('releases')
    .select('*')
    .order('artist', { ascending: true });

  if (error) {
    return invalid(500, { general: error.message });
  }

  return { releases };
};

export const actions: Actions = {
  createRelease: async ({ locals, request }) => {
    if (!locals.user) {
      return invalid(404, { general: 'Not authorized' });
    }

    const formData = await request.formData();
    const artist = formData.get('artist');
    const title = formData.get('title');
    const date = formData.get('date');

    if (typeof artist !== 'string' || artist.length === 0) {
      return invalid(400, { artist: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return invalid(400, { title: 'Title is required' });
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
      return invalid(500, { general: error.message });
    }

    throw redirect(303, ROUTE_HREF.NEW_RELEASES);
  },
  editRelease: async ({ locals, request }) => {
    if (!locals.user) {
      return invalid(404, { general: 'Not authorized' });
    }

    const formData = await request.formData();
    const id = formData.get('id');
    const artist = formData.get('artist');
    const title = formData.get('title');
    const date = formData.get('date');

    if (!id || typeof id !== 'string') {
      return invalid(400, { general: 'ID is required' });
    }

    if (typeof artist !== 'string' || artist.length === 0) {
      return invalid(400, { artist: 'Artist is required' });
    }

    if (typeof title !== 'string' || title.length === 0) {
      return invalid(400, { title: 'Title is required' });
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
      return invalid(500, { general: error.message });
    }

    throw redirect(303, ROUTE_HREF.NEW_RELEASES);
  },
  deleteRelease: async ({ locals, request }) => {
    if (!locals.user) {
      return invalid(404, { general: 'Not authorized' });
    }

    const formData = await request.formData();
    const id = formData.get('id');

    if (!id || typeof id !== 'string') {
      return invalid(400, { general: 'ID is required' });
    }

    const { error } = await supabaseServerClient(request)
      .from<Release>('releases')
      .delete()
      .eq('id', id);

    if (error) {
      return invalid(500, { general: error.message });
    }

    throw redirect(303, ROUTE_HREF.NEW_RELEASES);
  },
};
