<script lang="ts">
  import { session } from '$app/stores';
  import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from '$lib/constants';
  import LinkWrapper from '$lib/components/LinkWrapper.svelte';
  import LoginIcon from '$lib/icons/LoginIcon.svelte';
  import LogoutIcon from '$lib/icons/LogoutIcon.svelte';
  import MenuIcon from '$lib/icons/MenuIcon.svelte';
  import MoonIcon from '$lib/icons/MoonIcon.svelte';
  import SunIcon from '$lib/icons/SunIcon.svelte';
  import XIcon from '$lib/icons/XIcon.svelte';

  let open = false;

  function toggleMenu() {
    open = !open;
  }

  function closeMenu() {
    open = false;
  }

  function toggleDarkMode() {
    const root = window.document.documentElement;
    const isDarkMode = root.classList.contains('dark');

    if (isDarkMode) {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    }
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
              {#if $session.user}
                <LinkWrapper href={ROUTES_ADMIN.base.href}>
                  {ROUTES_ADMIN.base.label}
                </LinkWrapper>
              {/if}
            </div>
          </div>
        </div>
        <button
          aria-expanded="false"
          class="rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          on:click={toggleDarkMode}
          type="button"
        >
          <span class="sr-only">Toggle dark mode</span>
          <SunIcon className="h-5 w-5 hidden dark:block" />
          <MoonIcon className="h-5 w-5 dark:hidden" />
        </button>

        <div
          class="absolute inset-y-0 right-0 hidden pr-2 sm:static sm:inset-auto sm:ml-0 sm:flex sm:items-center sm:pr-0"
        >
          {#if $session.user}
            <a
              class="text-md cursor-pointer rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800"
              href="/api/auth/logout"
            >
              <LogoutIcon className="h-5 w-5" />
            </a>
          {:else}
            <LinkWrapper href={ROUTE_HREF.SIGNIN}>
              <LoginIcon className="h-5 w-5" />
            </LinkWrapper>
          {/if}
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class={`${open ? 'block' : 'hidden'} sm:hidden`}>
      <div class="space-y-1 px-2 pt-2 pb-3">
        {#each ROUTES as route (route.href)}
          <LinkWrapper
            classNames="block text-base"
            {closeMenu}
            href={route.href}
          >
            {route.label}
          </LinkWrapper>
        {/each}
        {#if $session.user}
          <span>
            <LinkWrapper
              classNames="block text-base"
              {closeMenu}
              href={ROUTES_ADMIN.base.href}
            >
              {ROUTES_ADMIN.base.label}
            </LinkWrapper>
            <a
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              href="/api/auth/logout"
              on:click={() => {
                closeMenu();
              }}
            >
              Sign Out
            </a>
          </span>
        {:else}
          <LinkWrapper
            classNames="block text-base"
            {closeMenu}
            href={ROUTE_HREF.SIGNIN}
          >
            Sign In
          </LinkWrapper>
        {/if}
      </div>
    </div>
  </nav>
</header>
