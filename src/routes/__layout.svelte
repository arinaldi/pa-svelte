<script lang="ts">
  import nProgress from 'nprogress';

  import { navigating } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import { user } from '$lib/sessionStore';
  import { supabase } from '$lib/supabase';
  import '../app.css';
  import '../nprogress.css';

  user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user ?? null);
  });

  $: {
    const isSameRoute = $navigating?.from.pathname === $navigating?.to.pathname;

    if ($navigating && !isSameRoute) {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }
</script>

<Navbar />
<slot />
