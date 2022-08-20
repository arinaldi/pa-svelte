import { supabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { PageServerLoad } from '@sveltejs/kit';
import type { Album } from '$lib/types';

export const load: PageServerLoad = async ({ request }) => {
  const { data: favorites, error } = await supabaseServerClient(request)
    .from<Album>('albums')
    .select('*')
    .eq('favorite', true)
    .order('artist', { ascending: true });

  if (error) {
    return { error };
  }

  return { favorites };
};
