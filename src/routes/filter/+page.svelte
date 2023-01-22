<script>
  // @ts-nocheck
  import Prism from 'prismjs';

  import Page from '$lib/Page.svelte';
  import picture from '$lib/assets/filter-picture.jpeg';

  /**
   * TODO:
   * 1. Slider for each filter
   * 1a. Add box-shadow
   * 2. Browser compatibility
   * 3. Short description of what each filter is
   */

  let dimension = 100;

  /** @type {Record<string, any>}*/
  let filters = {
    blur: {
      unit: 'px',
      default: 0,
      value: 0,
      min: 0,
      max: dimension
    },
    brightness: {
      unit: '%',
      default: 100,
      value: 100,
      min: 0,
      max: 200
    },
    contrast: {
      unit: '%',
      default: 100,
      value: 100,
      min: 0,
      max: 200
    },
    grayscale: {
      unit: '%',
      default: 0,
      value: 0,
      min: 0,
      max: 100
    },
    'hue-rotate': {
      unit: 'deg',
      default: 0,
      value: 0,
      min: 0,
      max: 360
    },
    invert: {
      unit: '%',
      default: 0,
      value: 0,
      min: 0,
      max: 100
    },
    opacity: {
      unit: '%',
      default: 100,
      value: 100,
      min: 0,
      max: 100
    },
    saturate: {
      unit: '%',
      default: 100,
      value: 100,
      min: 0,
      max: 200
    },
    sepia: {
      unit: '%',
      default: 0,
      value: 0,
      min: 0,
      max: 100
    }
  };

  $: css = Object.entries(filters).reduce(
    (a, [name, s]) => (s.value !== s.default ? a + ' ' + `${name}(${s.value}${s.unit})` : a),
    ''
  );

  const resetToDefault = (/** @type {string} */ s) => () => {
    filters = { ...filters, [s]: { ...filters[s], value: filters[s].default } };
  };

  const resetAllToDefault = () => Object.keys(filters).forEach((s) => resetToDefault(s)());
</script>

<svelte:head>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
    rel="stylesheet"
  />
</svelte:head>

<Page>
  <div class="container" slot="content">
    <div class="view-container">
      <div class="asset" style="--filter: {css};">
        <img src={picture} class="asset-img" alt="Two people at the beach with a sun umbrella" />
      </div>
      <div class="code-container">
        <div class="code">
          {@html Prism.highlight(`filter: ${css || 'none'};`, Prism.languages.css, 'css')}
        </div>
      </div>
    </div>
    <div class="range-container">
      <button class="range-reset all" on:click={resetAllToDefault}>Reset all</button>
      {#each Object.entries(filters) as [s, a]}
        <div class="range">
          <p class="range-label">
            <span class="name">{s}</span><span class="value">{a.value}{a.unit}</span>
          </p>
          <div class="range-input">
            <input class="range-slider" type="range" bind:value={a.value} min={a.min} max={a.max} />
          </div>
          <button class="range-reset" on:click={resetToDefault(s)}>Reset</button>
        </div>
      {/each}
    </div>
  </div>
</Page>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Mono&family=Lato:wght@300;400;700;900&display=swap');

  :root {
    --primary-text-color: black;
    --secondary-text-color: grey;

    --primary-code-text-color: black;
    --secondary-code-text-color: grey;

    --button-background: #fff;
    --button-border-color: var(--border-color);
  }

  :global(.token.property) {
    color: var(--primary-code-text-color);
  }

  :global(.token.function) {
    color: var(--secondary-code-text-color);
  }

  .container {
    font-family: 'Lato', sans-serif;

    display: grid;
    width: 100%;
  }

  .view-container {
    width: 100%;

    display: grid;
    grid-template-rows: 3fr 1fr;
  }

  .asset {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 24px;

    height: fit-content;
    margin: auto;
    overflow: hidden;
  }

  .asset-img {
    filter: var(--filter);

    max-width: 100%;
    object-fit: contain;
  }

  .code-container {
    display: flex;
    align-items: end;
    margin-top: 24px;
  }

  .code {
    padding: 16px;
    width: 100%;

    border: 1px solid var(--border-color);
    color: var(--primary-code-text-color);
    border-radius: 8px;

    font-family: 'Fira Mono', monospace;
  }

  .range-container {
    width: 100%;

    margin-top: 36px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }

  .range {
    display: grid;
    grid-template-columns: 3fr 6fr 1fr;
    gap: 16px;
    align-items: center;
  }

  .range-label {
    display: flex;
    flex-direction: column;
    gap: 2px;

    margin: 0;
    padding: 8px 16px;

    background: var(--button-background);
    border: 1px solid var(--button-border-color);
    border-radius: 8px;

    color: var(--primary-text-color);
  }

  .range-label .name {
    font-family: 'Fira Mono', monospace;
    font-weight: 700;
  }

  .range-label .value {
    color: var(--secondary-text-color);
  }

  .range-input {
    width: 100%;

    display: flex;
    align-items: center;
    gap: 12px;
  }

  .range-input > input {
    width: 100%;
  }

  .range-reset {
    all: unset;

    background: var(--button-background);
    border: 1px solid var(--button-border-color);
    border-radius: 8px;

    padding: 8px 16px;

    font-weight: 700;
    text-align: center;
    color: var(--primary-text-color);

    cursor: pointer;
  }

  .range-reset:hover,
  .range-reset:focus-visible {
    color: var(--secondary-text-color);
  }

  .range-reset.all {
    width: auto;
    margin: 12px 0;
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-rows: unset;
      grid-template-columns: 1fr 1fr;
      gap: 72px;

      max-width: 1200px;

      margin: auto;
    }

    .view-container {
      height: 100%;
      grid-template-rows: 5.5fr 1fr;

      margin: auto;
    }

    .range-container {
      margin-top: 0;
    }
  }
</style>
