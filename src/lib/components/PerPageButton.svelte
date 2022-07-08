<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { PER_PAGE } from '$lib/constants';
  import { parsePerPageQuery } from '$lib/utils';

  export let prop: PER_PAGE;

  $: perPage = parsePerPageQuery($page.url.searchParams.get('perPage'));

  function onClick() {
    const query = new URLSearchParams($page.url.searchParams.toString());

    query.set('page', '1');
    query.set('perPage', prop.toString());
    goto(`?${query.toString()}`);
  }
  const { SMALL, LARGE } = PER_PAGE;
</script>

<button
  class={`${prop === SMALL ? 'rounded-l-md' : ''} ${
    prop === LARGE ? 'rounded-r-md' : ''
  } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white`}
  disabled={perPage === prop}
  on:click={onClick}
>
  <span class="sr-only">{prop}</span>
  {prop}
</button>
