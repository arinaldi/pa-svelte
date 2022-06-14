import { supabase } from '$lib/supabase';

import type { Release } from '$lib/types';
import type { RequestHandler } from './__types';

export const get: RequestHandler = async () => {
  const { data: releases, error } = await supabase
    .from<Release>('releases')
    .select('*')
    .order('artist', { ascending: true });

  if (error) {
    return {
      body: { error },
    };
  }

  return {
    body: { releases },
  };
};
