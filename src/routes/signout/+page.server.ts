import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Actions } from './$types';

import { ROUTE_HREF } from '$lib/constants';

export const actions: Actions = {
  default: async (event) => {
    const { supabaseClient } = await getSupabase(event);
    await supabaseClient.auth.signOut();
    throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
  },
};
