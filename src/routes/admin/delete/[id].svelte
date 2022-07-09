<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CancelButton from '$lib/components/CancelButton.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import { ROUTES_ADMIN } from '$lib/constants';

  import type { Album } from '$lib/types';

  export let album: Album;
  let isSubmitting = false;

  function onCancel() {
    goto(`${ROUTES_ADMIN.base.href}${$page.url.search}`);
  }

  async function onSubmit() {
    try {
      isSubmitting = true;

      const { error } = await supabase
        .from<Album>('albums')
        .delete()
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
  <title>Perfect Albums | Delete Album</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">
    {ROUTES_ADMIN.delete.label}
  </span>
  <div class="relative flex-auto">
    <div class="bg-white p-6 dark:bg-gray-800 dark:text-white">
      Are you sure you want to delete {album.artist} – {album.title}?
    </div>
    <form
      class="flex items-center justify-end p-6"
      on:submit|preventDefault={onSubmit}
    >
      <CancelButton onClick={onCancel} />
      <span class="ml-1" />
      <SubmitButton {isSubmitting} />
    </form>
  </div>
</Layout>
