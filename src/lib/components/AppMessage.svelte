<script lang="ts">
  import ExclamationCircleIcon from '$lib/icons/ExclamationCircleIcon.svelte';
  import InformationCircleIcon from '$lib/icons/InformationCircleIcon.svelte';
  import { APP_MESSAGE_TYPES } from '$lib/constants';

  const { ERROR, INFO } = APP_MESSAGE_TYPES;

  export let message = 'Something went wrong';
  export let type: APP_MESSAGE_TYPES = ERROR;

  const styles = {
    [ERROR]: 'bg-red-100 border-red-700 text-red-700',
    [INFO]: 'bg-blue-100 border-blue-700 text-blue-700',
  };
  const className = 'w-6 h-6';
</script>

<div class="mt-8 text-center">
  <div
    class={`inline-flex items-center rounded border-l-4 py-4 pl-5 pr-6 ${styles[type]}`}
    role="alert"
  >
    {#if type === ERROR}
      <ExclamationCircleIcon {className} />
    {:else if type === INFO}
      <InformationCircleIcon {className} />
    {/if}
    <p class="ml-3 text-center">{message}</p>
  </div>
</div>
