<script lang="ts">
  import toast from 'svelte-french-toast';
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  import Button from '$lib/components/Button.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import { MESSAGES, ROUTES_ADMIN } from '$lib/constants';
  import type { Album } from '$lib/types';

  export let data: PageData;
  $: album = data.album as Album;
  let isSubmitting = false;

  function onBack() {
    goto(`${ROUTES_ADMIN.base.href}${$page.url.search}`);
  }

  const onSubmit: SubmitFunction = () => {
    isSubmitting = true;

    return async ({ result }) => {
      switch (result.type) {
        case 'redirect': {
          onBack();
          toast.success(`${MESSAGES.ALBUM_PREFIX} deleted`);
          break;
        }
        case 'error': {
          toast.error(result.error?.message ?? MESSAGES.ERROR);
          break;
        }
        case 'failure': {
          toast.error(result.data?.error ?? MESSAGES.ERROR);
          break;
        }
        default:
          await applyAction(result);
      }

      isSubmitting = false;
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
      class="mt-8 flex items-center gap-2"
      method="post"
      use:enhance={onSubmit}
    >
      <Button onClick={onBack}>Cancel</Button>
      <SubmitButton {isSubmitting} />
    </form>
  </div>
</Layout>
