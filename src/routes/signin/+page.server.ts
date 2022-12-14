import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';

import { ROUTE_HREF, ROUTES_ADMIN } from '$lib/constants';

export const load: PageServerLoad = async (event) => {
  const { session } = await getSupabase(event);

  if (session) {
    throw redirect(303, ROUTES_ADMIN.base.href);
  }

  return {};
};

export const actions: Actions = {
  signIn: async (event) => {
    const { session, supabaseClient } = await getSupabase(event);

    if (session) {
      throw redirect(303, ROUTES_ADMIN.base.href);
    }

    const formData = await event.request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, { email, error: 'Invalid credentials' });
      }

      return fail(500, { email, error: 'Something went wrong' });
    }

    throw redirect(303, ROUTES_ADMIN.base.href);
  },
  signOut: async (event) => {
    const { supabaseClient } = await getSupabase(event);
    await supabaseClient.auth.signOut();
    throw redirect(303, ROUTE_HREF.TOP_ALBUMS);
  },
};
