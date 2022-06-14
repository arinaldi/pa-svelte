<script lang="ts">
  export let maxWidth = 'max-w-7xl';
  export let title: any;
  export let titleAction: any = null;
</script>

<div class={`mx-auto p-4 ${maxWidth}`}>
  <div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold dark:text-white sm:text-3xl">
      {title}
    </h1>
    {#if titleAction}
      {titleAction}
    {/if}
  </div>
  <main class="relative flex-auto"><slot /></main>
</div>
