<script lang="ts">
  import Spinner from '$lib/components/Spinner.svelte';

  export let isSubmitting = false;
  export let onClose: any = null;
  export let onSubmit: any = null;
</script>

<div
  class="relative z-10"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex justify-center items-start min-h-full p-4 sm:p-0">
      <form
        class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-lg w-full sm:p-6"
        on:submit|preventDefault={onSubmit}
      >
        <div class="mt-3 sm:mt-0 sm:text-left">
          <h3
            class="text-xl leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            <slot name="title" />
          </h3>
          <div class="mt-2">
            <slot name="body" />
          </div>
        </div>
        <div class="mt-8 sm:flex sm:flex-row-reverse">
          <button
            class="w-full min-w-[96px] inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            disabled={isSubmitting}
            type="submit"
          >
            {#if isSubmitting}
              <Spinner className="h-5 w-5 text-white" />
            {:else}
              Submit
            {/if}
          </button>
          <button
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            on:click={onClose}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
