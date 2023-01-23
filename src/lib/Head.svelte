<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import routes from '../routes';

  const defaultTitle = 'Doodles by Safira';
  $: title = defaultTitle;
  $: page.subscribe((p) => {
    title = routes[p.url.pathname]
      ? `${routes[p.url.pathname].name} | ${defaultTitle}`
      : defaultTitle;
  });

  onMount(() => {
    document.title = title;
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
