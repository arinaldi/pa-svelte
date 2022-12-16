<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="mt-10 flex flex-col items-center justify-center">
  <h1 class="text-4xl font-bold">{$page.status}</h1>
  <p class="text-xl">{$page.error?.message ?? 'Something went wrong'}</p>
</div>
