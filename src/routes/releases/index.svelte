<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import { formatReleases, sortByDate } from '$lib/utils';

  import type { Release } from '$lib/types';

  export let releases: Release[];
</script>

<svelte:head>
  <title>Perfect Albums | New Releases</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout>
  <span slot="title">New Releases</span>
  <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {#each Object.entries(formatReleases(releases)).sort(sortByDate) as [date, data]}
      <div>
        <h4 class="text-xl font-semibold dark:text-white">{date}</h4>
        <ul class="ml-6 list-disc p-1">
          {#each data as { artist, title }}
            <li class="dark:text-white">
              <span>{artist} &ndash; {title}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</Layout>
