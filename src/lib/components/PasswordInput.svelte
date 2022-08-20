<script lang="ts">
  import EyeIcon from '$lib/icons/EyeIcon.svelte';
  import EyeOffIcon from '$lib/icons/EyeOffIcon.svelte';

  export let value: string;
  export let wrapperClass = '';
  let showPassword = false;

  function onInput({ target }: any) {
    value = target?.value;
  }

  function toggleShowPassword() {
    showPassword = !showPassword;
  }
</script>

<div class={wrapperClass}>
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
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
      id="password"
      on:input={onInput}
      name="password"
      required
      type={showPassword ? 'text' : 'password'}
      {value}
    />
    <div
      aria-label="Show or hide password"
      class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
      on:click={toggleShowPassword}
    >
      {#if showPassword}
        <EyeIcon className="h-5 w-5" />
      {:else}
        <EyeOffIcon className="h-5 w-5" />
      {/if}
    </div>
  </div>
</div>
