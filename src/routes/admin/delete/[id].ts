import { supabase } from '$lib/supabase';

import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import type { Album } from '$lib/types';

export const get: RequestHandler = async ({ params }: RequestEvent) => {
  const { data: album, error } = await supabase
    .from<Album>('albums')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return {
      body: { error },
    };
  }

  return {
    body: { album },
  };
};
