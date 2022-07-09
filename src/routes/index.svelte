<script context="module" lang="ts">
  import { ROUTE_HREF } from '$lib/constants';

  export async function load() {
    return {
      status: 302,
      redirect: ROUTE_HREF.TOP_ALBUMS,
    };
  }
</script>
