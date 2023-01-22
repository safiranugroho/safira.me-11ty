<script>
  import Page from '$lib/Page.svelte';

  /**
   * TODO:
   * 1. Slider for each filter
   * 2. Browser compatibility
   * 3. Short description of what each filter is
   */

  /** @type {Record<string, any>}*/
  const filters = {
    blur: {
      unit: 'px',
      default: 0,
      min: 0,
      max: 50
    },
    brightness: {
      unit: '%',
      default: 100,
      min: 0,
      max: 200
    },
    contrast: {
      unit: '%',
      default: 100,
      min: 0,
      max: 200
    },
    grayscale: {
      unit: '%',
      default: 0,
      min: 0,
      max: 100
    },
    'hue-rotate': {
      unit: 'deg',
      default: 0,
      min: 0,
      max: 360
    },
    invert: {
      unit: '%',
      default: 0,
      min: 0,
      max: 100
    },
    opacity: {
      unit: '%',
      default: 100,
      min: 0,
      max: 100
    },
    saturate: {
      unit: '%',
      default: 0,
      min: 0,
      max: 100
    },
    sepia: {
      unit: '%',
      default: 0,
      min: 0,
      max: 100
    }
  };

  /** @type Array<string> */
  let all = [];

  /** @type {Record<string, any>}*/
  let sizes = {};

  const getSizes = () =>
    (sizes = all.length
      ? all.reduce(
          (a, s) => ({
            ...a,
            [s]: sizes[s] ?? { ...filters[s], value: filters[s].default }
          }),
          {}
        )
      : {});

  $: css = Object.entries(sizes).length
    ? Object.entries(sizes).reduce((a, [name, s]) => a + ' ' + `${name}(${s.value}${s.unit})`, '')
    : 'none';
</script>

<Page>
  <div class="container" slot="content">
    <p>Dimensions: 50px</p>
    <div class="circles" style="--filter: {css}">
      <div class="circle red" />
      <div class="circle yellow" />
      <div class="circle blue" />
    </div>
    <div class="filter-input">
      {#each Object.keys(filters) as filter}
        <label
          ><input
            type="checkbox"
            bind:group={all}
            name="filter"
            value={filter}
            on:change={getSizes}
          />{filter}</label
        >
      {/each}
      <p>filter: {css}</p>
      {#each Object.entries(sizes) as [s, a]}
        <div class="range">
          <p>{s}: {a.value}{a.unit}</p>
          <span class="min">{a.min}{a.unit}</span><input
            type="range"
            bind:value={a.value}
            min={a.min}
            max={a.max}
          /><span class="max">{a.max}{a.unit}</span>
        </div>
      {/each}
    </div>
  </div>
</Page>

<style>
  .circles {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 24px;

    margin: auto;

    filter: var(--filter);
  }

  .circle {
    height: 50px;
    width: 50px;

    border-radius: 50%;
  }

  .red {
    background: red;
  }
  .yellow {
    background: yellow;
  }
  .blue {
    background: blue;
  }

  .filter-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .range {
    display: flex;
    gap: 12px;
    align-items: center;
  }
</style>
