<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import { user } from '$lib/sessionStore';
</script>

<Layout>
  <span slot="title">Admin</span>
  {$user?.email}
</Layout>
