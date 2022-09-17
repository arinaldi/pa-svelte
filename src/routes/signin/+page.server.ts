import { type Actions, invalid, redirect } from '@sveltejs/kit';
import cookie from 'cookie';
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

export const actions: Actions = {
  default: async ({ cookies, request, url }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || !isEmailValid(email)) {
      return invalid(400, { email, general: 'Email is invalid' });
    }

    if (typeof password !== 'string' || password.length === 0) {
      return invalid(400, { email, general: 'Password is required' });
    }

    let location: string = ROUTE_HREF.SIGNIN;

    const { error, session } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      return invalid(400, { email, general: error.message });
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

        const cookieString = res.headers.get('set-cookie');

        if (!cookieString) {
          return invalid(400, { general: 'Error with cookies' });
        }

        const accessKey = 'sb-access-token';
        const refreshKey = 'sb-refresh-token';
        const index = cookieString.indexOf(refreshKey);

        const accessToken = cookieString.substring(0, index - 2);
        const refreshToken = cookieString.substring(index);
        const parsedAccessToken = cookie.parse(accessToken);
        const parsedRefreshToken = cookie.parse(refreshToken);
        location = ROUTES_ADMIN.base.href;

        cookies.set(accessKey, parsedAccessToken[accessKey], {
          maxAge: parseInt(parsedAccessToken['Max-Age']),
          path: parsedAccessToken.Path,
          expires: new Date(parsedAccessToken.Expires),
          httpOnly: true,
          sameSite: 'lax',
        });
        cookies.set(refreshKey, parsedRefreshToken[refreshKey], {
          maxAge: parseInt(parsedRefreshToken['Max-Age']),
          path: parsedRefreshToken.Path,
          expires: new Date(parsedRefreshToken.Expires),
          httpOnly: true,
          sameSite: 'lax',
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong';
        return invalid(400, { general: message });
      }
    }

    throw redirect(303, location);
  },
};
