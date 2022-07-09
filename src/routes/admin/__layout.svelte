<script context="module" lang="ts">
  import { supabase } from '$lib/supabase';
  import { ROUTE_HREF } from '$lib/constants';

  export async function load() {
    if (!supabase.auth.user()) {
      return {
        status: 302,
        redirect: ROUTE_HREF.TOP_ALBUMS,
      };
    }

    return {};
  }
</script>

<slot />
