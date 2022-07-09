import { supabase } from '$lib/supabase';

import type { RequestHandler } from '@sveltejs/kit';
import type { Album } from '$lib/types';

export const get: RequestHandler = async () => {
  const { data: favorites, error } = await supabase
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
