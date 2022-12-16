import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { Album } from '$lib/types';

export const load: PageServerLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event);
  const { data, error } = await supabaseClient
    .from('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });
  const favorites: Album[] = data ?? [];

  if (error) {
    return fail(500, { error: error.message });
  }

  return { favorites };
};
