<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { PAGE } from '$lib/constants';

  export let isDisabled: boolean;
  export let label: PAGE;
  export let pageValue: number;

  function onClick() {
    const query = new URLSearchParams($page.url.searchParams.toString());

    query.set('page', pageValue.toString());
    goto(`?${query.toString()}`);
  }
</script>

<button
  class={`${label === PAGE.FIRST ? 'rounded-l-md' : ''} ${
    label === PAGE.LAST ? 'rounded-r-md' : ''
  } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white`}
  disabled={isDisabled}
  on:click={onClick}
  type="button"
>
  <span class="sr-only">{label}</span>
  <slot />
</button>
