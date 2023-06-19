<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Header from '$lib/components/Header.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import RPS from '$lib/doodles/RPS/index.svelte';
</script>

<Page>
  <Header
    slot="header"
    heading="Rock paper scissors"
    subheading="Shoot!"
    completedDate="19 January 2023"
    ><ExternalLink slot="promptBy" href="https://www.adventofcss.com/">Advent of CSS</ExternalLink
    ></Header
  >

  <RPS slot="content" />
</Page>
