<script lang="ts">
  export let id: string;
  export let required = false;
  export let type: 'text' | 'date' | 'email';
  export let value: string;
  export let wrapperClass = '';

  function onInput({ target }: any) {
    value = target?.value;
  }
</script>

<div class={wrapperClass}>
  <label
    class="block text-sm font-medium capitalize text-gray-700 dark:text-white"
    for={id}
  >
    {id}
  </label>
  <input
    autocapitalize={id === 'email' ? 'off' : 'on'}
    autocomplete={id}
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
    enterKeyHint="enter"
    {id}
    inputmode={id === 'email' ? 'email' : undefined}
    on:input={onInput}
    name={id}
    {required}
    {type}
    {value}
  />
</div>
