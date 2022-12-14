import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  const { supabaseClient } = await getSupabase(event);
  const { data: favorites, error } = await supabaseClient
    .from('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  if (error) {
    // return invalid(500, { general: error.message });
    console.log({ error });
  }

  return { favorites };
};
