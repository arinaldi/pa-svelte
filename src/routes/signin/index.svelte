<script lang="ts">
  import Input from '$lib/components/Input.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import PasswordInput from '$lib/components/PasswordInput.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';

  interface Errors {
    form: string;
  }

  interface Values {
    email: string;
    password: string;
  }

  export let errors: Errors | null = null;
  export let values: Values | null = null;
</script>

<svelte:head>
  <title>Perfect Albums | Sign In</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout maxWidth="max-w-sm">
  <span slot="title">Sign In</span>
  <form method="post">
    <div class="bg-white dark:bg-gray-800">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <Input
            id="email"
            required
            type="email"
            value={values?.email ?? ''}
            wrapperClass="mt-4"
          />
          <PasswordInput value={values?.password ?? ''} wrapperClass="mt-4" />
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-end">
      <SubmitButton />
    </div>
    {#if errors}
      <div class="mt-4 text-red-600 text-center">{errors.form}</div>
    {/if}
  </form>
</Layout>
