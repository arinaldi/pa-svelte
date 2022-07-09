<script lang="ts">
  export let checked: boolean;
  export let id: string;
  export let label: string;
  export let wrapperClass = '';

  function onChange({ target }: any) {
    checked = target.checked;
  }
</script>

<fieldset class={`flex items-center ${wrapperClass}`}>
  <input
    {checked}
    class="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
    {id}
    on:change={onChange}
    name={id}
    type="checkbox"
  />
  <label
    class="ml-2 text-sm font-medium text-gray-700 dark:text-white"
    for={id}
  >
    {label}
  </label>
</fieldset>
