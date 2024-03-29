<script lang="ts">
  import toast from 'svelte-french-toast';
  import { applyAction, type SubmitFunction } from '$app/forms';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  import Input from '$lib/components/Input.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { MESSAGES, MODAL_TYPES } from '$lib/constants';
  import DocumentPlusIcon from '$lib/icons/DocumentPlusIcon.svelte';
  import TrashIcon from '$lib/icons/TrashIcon.svelte';
  import type { ModalType } from '$lib/types';

  export let data: PageData;
  $: songs = data.songs ?? [];
  let modal: ModalType = { data: null, type: null };
  let artist = '';
  let title = '';
  let link = '';
  let isSubmitting = false;

  function onClose() {
    artist = '';
    title = '';
    link = '';
    modal = { data: null, type: null };
  }

  const onSubmit: SubmitFunction = ({ action }) => {
    let suffix = 'created';
    isSubmitting = true;

    if (action.search.includes('delete')) {
      suffix = 'deleted';
    }

    return async ({ result, update }) => {
      switch (result.type) {
        case 'success': {
          onClose();
          toast.success(`${MESSAGES.SONG_PREFIX} ${suffix}`);
          await update();
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
  <title>Perfect Albums | Featured Songs</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">Featured Songs</span>
  <span slot="titleAction">
    {#if $page.data.session}
      <button
        class="rounded-md px-1 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-900"
        on:click={() => {
          modal = { data: null, type: MODAL_TYPES.CREATE };
        }}
        type="button"
      >
        <DocumentPlusIcon
          className="inline h-6 w-6 cursor-pointer dark:text-white"
        />
      </button>
    {/if}
  </span>
  <div
    class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    {#each songs as song (song.id)}
      <div
        class="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-black dark:bg-gray-700"
      >
        <div class="mb-1 text-xl font-semibold dark:text-white">
          {song.title}
        </div>
        <div class="mb-2 text-gray-500 dark:text-white">
          {song.artist}
        </div>
        <div>
          <a
            class="text-blue-700 hover:underline dark:text-blue-500"
            href={song.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            Listen
          </a>
          {#if $page.data.session}
            <button
              class="ml-2 cursor-pointer rounded-md p-1 hover:bg-gray-100 dark:text-white"
              on:click={() => {
                modal = { data: song, type: MODAL_TYPES.DELETE };
              }}
              type="button"
            >
              <TrashIcon className="inline h-4 w-4" />
            </button>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if modal.type === MODAL_TYPES.CREATE}
    <Modal action="?/createSong" {isSubmitting} {onClose} {onSubmit}>
      <span slot="title">Create Song</span>
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
        <Input
          bind:value={link}
          id="link"
          required
          type="text"
          wrapperClass="mt-4"
        />
      </div>
    </Modal>
  {:else if modal.type === MODAL_TYPES.DELETE && modal.data}
    <Modal action="?/deleteSong" {isSubmitting} {onClose} {onSubmit}>
      <span slot="title">Delete Song</span>
      <div slot="body">
        <input name="id" type="hidden" value={modal.data.id} />
        Are you sure you want to delete {modal.data.artist} &ndash; {modal.data
          .title}?
      </div>
    </Modal>
  {/if}
</Layout>
