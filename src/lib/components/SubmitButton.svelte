<script lang="ts">
  import Spinner from '$lib/components/Spinner.svelte';

  export let isSubmitting: boolean;
</script>

<button
  class="min-w-[96px] inline-flex justify-center items-center rounded-md border border-transparent shadow-sm bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 hover:shadow-lg focus:border-indigo-500 focus:ring-indigo-500 active:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
  disabled={isSubmitting}
  type="submit"
>
  {#if isSubmitting}
    <Spinner className="h-5 w-5 text-white" />
  {:else}
    Submit
  {/if}
</button>
