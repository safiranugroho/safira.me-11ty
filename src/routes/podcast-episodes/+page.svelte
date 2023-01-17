<script>
  import Page from '$lib/Page.svelte';
  import Header from '$lib/Header.svelte';
  import cover from '$lib/assets/podcast-cover.png';
</script>

<Page>
  <Header
    slot="header"
    heading="Podcast episodes"
    subheading="Mark each episode as watched!"
    completedDate="16 January 2023"
  />

  <div class="container" slot="content">
    <img class="cover" alt="Compressed.fm podcast cover" src={cover} />
    <div class="list">
      <p class="title">Listen to all the Compressed.fm episodes</p>
      {#each ['Trailer', "James Q's Quick Origin Story", "Amy Dutton's Origin Story", 'Tech Behind the Podcast', 'Tech Behind SelfTeach.me', 'Freelancing (Part 1)'] as episode, i}
        <div>
          <input type="checkbox" id={String(i)} />
          <label for={String(i)}>{String(i + 1)} / {episode}</label>
        </div>
      {/each}
    </div>
  </div>
</Page>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;900&display=swap');

  :global(body) {
    background: #f3f3f3;
  }

  .container {
    font-family: 'Nunito Sans', sans-serif;

    width: fit-content;
    max-width: 1200px;
    margin: auto;

    display: flex;
  }

  .cover {
    z-index: 999;

    box-shadow: 0px 4px 24px 0px #453f3f;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 24px;

    background: #ffffff;
    grid-column-start: 2;

    margin: 25px 0;
    padding: 60px;

    border-bottom-right-radius: 32px;
    border-top-right-radius: 32px;
    box-shadow: 0px 4px 20px 0px #e8eaef;

    font-size: 24px;
    font-weight: 300;
    line-height: 33px;
    color: #4e4e4e;
  }

  .title {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1em;

    margin: 0;
    margin-bottom: 16px;

    color: #a7a7a7;
  }

  :global(input) {
    display: none;
  }

  :global(input) + label::before {
    content: url('$lib/assets/checkbox--unchecked.svg');
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;

    width: 40px;
    height: 40px;
  }

  :global(input):checked + label::before {
    content: url('$lib/assets/checkbox--checked.svg');
  }

  :global(input):checked + label {
    text-decoration: line-through;
  }
</style>
