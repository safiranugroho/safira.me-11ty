<script lang="ts">
  import InfoButton from './InfoButton.svelte';
  import InfoPanel from './InfoPanel.svelte';
  import type { Offsets } from './_styles';

  export let name: keyof Offsets;
  export let value: string | number | undefined;
  export let label: string;
  export let onInput: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;

  $: showButton = typeof value === 'number';
  $: showPanel = false;
  const togglePanel = () => (showPanel = !showPanel);
</script>

<div class="position-offset-input-container">
  <input
    {name}
    id={name}
    type="number"
    placeholder="auto"
    class="position-offset-input"
    on:input={onInput}
    {value}
  />
  <label for={name}>{label}</label>
  {#if showButton}<InfoButton onClick={togglePanel} />{/if}
</div>

{#if showPanel}<InfoPanel />{/if}

<style>
  .position-offset-input-container {
    margin: 0.5em 0;
    display: flex;
    gap: 0.5em;
    align-items: center;
  }

  .position-offset-input {
    all: unset;

    border: 1px solid var(--primary-border-color);
    border-radius: var(--border-radius);

    font-weight: 700;
    padding: 0.5em;

    width: 4em;
  }
</style>
