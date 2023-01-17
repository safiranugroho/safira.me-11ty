<script>
  import Page from '$lib/Page.svelte';

  import keyboard from '$lib/assets/keyboard.png';
  import podcast from '$lib/assets/podcast.png';
  import tip from '$lib/assets/tip.png';

  const doodles = [
    {
      path: '/keyboard',
      name: 'Keyboard',
      cover: keyboard
    },
    {
      path: '/podcast-episodes',
      name: 'Podcast episodes',
      cover: podcast
    },
    {
      path: '/tip-calculator',
      name: 'Tip calculator',
      cover: tip
    }
  ];
</script>

<Page>
  <div slot="content" class="content">
    <h1 class="title">Doodles by Safira. 🖍️</h1>
    <p>A collection of HTML/CSS/JS doodles, inspired by various prompts.</p>
    <div class="doodle-list">
      {#each doodles as { path, name, cover }}
        <div class="doodle">
          <img src={cover} alt={`Cover art for ${name}`} />
          <a href={path}>{name}</a>
        </div>
      {/each}
    </div>
  </div>
</Page>

<style>
  .content {
    width: 100%;
    margin: auto;
  }

  .title {
    margin: 0;
  }

  .doodle-list {
    margin-top: 72px;

    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .doodle {
    flex: 1;

    border: 1px solid var(--border-color);
    border-radius: 20px;

    text-align: center;
    color: #ffffff;
    font-weight: 700;

    display: flex;
    flex-direction: column;

    overflow: hidden;
  }

  .doodle > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .doodle > a {
    border-top: 1px solid var(--border-color);
    padding: 24px;
  }

  @media screen and (min-width: 768px) {
    .content {
      width: 70%;
    }

    .doodle-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 1024px) {
    .content {
      width: 50%;
    }

    .doodle-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
