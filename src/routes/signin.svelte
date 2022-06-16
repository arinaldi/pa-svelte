<script lang="ts">
  import { goto } from '$app/navigation';

  // import Input from '$lib/components/Input.svelte';
  import Layout from '$lib/components/Layout.svelte';
  // import PasswordInput from '$lib/components/PasswordInput.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  // import EyeIcon from '$lib/icons/EyeIcon.svelte';
  // import EyeOffIcon from '$lib/icons/EyeOffIcon.svelte';
  import { ROUTE_HREF } from '$lib/constants';
  import { supabase } from '$lib/supabase';

  let email = '';
  let password = '';
  let isSubmitting = false;
  // let showPassword = false;

  // function toggleShowPassword() {
  //   showPassword = !showPassword;
  // }

  async function onSubmit() {
    try {
      isSubmitting = true;
      console.log({ email, password });
      const { error } = await supabase.auth.signIn({ email, password });

      if (error) throw error;

      goto(ROUTE_HREF.NEW_RELEASES);
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
          <div class="mt-4">
            <label
              class="block text-sm font-medium capitalize text-gray-700 dark:text-white"
              for="email"
            >
              Email
            </label>
            <input
              autocapitalize="off"
              autocomplete="email"
              bind:value={email}
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
              enterKeyHint="enter"
              id="email"
              name="email"
              required
              type="email"
            />
          </div>
          <div class="mt-4">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-white"
              for="password"
            >
              Password
            </label>
            <div class="relative">
              <input
                autocapitalize="off"
                autocomplete="password"
                bind:value={password}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
                id="password"
                name="password"
                required
                type="password"
              />
              <!-- type={showPassword ? 'text' : 'password'} -->
              <!-- <div
                aria-label="Show or hide password"
                class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                on:click={toggleShowPassword}
              >
                {#if showPassword}
                  <EyeIcon className="h-5 w-5" />
                {:else}
                  <EyeOffIcon className="h-5 w-5" />
                {/if}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-end">
      <SubmitButton {isSubmitting} />
    </div>
  </form>
</Layout>
