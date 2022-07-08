<script lang="ts">
  import PerPageButton from '$lib/components/PerPageButton.svelte';
  import { PER_PAGE } from '$lib/constants';
</script>

<div
  class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
  aria-label="Pagination"
>
  <PerPageButton prop={PER_PAGE.SMALL} />
  <PerPageButton prop={PER_PAGE.MEDIUM} />
  <PerPageButton prop={PER_PAGE.LARGE} />
</div>
