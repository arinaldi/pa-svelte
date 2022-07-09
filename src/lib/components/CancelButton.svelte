<script lang="ts">
  export let onClick: any = null;
</script>

<button
  class="background-transparent rounded px-4 py-2 text-sm font-bold uppercase text-red-500 hover:bg-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
  on:click={onClick}
  type="button"
>
  Cancel
</button>
