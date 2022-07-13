import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from '@sveltejs/kit';
import type { Album } from '$lib/types';

export const get: RequestHandler = async ({ request }) => {
  const { data: favorites, error } = await supabaseServerClient(request)
    .from<Album>('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  if (error) {
    return {
      body: { error },
    };
  }

  return {
    body: { favorites },
  };
};
