<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import CancelButton from '$lib/components/CancelButton.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Input from '$lib/components/Input.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import { ROUTES_ADMIN } from '$lib/constants';

  import type { AlbumInput } from '$lib/types';

  export let album: AlbumInput;
  export let isSubmitting: boolean;
  export let onSubmit: any = null;

  function onCancel() {
    goto(`${ROUTES_ADMIN.base.href}${$page.url.search}`);
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <div class="bg-white p-6 dark:bg-gray-800">
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
  <div class="flex items-center justify-end p-6">
    <CancelButton onClick={onCancel} />
    <span class="ml-1" />
    <SubmitButton {isSubmitting} />
  </div>
</form>
