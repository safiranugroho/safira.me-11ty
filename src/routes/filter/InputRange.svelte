<script lang="ts">
  import { onMount } from 'svelte';
  import filters from './_filters';

  export let name: string;
  export let min: number;
  export let max: number;

  $: value = 0;

  onMount(() => {
    filters.subscribe((f) => {
      value = f[name].value;
    });
  });

  const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    filters.update((f) => {
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
