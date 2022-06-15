<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import ArrowUpIcon from '$lib/icons/ArrowUpIcon.svelte';
  import { SPOTIFY_URL } from '$lib/constants';
  import { formatFavorites, sortDesc } from '$lib/utils';

  import type { Album } from '$lib/types';

  export let favorites: Album[];
</script>

<svelte:head>
  <title>Perfect Albums | Top Albums</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">
    Top Albums
    <span
      class="ml-3 rounded-md bg-gray-100 p-1 text-xl font-semibold dark:bg-gray-700 sm:text-2xl"
    >
      {favorites.length.toLocaleString()}
    </span>
  </span>
  <div
    class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    {#each Object.entries(formatFavorites(favorites)).sort(sortDesc) as [year, data]}
      <div>
        <div class="flex items-center justify-between">
          <h4 id={year} class="text-xl font-semibold dark:text-white">
            {year}
          </h4>
          <div
            class="mr-4 rounded-md bg-gray-100 px-2 py-1 text-xl font-semibold dark:bg-gray-700 dark:text-white"
          >
            {data.length.toLocaleString()}
          </div>
        </div>
        <ul class="ml-6 list-disc p-1">
          {#each data as { artist, title }}
            <li class="dark:text-white">
              {artist} &ndash;{''}
              <a
                class="text-blue-700 hover:underline dark:text-blue-500"
                href={`${SPOTIFY_URL}/${encodeURI(`${artist} ${title}`)}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
  <a
    class="fixed bottom-0 right-0 p-5 text-gray-500 dark:text-gray-200"
    href="#top"
  >
    <ArrowUpIcon className="mr-1 inline h-4 w-4" />
    <span>Top</span>
  </a>
</Layout>
