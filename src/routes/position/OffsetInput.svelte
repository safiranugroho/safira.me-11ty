<script lang="ts">
  import { onMount } from 'svelte';
  import InfoButton from './InfoButton.svelte';
  import InfoPanel from './InfoPanel.svelte';
  import writeableStyles, { P, type OffsetName, type Styles } from './_styles';

  export let name: OffsetName;
  export let value: string | number | undefined;
  export let label: string;
  export let onInput: (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
  export let onUpdate: (f: (s: Styles) => void) => void;

  $: showButton = false;
  $: showPanel = false;
  const togglePanel = () => (showPanel = !showPanel);

  $: showDirectionAlt = false;
  onMount(() => {
    writeableStyles.subscribe((s) => {
      if (name === 'bottom' && typeof value === 'number') {
        showButton = typeof s.child.top?.value === 'number' || showPanel;
      }

      if (name === 'right' && typeof value === 'number') {
        showButton = typeof s.child.left?.value === 'number' || showPanel;
        showDirectionAlt =
          s.child.position?.value === 'absolute' || s.child.position?.value === 'sticky';
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

{#if name === 'bottom' && showPanel}
  <InfoPanel>
    <svelte:fragment slot="title">Why isn't the bottom value being respected?</svelte:fragment>
    <svelte:fragment slot="description"
      >If both top and bottom are specified (not "auto"), the top value wins and the bottom value is
      ignored. Try
      <button class="inline-button" on:click={() => onUpdate((s) => s.child.top?.update('auto'))}>
        resetting the top value
      </button>
      and see what happens!
    </svelte:fragment>
  </InfoPanel>
{/if}

{#if name === 'right' && showPanel}
  <InfoPanel>
    <svelte:fragment slot="title">Why isn't the right value being respected?</svelte:fragment>
    <svelte:fragment slot="description">
      <span>
        This is because the text you're reading is written in English, which has a directionality of
        left-to-right ("ltr"), set by your user agent. In this text directionality, if both left and
        right are specified (not "auto"), the left value wins and the right value is ignored. Try
        <button
          class="inline-button"
          on:click={() => onUpdate((s) => s.child.left?.update('auto'))}
        >
          resetting the left value
        </button>
        and see what happens!
      </span>
      {#if showDirectionAlt}
        <span>
          Alternatively, while it's not recommended to do this, watch what happens if both left and
          right values stay set, and the containing block's text direction is set to
          <button
            class="inline-button"
            on:click={() => onUpdate((s) => (s.parent.direction = P('rtl')))}
          >
            right-to-left ("rtl")
          </button>.
          <button
            class="inline-button"
            on:click={() => onUpdate((s) => s.parent.direction?.update('ltr'))}
          >
            (Reset back to "ltr".)
          </button>
        </span>
      {/if}
    </svelte:fragment>
  </InfoPanel>
{/if}

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

  .inline-button {
    border: none;
    padding: 0;
    text-decoration: underline;
    text-align: inherit;
    display: inline;
  }
</style>
