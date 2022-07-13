import type { RequestHandler } from '@sveltejs/kit';

import { APP_URL, ROUTE_HREF, ROUTES_ADMIN } from '$lib/constants';
import { supabase } from '$lib/supabase';
import { isEmailValid } from '$lib/utils';

export async function get({ locals }: { locals: App.Locals }) {
  if (locals.user) {
    return {
      status: 303,
      headers: { location: ROUTES_ADMIN.base.href },
    };
  }
  return {
    status: 200,
  };
}

export const post: RequestHandler = async ({ request, url }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || !isEmailValid(email)) {
    return {
      body: { errors: { email: 'Email is invalid' } },
      status: 400,
    };
  }

  if (typeof password !== 'string' || password.length === 0) {
    return {
      body: { errors: { password: 'Password is required' } },
      status: 400,
    };
  }

  const headers = {
    location: ROUTE_HREF.SIGNIN as string,
    'Set-Cookie': '',
  };
  const errors: Record<string, string> = {};
  const values: Record<string, string> = { email, password };

  const { error, session } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    errors.form = error.message;

    return {
      body: { errors, values },
      status: 400,
    };
  }

  if (session) {
    const BASE_URL =
      process.env.NODE_ENV === 'production'
        ? APP_URL
        : `http://0.0.0.0:${url.port}`;

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

        return {
          body: { errors, values },
          status: 400,
        };
      }

      cookies.split('SameSite=Lax, ').map((cookie) => {
        if (!cookie.includes('SameSite=Lax')) {
          cookie += 'SameSite=Lax';
        }
        return cookie;
      });

      headers.location = ROUTES_ADMIN.base.href;
      headers['Set-Cookie'] = cookies;
    } catch (error) {
      errors.form =
        error instanceof Error ? error.message : 'Something went wrong';

      return {
        body: { errors, values },
        status: 400,
      };
    }
  }

  return {
    headers,
    status: 303,
  };
};
