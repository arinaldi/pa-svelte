<script lang="ts">
  import { page } from '$app/stores';
  import PaginationButton from '$lib/components/PaginationButton.svelte';
  import { PAGE } from '$lib/constants';
  import { parsePageQuery } from '$lib/utils';

  export let lastPage: number;

  $: currentPage = parsePageQuery($page.url.searchParams.get('page'));
  $: isFirstPage = currentPage === 1;
  $: isLastPage = currentPage === lastPage;
</script>

<div
  class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
  aria-label="Pagination"
>
  <PaginationButton isDisabled={isFirstPage} label={PAGE.FIRST} pageValue={1}>
    «
  </PaginationButton>
  <PaginationButton
    isDisabled={isFirstPage}
    label={PAGE.PREVIOUS}
    pageValue={currentPage - 1}
  >
    ‹
  </PaginationButton>
  <span
    class="relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:border-black dark:bg-gray-700 dark:text-white"
  >
    {currentPage}
  </span>
  <PaginationButton
    isDisabled={isLastPage}
    label={PAGE.NEXT}
    pageValue={currentPage + 1}
  >
    ›
  </PaginationButton>
  <PaginationButton
    isDisabled={isLastPage}
    label={PAGE.LAST}
    pageValue={lastPage}
  >
    »
  </PaginationButton>
</div>
