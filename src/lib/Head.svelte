<script>
  import { onMount } from 'svelte';
  import { pageName } from './stores.js';
  $: title = $pageName ? `${$pageName} | Doodles by Safira` : 'Doodles by Safira';

  onMount(() => {
    document.title = title;
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
