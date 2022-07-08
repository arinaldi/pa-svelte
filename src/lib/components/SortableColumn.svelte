<script lang="ts">
  import ArrowNarrowDownIcon from '$lib/icons/ArrowNarrowDownIcon.svelte';

  export let prop: string;
  export let wrapperClassName = '';

  let [sortProp, desc] = ['', ''];
  let newSort = null;
</script>

<th
  class={`cursor-pointer px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white ${wrapperClassName}`}
  scope="col"
>
  <!-- <Link to={newSort ? `?${newSearchParams}` : "/admin"}> -->
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
  <!-- </Link> -->
</th>

<!-- 
  const [searchParams] = useSearchParams();
  const sort = parseQuery(searchParams.get("sort"));
  const params = Object.fromEntries(searchParams.entries());
  let [sortProp, desc] = sort.split(":") ?? [];
  let newSort = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  const newSearchParams = new URLSearchParams({
    ...params,
    sort: newSort as string,
  });
-->
