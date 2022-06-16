<script lang="ts">
  import Spinner from '$lib/components/Spinner.svelte';

  export let isSubmitting = false;
</script>

<button
  class="flex min-w-[96px] items-center justify-center rounded bg-gray-700 px-4 py-2 text-sm font-bold uppercase text-white shadow hover:bg-gray-900 hover:shadow-lg focus:border-indigo-500 focus:ring-indigo-500 active:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
  disabled={isSubmitting}
  type="submit"
>
  {#if isSubmitting}
    <Spinner className="h-5 w-5 text-white" />
  {:else}
    Submit
  {/if}
</button>
