<script lang="ts">
  import toast from 'svelte-french-toast';
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import { invalidate } from '$app/navigation';
  import type { ActionData } from './$types';

  import Input from '$lib/components/Input.svelte';
  import Layout from '$lib/components/Layout.svelte';
  import PasswordInput from '$lib/components/PasswordInput.svelte';
  import SubmitButton from '$lib/components/SubmitButton.svelte';
  import { MESSAGES } from '$lib/constants';

  interface Form {
    email?: string;
  }

  export let form: ActionData & Form;
  let isSubmitting = false;

  const onSubmit: SubmitFunction = () => {
    isSubmitting = true;

    return async ({ result }) => {
      switch (result.type) {
        case 'redirect': {
          await invalidate('supabase:auth');
          break;
        }
        case 'error': {
          toast.error(result.error?.message ?? MESSAGES.ERROR);
          break;
        }
        case 'failure': {
          toast.error(result.data?.error ?? MESSAGES.ERROR);
          break;
        }
        default:
          await applyAction(result);
      }

      isSubmitting = false;
    };
  };
</script>

<svelte:head>
  <title>Perfect Albums | Sign In</title>
  <meta name="description" content="The best music on the net." />
</svelte:head>

<Layout maxWidth="max-w-sm">
  <span slot="title">Sign In</span>
  <form method="post" use:enhance={onSubmit}>
    <div class="bg-white dark:bg-gray-800">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6">
          <Input
            id="email"
            required
            type="email"
            value={form?.email ?? ''}
            wrapperClass="mt-4"
          />
          <PasswordInput value="" wrapperClass="mt-4" />
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-end">
      <SubmitButton {isSubmitting} />
    </div>
  </form>
</Layout>
