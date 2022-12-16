<script lang="ts">
  import type { PageData } from './$types';

  import AlbumForm from '$lib/components/AlbumForm.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import { ROUTES_ADMIN } from '$lib/constants';
  import type { AlbumInput } from '$lib/types';

  export let data: PageData;
  $: album = data.album as AlbumInput;
</script>

<svelte:head>
  <title>Perfect Albums | Edit Album</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout maxWidth="max-w-4xl">
  <span slot="title">
    {ROUTES_ADMIN.edit.label}
  </span>
  <AlbumForm {album} />
</Layout>
