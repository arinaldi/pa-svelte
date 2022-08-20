import { error } from '@sveltejs/kit';
import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { PageServerLoad } from './$types';

import type { Album } from '$lib/types';

export const load: PageServerLoad = async ({ request }) => {
  const { data: favorites, error: supaError } = await supabaseServerClient(
    request,
  )
    .from<Album>('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  if (supaError) {
    throw error(500, supaError.message);
  }

  return { favorites };
};
