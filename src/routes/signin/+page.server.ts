import { type Action, error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { APP_URL, ROUTE_HREF, ROUTES_ADMIN } from '$lib/constants';
import { supabase } from '$lib/supabase';
import { isEmailValid } from '$lib/utils';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (user) {
    throw redirect(303, ROUTES_ADMIN.base.href);
  }

  return {};
};

export const POST: Action = async ({ request, setHeaders, url }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || !isEmailValid(email)) {
    throw error(400, 'Email is invalid');
  }

  if (typeof password !== 'string' || password.length === 0) {
    throw error(400, 'Password is required');
  }

  const errors: Record<string, unknown> = {};
  const values: Record<string, string> = { email, password };
  const headers = { 'Set-Cookie': '' };
  let location: string = ROUTE_HREF.SIGNIN;

  const { error: supaError, session } = await supabase.auth.signIn({
    email,
    password,
  });

  if (supaError) {
    errors.form = supaError.message;
    errors.values = values;
    return { errors, status: 400 };
  }

  if (session) {
    const BASE_URL =
      process.env.NODE_ENV === 'production'
        ? APP_URL
        : `http://localhost:${url.port}`;

    try {
      const res = await fetch(`${BASE_URL}/api/auth/callback`, {
        body: JSON.stringify({ event: 'SIGNED_IN', session }),
        credentials: 'same-origin',
        headers: new Headers({
          accept: 'application/json',
          'content-type': 'application/json',
        }),
        method: 'POST',
      });

      const cookies = res.headers.get('set-cookie');

      if (!cookies) {
        errors.form = 'Error with cookies';
        return { errors, status: 400 };
      }

      cookies.split('SameSite=Lax, ').map((cookie) => {
        if (!cookie.includes('SameSite=Lax')) {
          cookie += 'SameSite=Lax';
        }
        return cookie;
      });

      headers['Set-Cookie'] = cookies;
      location = ROUTES_ADMIN.base.href;
    } catch (err) {
      errors.form = err instanceof Error ? err.message : 'Something went wrong';
      return { errors, status: 400 };
    }
  }

  setHeaders(headers);
  return { location };
};
