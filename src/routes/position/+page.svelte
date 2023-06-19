<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Header from '$lib/components/Header.svelte';
  import Position from '$lib/doodles/Position/index.svelte';
</script>

<Page>
  <Header
    slot="header"
    heading="CSS position"
    subheading="No flex, no grid, just position."
    completedDate="1 February 2023"
  />
  <Position slot="content" />
</Page>
