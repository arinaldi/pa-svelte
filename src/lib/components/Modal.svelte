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
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex justify-center items-start min-h-full p-4 sm:p-0">
      <form
        {action}
        class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-lg w-full sm:p-6 dark:bg-gray-800"
        method="post"
        use:enhance={onSubmit}
      >
        <div class="mt-3 sm:mt-0 sm:text-left">
          <div class="flex justify-between items-center">
            <h3
              class="text-xl leading-6 font-medium text-gray-900 dark:text-white"
              id="modal-title"
            >
              <slot name="title" />
            </h3>
            <button
              class="p-1 hover:bg-gray-100 rounded-full dark:hover:bg-gray-900 dark:text-white"
              on:click={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div class="mt-2">
            <slot name="body" />
          </div>
        </div>
        <div class="mt-8 flex justify-end items-center gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <SubmitButton {isSubmitting} />
        </div>
      </form>
    </div>
  </div>
</div>
