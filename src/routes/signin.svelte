<script lang="ts">
  import { goto } from '$app/navigation';

  import Input from '$lib/components/Input.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import PasswordInput from '$lib/components/PasswordInput.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import { ROUTES_ADMIN } from '$lib/constants';
  import { supabase } from '$lib/supabase';

  let email = '';
  let password = '';
  let isSubmitting = false;

  async function onSubmit() {
    try {
      isSubmitting = true;
      const { error } = await supabase.auth.signIn({ email, password });

      if (error) throw error;

      goto(ROUTES_ADMIN.base.href);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Perfect Albums | Sign In</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout maxWidth="max-w-sm">
  <span slot="title">Sign In</span>
  <form on:submit|preventDefault={onSubmit}>
    <div class="bg-white dark:bg-gray-800">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <Input
            bind:value={email}
            id="email"
            required
            type="email"
            wrapperClass="mt-4"
          />
          <PasswordInput bind:value={password} wrapperClass="mt-4" />
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-end">
      <SubmitButton {isSubmitting} />
    </div>
  </form>
</Layout>
