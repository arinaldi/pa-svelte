<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import { user } from '$lib/sessionStore';
  import { supabase } from '$lib/supabase';
  import '../app.css';

  user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user ?? null);
  });
</script>

<Navbar />
<main>
  <slot />
</main>
