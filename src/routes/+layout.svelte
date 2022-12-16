<script lang="ts">
  import { onMount } from 'svelte';
  import nProgress from 'nprogress';
  import { Toaster } from 'svelte-french-toast';
  import { invalidate } from '$app/navigation';
  import { navigating } from '$app/stores';

  import Navbar from '$lib/components/Navbar.svelte';
  import { supabaseClient } from '$lib/db';
  import '../app.css';
  import '../nprogress.css';

  onMount(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(() => {
      invalidate('supabase:auth');
    });

    return () => {
      subscription.unsubscribe();
    };
  });

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

<Toaster />
<main>
  <Navbar />
  <slot />
</main>
