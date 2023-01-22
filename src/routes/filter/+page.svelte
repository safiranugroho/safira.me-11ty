<script>
  // @ts-nocheck

  /**
   * TODO:
   * 1. Slider for each filter
   * 2. Browser compatibility
   * 3. Short description of what each filter is
   */

  const filters = {
    blur: 'blur(5px)',
    brightness: 'brightness(0.4)',
    contrast: 'contrast(200%)',
    dropShadow: 'drop-shadow(16px 16px 20px blue)',
    grayscale: 'grayscale(50%)',
    hueRotate: 'hue-rotate(90deg)',
    invert: 'invert(75%)',
    opacity: 'opacity(25%)',
    saturate: 'saturate(30%)',
    sepia: 'sepia(60%)'
  };

  let selectedFilter = '';
</script>

<div class="container">
  <div class="circles" style="--filter: {filters[selectedFilter]}">
    <div class="circle red" />
    <div class="circle yellow" />
    <div class="circle blue" />
  </div>
  <select name="filter" class="filter" id="filter" bind:value={selectedFilter}>
    <option value="">Select a filter</option>
    {#each Object.keys(filters) as filter}
      <option value={filter}>{filter}</option>
    {/each}
  </select>
</div>

<style>
  .container {
    height: 100vh;
    width: 50%;
    margin: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .circles {
    display: flex;
    flex-direction: row;
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

  .filter {
    margin: 64px;
  }
</style>
