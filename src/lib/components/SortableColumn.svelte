<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ArrowNarrowDownIcon from '$lib/icons/ArrowNarrowDownIcon.svelte';
  import { parseQuery } from '$lib/utils';

  export let prop: string;
  export let wrapperClassName = '';

  $: sort = parseQuery($page.url.searchParams.get('sort'));
  $: [sortProp, desc] = sort.split(':') ?? [];
  $: newSort = '';

  function onClick() {
    const query = new URLSearchParams($page.url.searchParams.toString());

    if (sortProp !== prop) {
      newSort = prop;
    } else if (sortProp === prop && !desc) {
      newSort = `${prop}:desc`;
    } else {
      newSort = '';
    }

    if (newSort) {
      query.set('sort', newSort);
    } else {
      query.delete('sort');
    }

    goto(`?${query.toString()}`);
  }
</script>

<th
  class={`cursor-pointer px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white ${wrapperClassName}`}
  scope="col"
>
  <div on:click={onClick}>
    <slot />
    <span
      class={`${
        sortProp === prop
          ? 'text-gray-700 group-hover:bg-gray-300'
          : 'invisible text-gray-400 group-hover:visible'
      } ml-1 flex-none`}
    >
      <ArrowNarrowDownIcon
        className={`${desc ? 'rotate-180' : ''} inline h-4 w-4`}
      />
    </span>
  </div>
</th>
