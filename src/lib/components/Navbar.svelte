<script lang="ts">
  import { ROUTES } from '$lib/constants';
  import LinkWrapper from '$lib/LinkWrapper.svelte';
  import MenuIcon from '$lib/icons/MenuIcon.svelte';
  import XIcon from '$lib/icons/XIcon.svelte';

  let open = false;

  function toggleMenu() {
    open = !open;
  }

  function closeMenu() {
    open = false;
  }
</script>

<header>
  <nav class="bg-gray-800 dark:bg-gray-700">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex items-center sm:hidden">
          <button
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
            on:click={toggleMenu}
            type="button"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon className={`${open ? 'hidden' : 'block'} h-6 w-6`} />
            <XIcon className={`${open ? 'block' : 'hidden'} h-6 w-6`} />
          </button>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <span class="text-xl font-semibold text-white">
              Perfect Albums
            </span>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex">
              {#each ROUTES as route (route.href)}
                <LinkWrapper href={route.href}>
                  {route.label}
                </LinkWrapper>
              {/each}
            </div>
          </div>
        </div>
        <!-- Dark mode button -->
        <div
          class="absolute inset-y-0 right-0 hidden pr-2 sm:static sm:inset-auto sm:ml-0 sm:flex sm:items-center sm:pr-0"
        >
          <!-- Sign in/out -->
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class={`${open ? 'block' : 'hidden'} sm:hidden`}>
      <div class="space-y-1 px-2 pt-2 pb-3">
        {#each ROUTES as route (route.href)}
          <LinkWrapper
            classNames="block text-base"
            href={route.href}
            onClick={closeMenu}
          >
            {route.label}
          </LinkWrapper>
        {/each}
        <!-- Admin/Sign out | Sign in -->
      </div>
    </div>
  </nav>
</header>
