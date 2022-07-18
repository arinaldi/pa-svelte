<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit';

  export function load({ error, status }: LoadEvent) {
    return {
      props: {
        title: status,
        body: error?.message ?? 'Something went wrong',
      },
    };
  }
</script>

<script lang="ts">
  export let title: string;
  export let body: string;
</script>

<div class="flex justify-center flex-col items-center mt-10">
  <h1 class="font-bold text-4xl">{title}</h1>
  <p class="text-xl">{body}</p>
</div>
