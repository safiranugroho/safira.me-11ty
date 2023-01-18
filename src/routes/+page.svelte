<script>
  import Page from '$lib/Page.svelte';

  import github from '$lib/assets/github.png';
  import twitter from '$lib/assets/twitter.png';
  import linkedin from '$lib/assets/linkedin.png';

  import keyboard from '$lib/assets/keyboard.png';
  import podcast from '$lib/assets/podcast.png';
  import tip from '$lib/assets/tip.png';
  import weather from '$lib/assets/weather.png';

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
    },

    {
      path: '/weather',
      name: 'Weather forecast',
      cover: weather
    }
  ];
</script>

<Page>
  <div slot="header" class="header">
    <h1 class="title">Doodles by Safira 🖍️</h1>
    <p class="desc">doodle /ˈduːd(ə)l/ - <i>verb</i>: <u>scribble</u> absent-mindedly.</p>
    <div class="socials">
      <a
        href="https://github.com/safiranugroho/safira.me/tree/doodles"
        title="Source code on GitHub"><img src={github} alt="GitHub logo" class="social-icon" /></a
      >
      <a href="https://twitter.com/hisafira/" title="Twitter"
        ><img src={twitter} alt="Twitter logo" class="social-icon" /></a
      >
      <a href="https://www.linkedin.com/in/safiranugroho/" title="LinkedIn"
        ><img src={linkedin} alt="LinkedIn logo" class="social-icon" /></a
      >
    </div>
  </div>
  <div slot="content" class="content">
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
  .header,
  .content {
    width: 100%;
    margin: auto;
  }

  .title {
    margin: 0;
  }

  .desc {
    margin-top: 0;
  }

  .socials {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .social-icon {
    width: 24px;
    height: 24px;
  }

  .doodle-list {
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
    .header,
    .content {
      width: 70%;
    }

    .doodle-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 1024px) {
    .header,
    .content {
      width: 50%;
    }

    .doodle-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
