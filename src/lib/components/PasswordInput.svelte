<script lang="ts">
  import EyeIcon from '$lib/icons/EyeIcon.svelte';
  import EyeSlashIcon from '$lib/icons/EyeSlashIcon.svelte';

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
    <button
      aria-label="Show or hide password"
      class="absolute inset-y-0 right-0 mr-3 flex cursor-pointer items-center dark:text-white"
      on:click={toggleShowPassword}
      type="button"
    >
      {#if showPassword}
        <EyeIcon className="h-5 w-5" />
      {:else}
        <EyeSlashIcon className="h-5 w-5" />
      {/if}
    </button>
  </div>
</div>
