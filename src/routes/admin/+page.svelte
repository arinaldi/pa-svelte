<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  import AppMessage from '$lib/components/AppMessage.svelte';
  import Button from '$lib/components/Button.svelte';
  import Column from '$lib/components/Column.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  import PerPage from '$lib/components/PerPage.svelte';
  import SortableColumn from '$lib/components/SortableColumn.svelte';
  import StudioFilter from '$lib/components/StudioFilter.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import { APP_MESSAGE_TYPES, PER_PAGE, ROUTES_ADMIN } from '$lib/constants';
  import CheckIcon from '$lib/icons/CheckIcon.svelte';
  import DocumentPlusIcon from '$lib/icons/DocumentPlusIcon.svelte';
  import PencilIcon from '$lib/icons/PencilIcon.svelte';
  import TrashIcon from '$lib/icons/TrashIcon.svelte';
  import { parsePerPageQuery, parseQuery } from '$lib/utils';

  export let data: PageData;
  $: albums = data.albums ?? [];
  $: cdTotal = data.cdTotal ?? 0;
  $: total = data.total ?? 0;

  let artist = parseQuery($page.url.searchParams.get('artist'));
  let title = parseQuery($page.url.searchParams.get('title'));
  $: perPage = parsePerPageQuery($page.url.searchParams.get('perPage'));

  // @ts-ignore
  const { version } = APP_VERSION;

  async function onSubmit() {
    const query = new URLSearchParams($page.url.searchParams.toString());

    query.set('artist', artist);
    query.set('page', '1');
    query.set('sort', 'year');
    query.set('title', title);
    goto(`?${query.toString()}`);
  }

  function onClear() {
    const query = new URLSearchParams($page.url.searchParams.toString());

    artist = '';
    title = '';
    query.set('artist', '');
    query.set('page', '1');
    query.set('perPage', PER_PAGE.SMALL.toString());
    query.set('sort', '');
    query.set('studio', '');
    query.set('title', '');
    goto(`?${query.toString()}`);
  }
</script>

<svelte:head>
  <title>Perfect Albums | Admin</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">
    {ROUTES_ADMIN.base.label}
    <span
      class="ml-3 rounded-md bg-gray-100 px-1 text-xl font-semibold dark:bg-gray-700 sm:text-2xl"
    >
      {total.toLocaleString()}
    </span>
  </span>
  <span class="dark:text-white" slot="titleAction">
    <code class="mr-3">{version}</code>
    <span
      class="text-md mr-1 rounded-md bg-gray-100 px-1 font-semibold dark:bg-gray-700 sm:text-lg"
    >
      {cdTotal}
    </span>
    <span class="mr-3">CDs</span>
    <a
      class="rounded-md px-1 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-900"
      href={`${ROUTES_ADMIN.create.href}${$page.url.search}`}
    >
      <DocumentPlusIcon
        className="inline h-6 w-6 cursor-pointer dark:text-white"
      />
    </a>
  </span>
  <form
    class="mb-4 block sm:flex sm:items-center sm:justify-between"
    on:submit|preventDefault={onSubmit}
  >
    <input
      bind:value={artist}
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
      id="artist-search"
      name="artist"
      placeholder="Search artist"
      type="text"
    />
    <input
      bind:value={title}
      class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:ml-4 sm:mt-0 sm:text-sm"
      id="title-search"
      name="title"
      placeholder="Search title"
      type="text"
    />
    <div class="mt-2 flex justify-between sm:mt-0 sm:ml-4">
      <div class="flex">
        <SubmitButton isSubmitting={false} />
        <span class="ml-1" />
        <Button onClick={onClear}>Clear</Button>
      </div>
      <div class="inline sm:hidden">
        <StudioFilter />
      </div>
    </div>
  </form>

  <div class="mb-4 flex justify-center">
    <Pagination lastPage={Math.ceil(total / perPage)} />
    <div class="mx-2" />
    <PerPage />
    <div class="mx-2" />
    <div class="hidden sm:block">
      <StudioFilter />
    </div>
  </div>

  {#if albums.length === 0}
    <AppMessage message="No results found" type={APP_MESSAGE_TYPES.INFO} />
  {:else}
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden border-b border-gray-200 dark:border-black sm:rounded-lg"
          >
            <table
              class="min-w-full table-auto divide-y divide-gray-200 dark:divide-black sm:table-fixed"
            >
              <thead>
                <tr>
                  <SortableColumn
                    prop="artist"
                    wrapperClassName="sm:w-1/4 sm:max-w-0"
                  >
                    Artist
                  </SortableColumn>
                  <SortableColumn
                    prop="title"
                    wrapperClassName="sm:w-1/3 sm:max-w-0"
                  >
                    Title
                  </SortableColumn>
                  <SortableColumn prop="year" wrapperClassName="sm:w-1/12">
                    Year
                  </SortableColumn>
                  <Column wrapperClassName="sm:w-1/12">Favorite</Column>
                  <Column wrapperClassName="sm:w-1/12">Actions</Column>
                </tr>
              </thead>
              <tbody
                class="divide-y divide-gray-200 bg-white dark:divide-black dark:bg-gray-500"
              >
                {#each albums as album (album.id)}
                  <tr
                    class="even:bg-gray-0 odd:bg-gray-100 dark:odd:bg-gray-700 dark:even:bg-gray-800"
                  >
                    <td
                      class="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/4 sm:max-w-0 sm:truncate"
                    >
                      {album.artist}
                    </td>
                    <td
                      class="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/3 sm:max-w-0 sm:truncate"
                    >
                      {#if album.cd}
                        <span class="mr-1 text-xs">💿</span>
                      {/if}
                      <span
                        class={album.studio
                          ? 'font-medium italic'
                          : 'font-light'}
                      >
                        {album.title}
                      </span>
                    </td>
                    <td
                      class="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12"
                    >
                      {album.year}
                    </td>
                    <td
                      class="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12"
                    >
                      {#if album.favorite}
                        <CheckIcon className="inline h-5 w-5" />
                      {/if}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12"
                    >
                      <a
                        class="rounded-md px-1.5 py-1 hover:bg-gray-200"
                        href={`${ROUTES_ADMIN.edit.href}/${album.id}${$page.url.search}`}
                      >
                        <PencilIcon
                          className="inline h-4 w-4 cursor-pointer dark:text-white"
                        />
                      </a>
                      <a
                        class="ml-4 rounded-md px-1.5 py-1 hover:bg-gray-200"
                        href={`${ROUTES_ADMIN.delete.href}/${album.id}${$page.url.search}`}
                      >
                        <TrashIcon
                          className="inline h-4 w-4 cursor-pointer dark:text-white"
                        />
                      </a>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  {/if}
</Layout>
