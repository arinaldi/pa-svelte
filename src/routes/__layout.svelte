<script lang="ts">
  import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
  import nProgress from 'nprogress';

  import { navigating, session } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
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
</script>

<SupaAuthHelper {supabaseClient} {session}>
  <Navbar />
  <slot />
</SupaAuthHelper>
