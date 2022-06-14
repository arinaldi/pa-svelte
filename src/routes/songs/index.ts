import { supabase } from '$lib/supabase';

import type { Song } from '$lib/types';
import type { RequestHandler } from './__types';

export const get: RequestHandler = async () => {
  const { data: songs, error } = await supabase
    .from<Song>('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return {
      body: { error },
    };
  }

  return {
    body: { songs },
  };
};
