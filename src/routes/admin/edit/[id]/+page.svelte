<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  import AlbumForm from '$lib/components/AlbumForm.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import { ROUTES_ADMIN } from '$lib/constants';

  export let data: PageData;
  $: ({ album } = data);
</script>

<svelte:head>
  <title>Perfect Albums | Edit Album</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">
    {ROUTES_ADMIN.edit.label}
  </span>
  <AlbumForm
    action={`/admin/edit/${album.id}${$page.url.search}&_method=put`}
    {album}
  />
</Layout>
