<script lang="ts">
  import toast from 'svelte-french-toast';
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import Button from '$lib/components/Button.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Input from '$lib/components/Input.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import { MESSAGES, ROUTES_ADMIN } from '$lib/constants';

  import type { AlbumInput } from '$lib/types';

  export let album: AlbumInput;
  let isSubmitting = false;

  function onBack() {
    goto(`${ROUTES_ADMIN.base.href}${$page.url.search}`);
  }

  const onSubmit: SubmitFunction = ({ action }) => {
    let suffix = 'created';
    isSubmitting = true;

    if (action.pathname.includes('edit')) {
      suffix = 'edited';
    }

    return async ({ result }) => {
      switch (result.type) {
        case 'redirect': {
          onBack();
          toast.success(`${MESSAGES.ALBUM_PREFIX} ${suffix}`);
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

<form method="post" use:enhance={onSubmit}>
  <div class="bg-white dark:bg-gray-800">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Input
        bind:value={album.artist}
        id="artist"
        required
        type="text"
        wrapperClass="order-1 sm:order-1"
      />
      <Input
        bind:value={album.title}
        id="title"
        required
        type="text"
        wrapperClass="order-2 sm:order-3"
      />
      <Input
        bind:value={album.year}
        id="year"
        required
        type="text"
        wrapperClass="order-3 sm:order-5"
      />
      <Checkbox
        bind:checked={album.studio}
        id="studio"
        label="Studio Album"
        wrapperClass="order-4 sm:order-2"
      />
      <Checkbox
        bind:checked={album.cd}
        id="cd"
        label="CD"
        wrapperClass="order-5 sm:order-4"
      />
      <Checkbox
        bind:checked={album.favorite}
        id="favorite"
        label="Favorite"
        wrapperClass="order-6 sm:order-6"
      />
    </div>
  </div>
  <div class="mt-8 flex items-center gap-2">
    <Button onClick={onBack}>Cancel</Button>
    <SubmitButton {isSubmitting} />
  </div>
</form>
