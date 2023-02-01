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
  export let onSwitchImagePosition: () => void;

  $: showButton = false;
  $: showPanel = false;
  const togglePanel = () => (showPanel = !showPanel);

  $: position = '';

  onMount(() => {
    writeableStyles.subscribe((s) => {
      position = s.child.position?.value as string;

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

{#if name === 'bottom' && position === 'absolute' && showPanel}
  <InfoPanel>
    <svelte:fragment slot="title">Why isn't the bottom value being respected?</svelte:fragment>
    <svelte:fragment slot="description">
      If both top and bottom are specified (not "auto"), the top value wins and the bottom value is
      ignored. Try
      <button class="inline-button" on:click={() => onUpdate((s) => s.child.top?.update('auto'))}>
        resetting the top value
      </button>
      and see what happens!
    </svelte:fragment>
  </InfoPanel>
{/if}

{#if name === 'bottom' && position === 'sticky' && showPanel}
  <InfoPanel>
    <svelte:fragment slot="title">Why isn't the bottom value being respected?</svelte:fragment>
    <svelte:fragment slot="description">
      <span>
        With position set to "sticky", the element is treated as relatively positioned until its
        containing block crosses a specified threshold, in which case it will stick to that
        threshold.
      </span>
      <span>
        This element is naturally positioned at the top in the markup. It will never stick to the
        bottom with this setting, as once the scroll position is back to initial, the element will
        be re-positioned back to its relative position.
      </span>
      <span>
        Try moving the element
        <button class="inline-button" on:click={onSwitchImagePosition}>
          to the bottom in the markup
        </button> and see what happens!
      </span>
      <span>
        <button class="inline-button" on:click={onSwitchImagePosition}>
          (Switch it back to the top.)</button
        >
      </span>
    </svelte:fragment>
  </InfoPanel>
{/if}

{#if name === 'right' && position === 'absolute' && showPanel}
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
      {#if position === 'absolute'}
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

{#if name === 'right' && position === 'sticky' && showPanel}
  <InfoPanel>
    <svelte:fragment slot="title">Why isn't the right value being respected?</svelte:fragment>
    <svelte:fragment slot="description">
      <span>
        Same as the case with the bottom value, this element is naturally positioned on the left in
        the markup. It will never stick to the right side with this setting, as once the scroll
        position is back to initial, the element will be re-positioned back to its relative
        position.
      </span>
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
