<script lang="ts">
  export let onClick: () => void;
</script>

<button
  class="rounded-md px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-200 focus:border-indigo-500 border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-white dark:border-gray-600"
  on:click={onClick}
  type="button"
>
  <slot />
</button>
