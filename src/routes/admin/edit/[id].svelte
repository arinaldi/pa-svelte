<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit';

  import { supabase } from '$lib/supabase';
  import { ROUTE_HREF } from '$lib/constants';

  export async function load({ props }: LoadEvent) {
    if (!supabase.auth.user()) {
      return {
        status: 302,
        redirect: ROUTE_HREF.TOP_ALBUMS,
      };
    }

    return { props };
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import AlbumForm from '$lib/components/AlbumForm.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import { ROUTES_ADMIN } from '$lib/constants';

  import type { Album } from '$lib/types';

  export let album: Album;
  let isSubmitting = false;

  async function onSubmit() {
    try {
      isSubmitting = true;

      const { error } = await supabase
        .from<Album>('albums')
        .update(album)
        .eq('id', album.id);

      if (error) throw error;

      goto(`${ROUTES_ADMIN.base.href}${$page.url.search}`);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Perfect Albums | Edit Album</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">
    {ROUTES_ADMIN.edit.label}
  </span>
  <AlbumForm {album} {isSubmitting} {onSubmit} />
</Layout>
