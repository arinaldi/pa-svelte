<script lang="ts">
  import { page } from '$app/stores';
  import AlbumForm from '$lib/components/AlbumForm.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import { ROUTES_ADMIN } from '$lib/constants';

  const album = {
    artist: '',
    title: '',
    year: new Date().getFullYear().toString(),
    studio: false,
    cd: false,
    favorite: false,
  };
</script>

<svelte:head>
  <title>Perfect Albums | Create Album</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">
    {ROUTES_ADMIN.create.label}
  </span>
  <AlbumForm action={`/admin${$page.url.search}`} {album} />
</Layout>
