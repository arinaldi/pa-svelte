import cookie from 'cookie';
import { supabase } from '$lib/supabase';
import type { LayoutServerLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: LayoutServerLoad = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');

  if (!cookieHeader) {
    return { user: null };
  }

  const token = cookie.parse(cookieHeader)['sb-access-token'];

  if (!token) {
    return { user: null };
  }

  const { error, user } = await supabase.auth.api.getUser(token);
  const session = supabase.auth.session();
  // console.log({ session });

  if (error) {
    return { user: null };
  }

  return { session, user };
};
