<script lang="ts">
  import Page from '$lib/Page.svelte';
  import Scanner from './Scanner.svelte';

  $: barcode = '';
  const onDetected = (code: string) => {
    barcode = code;
  };
</script>

<Page>
  <div slot="content">
    <Scanner {onDetected} />
    <p>{barcode}</p>
  </div>
</Page>
