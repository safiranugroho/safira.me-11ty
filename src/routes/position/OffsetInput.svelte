<script lang="ts">
  import { onMount } from 'svelte';
  import InfoButton from './InfoButton.svelte';
  import InfoPanel from './InfoPanel.svelte';
  import writeableStyles, { P, type OffsetName, type Styles } from './_styles';

  export let name: OffsetName;
  export let value: string | number | undefined;
  export let label: string;
  export let onInput: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;

  $: showButton = false;
  $: showPanel = false;
  const togglePanel = () => (showPanel = !showPanel);

  onMount(() => {
    writeableStyles.subscribe((s) => {
      if (name === 'bottom' && typeof value === 'number') {
        showButton = typeof s.child.top?.value === 'number' || showPanel;
      }

      if (name === 'right' && typeof value === 'number') {
        showButton = typeof s.child.left?.value === 'number' || showPanel;
      }
    });
  });
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
{#if showPanel}<slot />{/if}

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
