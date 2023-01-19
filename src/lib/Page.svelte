<script>
  import { setContext } from 'svelte';
  import keyboard from '$lib/assets/keyboard.png';
  import tip from '$lib/assets/tip.png';
  import weather from '$lib/assets/weather.png';
  import rps from '$lib/assets/rps.png';

  const doodles = {
    '/keyboard': {
      name: 'Keyboard',
      cover: keyboard,
      next: '/tip-calculator'
    },
    '/tip-calculator': {
      prev: '/keyboard',
      name: 'Tip calculator',
      cover: tip,
      next: '/weather'
    },
    '/weather': {
      prev: '/tip-calculator',
      name: 'Weather forecast',
      cover: weather
    },
    '/rps': {
      prev: '/weather',
      name: 'Rock paper scissors',
      cover: rps
    }
  };

  setContext('doodles', doodles);

  export let background = '#ffffff';
</script>

<div class="page" style="--background: {background};">
  <div class="header"><slot name="header" /></div>
  <div class="content"><slot name="content" /></div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Toto:wght@400;700&display=swap');

  :global(html) {
    height: 100%;
  }

  :global(body) {
    font-family: 'Noto Serif Toto', serif;

    min-height: 100%;
    margin: 0;

    color: var(--primary-text-color);
  }

  :global(a, a:visited) {
    color: var(--primary-text-color);
  }

  :global(a:hover, a:focus, a:focus-visible) {
    color: var(--secondary-text-color);
  }

  .page {
    padding: 0 36px;

    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    display: flex;
    flex-direction: column;

    background: var(--background);

    min-height: 100%;
    height: fit-content;

    overflow: scroll;
  }

  .header {
    margin-top: 60px;
  }

  .content {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: auto;
    margin-top: 32px;
    margin-bottom: 60px;
  }
</style>
