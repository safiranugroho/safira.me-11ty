<script lang="ts">
  import { onMount } from 'svelte';
  import rules from './_rules';
  import type { Property } from './_styles';

  export let currentPosition: Property;

  $: selectWidth = '';

  onMount(() => {
    const selectEl = document.querySelector('.position-select') as HTMLElement;
    const helperEl = document.querySelector('.position-select-helper') as HTMLElement;

    selectWidth = `${helperEl.offsetWidth}px`;

    selectEl?.addEventListener('change', (event) => {
      // @ts-ignore
      helperEl.innerHTML = event.target.querySelector('option:checked').innerText;
      selectWidth = `${helperEl.offsetWidth}px`;
    });
  });
</script>

<div class="position-select-container">
  <label for="position">I want to position the picture</label>
  <select
    bind:value={currentPosition.value}
    name="position"
    id="position"
    class="position-select"
    style="--size: {selectWidth}"
  >
    {#each Object.entries(rules) as [name, { text }]}
      <option value={name} class="position-option">{text}</option>
    {/each}
  </select>
</div>

<strong class="position-select-helper" aria-hidden="true">{currentPosition.value}</strong>

<style>
  .position-select-container {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .position-select {
    border: 1px solid var(--primary-border-color);
    border-radius: var(--border-radius);

    font-weight: 700;
    padding: 0.5em;

    width: 100%;
    box-sizing: border-box;
  }

  .position-select:hover,
  .position-select:focus-visible {
    color: var(--secondary-text-color);
    border-color: var(--secondary-border-color);
    text-decoration: underline;
  }

  .position-select-helper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99999;
    color: transparent;
  }

  @media screen and (min-width: 1024px) {
    .position-select {
      width: var(--size);
      box-sizing: content-box;
    }
  }
</style>
