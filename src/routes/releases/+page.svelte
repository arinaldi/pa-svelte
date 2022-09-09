<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  import Input from '$lib/components/Input.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { MODAL_TYPES } from '$lib/constants';
  import DocumentPlusIcon from '$lib/icons/DocumentPlusIcon.svelte';
  import PencilIcon from '$lib/icons/PencilIcon.svelte';
  import TrashIcon from '$lib/icons/TrashIcon.svelte';
  import { formatDate, formatReleases, sortByDate } from '$lib/utils';
  import type { ModalType } from '$lib/types';

  export let data: PageData;
  $: ({ releases } = data);
  let modal: ModalType = { data: null, type: null };
  let artist = '';
  let title = '';
  let date = '';

  function onClose() {
    artist = '';
    title = '';
    date = '';
    modal = { data: null, type: null };
  }
</script>

<svelte:head>
  <title>Perfect Albums | New Releases</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">New Releases</span>
  <span slot="titleAction">
    {#if $page.data.user}
      <span
        class="rounded-md px-1 py-1.5 hover:bg-gray-100"
        on:click={() => {
          modal = { data: null, type: MODAL_TYPES.CREATE };
        }}
      >
        <DocumentPlusIcon
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
              {#if $page.data.user}
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
    <Modal {onClose}>
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
    <Modal action="/releases?_method=put" {onClose}>
      <span slot="title">Edit Release</span>
      <div class="w-full" slot="body">
        <input name="id" type="hidden" value={modal.data.id} />
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
    <Modal action="/releases?_method=delete" {onClose}>
      <span slot="title">Delete Release</span>
      <div slot="body">
        <input name="id" type="hidden" value={modal.data.id} />
        Are you sure you want to delete {modal.data.artist} &ndash; {modal.data
          .title}?
      </div>
    </Modal>
  {/if}
</Layout>
