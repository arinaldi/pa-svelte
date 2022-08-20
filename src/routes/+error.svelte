<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex justify-center flex-col items-center mt-10">
  <h1 class="font-bold text-4xl">{$page.status}</h1>
  <p class="text-xl">{$page.error?.message}</p>
</div>
