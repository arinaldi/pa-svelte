<script lang="ts">
  import { invalidate } from '$app/navigation';

  import Input from '$lib/components/Input.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { MODAL_TYPES } from '$lib/constants';
  import DocumentAddIcon from '$lib/icons/DocumentAddIcon.svelte';
  import PencilIcon from '$lib/icons/PencilIcon.svelte';
  import TrashIcon from '$lib/icons/TrashIcon.svelte';
  import { user } from '$lib/sessionStore';
  import { supabase } from '$lib/supabase';
  import { formatDate, formatReleases, sortByDate } from '$lib/utils';
  import type { ModalType, Release } from '$lib/types';

  export let releases: Release[];
  let modal: ModalType = { data: null, type: null };
  let artist = '';
  let title = '';
  let date = '';
  let isSubmitting = false;

  function onClose() {
    artist = '';
    title = '';
    date = '';
    modal = { data: null, type: null };
  }

  async function onCreate() {
    try {
      isSubmitting = true;

      const input = {
        artist,
        title,
        date: typeof date === 'string' && date.length ? date : null,
      };
      const { error } = await supabase
        .from<Release>('releases')
        .insert([input]);

      if (error) throw error;

      invalidate('/releases');
      onClose();
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      isSubmitting = false;
    }
  }

  async function onEdit() {
    if (!modal.data) return;

    try {
      isSubmitting = true;

      const input = {
        artist,
        title,
        date: typeof date === 'string' && date.length ? date : null,
      };
      const { error } = await supabase
        .from<Release>('releases')
        .update(input)
        .eq('id', modal.data.id);

      if (error) throw error;

      invalidate('/releases');
      onClose();
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      isSubmitting = false;
    }
  }

  async function onDelete() {
    if (!modal.data) return;

    try {
      isSubmitting = true;

      const { error } = await supabase
        .from<Release>('releases')
        .delete()
        .eq('id', modal.data.id);

      if (error) throw error;

      invalidate('/releases');
      onClose();
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Perfect Albums | New Releases</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">New Releases</span>
  <span slot="titleAction">
    {#if $user}
      <span
        class="rounded-md px-1 py-1.5 hover:bg-gray-100"
        on:click={() => {
          modal = { data: null, type: MODAL_TYPES.CREATE };
        }}
      >
        <DocumentAddIcon
          className="inline h-6 w-6 cursor-pointer dark:text-white"
        />
      </span>
    {/if}
  </span>
  <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {#each Object.entries(formatReleases(releases)).sort(sortByDate) as [releaseDate, items]}
      <div>
        <h4 class="text-xl font-semibold dark:text-white">{releaseDate}</h4>
        <ul class="ml-6 list-disc p-1">
          {#each items as item (item.id)}
            <li class="dark:text-white">
              <span>{item.artist} &ndash; {item.title}</span>
              {#if $user}
                <span
                  class="ml-1 p-1 hover:bg-gray-100 rounded-md cursor-pointer dark:text-white"
                  on:click={() => {
                    artist = item.artist;
                    title = item.title;
                    date = formatDate(item.date || '');
                    modal = { data: item, type: MODAL_TYPES.EDIT };
                  }}
                >
                  <PencilIcon className="inline h-4 w-4" />
                </span>
                <span
                  class="p-1 hover:bg-gray-100 rounded-md cursor-pointer dark:text-white"
                  on:click={() => {
                    modal = { data: item, type: MODAL_TYPES.DELETE };
                  }}
                >
                  <TrashIcon className="inline h-4 w-4" />
                </span>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  {#if modal.type === MODAL_TYPES.CREATE}
    <Modal {isSubmitting} {onClose} onSubmit={onCreate}>
      <span slot="title">Create Release</span>
      <div class="w-full" slot="body">
        <Input
          bind:value={artist}
          id="artist"
          required
          type="text"
          wrapperClass="mt-4"
        />
        <Input
          bind:value={title}
          id="title"
          required
          type="text"
          wrapperClass="mt-4"
        />
        <Input bind:value={date} id="date" type="date" wrapperClass="mt-4" />
      </div>
    </Modal>
  {:else if modal.type === MODAL_TYPES.EDIT && modal.data}
    <Modal {isSubmitting} {onClose} onSubmit={onEdit}>
      <span slot="title">Edit Release</span>
      <div class="w-full" slot="body">
        <Input
          bind:value={artist}
          id="artist"
          required
          type="text"
          wrapperClass="mt-4"
        />
        <Input
          bind:value={title}
          id="title"
          required
          type="text"
          wrapperClass="mt-4"
        />
        <Input bind:value={date} id="date" type="date" wrapperClass="mt-4" />
      </div>
    </Modal>
  {:else if modal.type === MODAL_TYPES.DELETE && modal.data}
    <Modal {isSubmitting} {onClose} onSubmit={onDelete}>
      <span slot="title">Delete Release</span>
      <div slot="body">
        Are you sure you want to delete {modal.data.artist} &ndash; {modal.data
          .title}?
      </div>
    </Modal>
  {/if}
</Layout>
