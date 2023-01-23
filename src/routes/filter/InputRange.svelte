<script>
  import { onMount } from 'svelte';
  import filters from './filters';

  /** @type {string} */
  export let name;

  /** @type {number} */
  export let min;

  /** @type {number} */
  export let max;

  /** @type {number | null} */
  $: value = null;

  onMount(() => {
    filters.subscribe((/** @type {Record<string, any>} */ f) => {
      value = f[name].value;
    });
  });

  const handleInput = (
    /**
     * @event ChangeEvent<HTMLInputElement>
     * @type {Event & { currentTarget: EventTarget & HTMLInputElement; }}
     */ e
  ) => {
    filters.update((/** @type {Record<string, any>} */ f) => {
      f[name].update(Number(e.currentTarget.value));
      return f;
    });
  };
</script>

<input class="range-slider" type="range" bind:value on:input={handleInput} {min} {max} />

<style>
  .range-slider {
    width: 100%;
  }
</style>
