<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';

  import type { Song } from '$lib/types';

  export let songs: Song[];
</script>

<svelte:head>
  <title>Perfect Albums | Featured Songs</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout title="Featured Songs">
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
        </div>
      </div>
    {/each}
  </div>
</Layout>
