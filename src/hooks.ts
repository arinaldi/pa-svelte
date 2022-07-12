import { handleAuth } from '@supabase/auth-helpers-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import type { GetSession, Handle } from '@sveltejs/kit';

import { ROUTE_HREF } from '$lib/constants';

export const handle: Handle = sequence(
  ...handleAuth({
    logout: { returnTo: ROUTE_HREF.TOP_ALBUMS },
  }),
);

export const getSession: GetSession = async (event) => {
  const { accessToken, error, user } = event.locals;

  return {
    accessToken,
    error,
    user,
  };
};
