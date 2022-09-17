import { handleAuth } from '@supabase/auth-helpers-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

import { ROUTE_HREF } from '$lib/constants';

export const handle: Handle = sequence(
  ...handleAuth({
    logout: { returnTo: ROUTE_HREF.TOP_ALBUMS },
  }),
);
