<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit';
  import { ROUTE_HREF } from '$lib/constants';

  export async function load({ session }: LoadEvent) {
    if (!session.user) {
      return {
        status: 302,
        redirect: ROUTE_HREF.TOP_ALBUMS,
      };
    }

    return {};
  }
</script>

<slot />
