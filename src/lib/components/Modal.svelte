<script lang="ts">
  import { fade } from 'svelte/transition';
  import { enhance, type SubmitFunction } from '$app/forms';

  import Button from '$lib/components/Button.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import XMarkIcon from '$lib/icons/XMarkIcon.svelte';

  export let action = '';
  export let isSubmitting: boolean;
  export let onClose: () => void;
  export let onSubmit: SubmitFunction;
</script>

<div
  aria-labelledby="modal-title"
  aria-modal="true"
  class="relative z-10"
  role="dialog"
  transition:fade={{ duration: 150 }}
>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-start justify-center p-4 sm:p-0">
      <form
        {action}
        class="relative my-8 w-full max-w-lg transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-gray-800 sm:p-6"
        method="post"
        use:enhance={onSubmit}
      >
        <div class="mt-3 sm:mt-0 sm:text-left">
          <div class="flex items-center justify-between">
            <h3
              class="text-xl font-medium leading-6 text-gray-900 dark:text-white"
              id="modal-title"
            >
              <slot name="title" />
            </h3>
            <button
              class="rounded-full p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900"
              on:click={onClose}
              type="button"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div class="mt-2">
            <slot name="body" />
          </div>
        </div>
        <div class="mt-8 flex items-center justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <SubmitButton {isSubmitting} />
        </div>
      </form>
    </div>
  </div>
</div>
