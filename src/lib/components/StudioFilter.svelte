<script lang="ts">
  import StudioButton from '$lib/components/StudioButton.svelte';
  import { FILTER } from '$lib/constants';
</script>

<div
  class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
  aria-label="Studio filter"
>
  <StudioButton prop={FILTER.OFF} />
  <StudioButton prop={FILTER.ON} />
</div>
