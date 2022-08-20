import { supabase } from '$lib/supabase';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) return {};

  return {
    accessToken: locals.accessToken,
    error: locals.error,
    session: supabase.auth.session(),
    user: locals.user,
  };
};
