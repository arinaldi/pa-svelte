<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { SupaAuthHelper, type Session } from '@supabase/auth-helpers-svelte';
  import nProgress from 'nprogress';

  import { navigating, page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import { supabase as supabaseClient } from '$lib/supabase';
  import '../app.css';
  import '../nprogress.css';

  setContext('session', writable<Session>($page.data.session));
  const session = getContext<Writable<Session>>('session');

  $: {
    const isSameRoute =
      $navigating?.from?.url.pathname === $navigating?.to?.url.pathname;

    if (nProgress && $navigating && !isSameRoute) {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }
</script>

<svelte:head>
  <script lang="ts">
    const dark = 'dark';
    const root = window.document.documentElement;
    const prefersDark =
      !('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (localStorage.theme === dark || prefersDark) {
      root.classList.add(dark);
    } else {
      root.classList.remove(dark);
    }
  </script>
</svelte:head>

<SupaAuthHelper {supabaseClient} {session}>
  <Navbar />
  <slot />
</SupaAuthHelper>
