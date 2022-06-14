<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<section>
  <h1 class="text-4xl font-bold text-center">
    Welcome to your new SvelteKit app
  </h1>

  <h2>
    try editing <strong>src/routes/index.svelte</strong>
  </h2>

  <Counter />
</section>
