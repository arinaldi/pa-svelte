<script lang="ts">
  import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
  import nProgress from 'nprogress';

  import { navigating, page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import { session } from '$lib/session';
  import { supabase as supabaseClient } from '$lib/supabase';
  import '../app.css';
  import '../nprogress.css';

  $: {
    const isSameRoute = $navigating?.from.pathname === $navigating?.to.pathname;

    if (nProgress && $navigating && !isSameRoute) {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }

  $: $session = $page.data.session;
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
