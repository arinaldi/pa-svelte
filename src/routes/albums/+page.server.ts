import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event);
  const { data: favorites, error } = await supabaseClient
    .from('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  if (error) {
    return fail(500, { error: error.message });
  }

  return { favorites };
};
