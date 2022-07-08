<script lang="ts">
  export let wrapperClassName = '';
</script>

<th
  class={`px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white ${wrapperClassName}`}
  scope="col"
>
  <slot />
</th>
