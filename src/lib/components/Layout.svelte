<script lang="ts">
  export let maxWidth = 'max-w-7xl';
</script>

<div class={`mx-auto p-4 ${maxWidth}`}>
  <div class="mb-4 flex items-center justify-between">
    <h1 class="text-2xl font-semibold dark:text-white sm:text-3xl">
      <slot name="title" />
    </h1>
    <slot name="titleAction" />
  </div>
  <main class="relative flex-auto"><slot /></main>
</div>
