<script lang="ts">
  import { page } from '$app/stores';

  export let classNames = '';
  export let href: string;
  export let onClick: any = null;
</script>

<a
  class={`${
    $page.url.pathname === href ? 'text-white' : 'text-gray-300'
  } ${classNames} rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800`}
  {href}
  on:click={onClick}
  sveltekit:prefetch
>
  <span class={`${$page.url.pathname === href ? 'border-b-2' : ''} pb-1`}>
    <slot />
  </span>
</a>
