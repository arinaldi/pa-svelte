<script lang="ts">
  import { page } from '$app/stores';

  export let classNames = '';
  export let href: string;
  export let closeMenu: any = null;

  $: isActive = $page.url.pathname.startsWith(href);
</script>

<a
  class={`${
    isActive ? 'text-white' : 'text-gray-300'
  } ${classNames} rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800`}
  data-sveltekit-prefetch
  {href}
  on:click={closeMenu}
>
  <span class={`${isActive ? 'border-b-2' : ''} pb-1`}>
    <slot />
  </span>
</a>
