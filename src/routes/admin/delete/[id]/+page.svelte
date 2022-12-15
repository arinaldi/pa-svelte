<script lang="ts">
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import { goto, invalidate } from '$app/navigation';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  import Button from '$lib/components/Button.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import { ROUTES_ADMIN } from '$lib/constants';

  export let data: PageData;
  $: ({ album } = data);
  let isSubmitting = false;

  function onBack() {
    goto(`${ROUTES_ADMIN.base.href}${$page.url.search}`);
  }

  const onSubmit: SubmitFunction = () => {
    isSubmitting = true;

    return async ({ result }) => {
      if (result.type === 'redirect') {
        // do not invalidate, resource is deleted
      } else {
        await applyAction(result);
      }

      isSubmitting = false;
      onBack();
    };
  };
</script>

<svelte:head>
  <title>Perfect Albums | Delete Album</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout maxWidth="max-w-4xl">
  <span slot="title">
    {ROUTES_ADMIN.delete.label}
  </span>
  <div class="relative flex-auto">
    <div class="bg-white dark:bg-gray-800 dark:text-white">
      Are you sure you want to delete {album.artist} – {album.title}?
    </div>
    <form
      class="flex items-center mt-8 gap-2"
      method="post"
      use:enhance={onSubmit}
    >
      <Button onClick={onBack}>Cancel</Button>
      <SubmitButton {isSubmitting} />
    </form>
  </div>
</Layout>
