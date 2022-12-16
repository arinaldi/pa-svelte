<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { FILTER } from '$lib/constants';
  import { parseQuery } from '$lib/utils';

  export let prop: FILTER;

  $: studio = parseQuery($page.url.searchParams.get('studio'));
  $: value = prop === FILTER.ON;

  function onClick() {
    const query = new URLSearchParams($page.url.searchParams.toString());

    query.set('page', '1');
    query.set('studio', value.toString());
    goto(`?${query.toString()}`);
  }
</script>

<button
  class={`${
    prop === FILTER.OFF ? 'rounded-l-md' : 'rounded-r-md'
  } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white`}
  disabled={studio === value.toString() || (!studio && prop === FILTER.OFF)}
  on:click={onClick}
  type="button"
>
  <span class="sr-only">{prop}</span>
  {prop}
</button>
