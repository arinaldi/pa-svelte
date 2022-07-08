<script lang="ts">
  export let onClick: any = null;
</script>

<button
  class="rounded border border-transparent bg-gray-700 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
  on:click={onClick}
  type="button"
>
  <slot />
</button>
