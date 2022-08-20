import cookie from 'cookie';
import type { Session, User } from '@supabase/supabase-js';

import { supabase } from '$lib/supabase';
import type { LayoutServerLoad } from './$types';

interface Payload {
  session: Session | null;
  user: User | null;
}

export const load: LayoutServerLoad = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const payload: Payload = {
    session: null,
    user: null,
  };

  if (!cookieHeader) return payload;

  const token = cookie.parse(cookieHeader)['sb-access-token'];

  if (!token) return payload;

  const { error, user } = await supabase.auth.api.getUser(token);

  if (error) return payload;

  payload.session = supabase.auth.session();
  payload.user = user;
  return payload;
};
