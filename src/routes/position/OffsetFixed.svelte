<script lang="ts">
  import InfoPanel from './InfoPanel.svelte';
  import OffsetInput, { type OnInput } from './OffsetInput.svelte';
  import type { OffsetName, Styles } from './_styles';

  export let currentStyles: Styles;
  export let onInput: (name: string) => OnInput;
  export let onUpdate: (f: (s: Styles) => void) => void;

  const positions = ['top', 'bottom', 'left', 'right'] as Array<OffsetName>;
</script>

{#each positions as name}
  <OffsetInput
    {name}
    value={currentStyles.child[name]?.value}
    label={`pixels from the ${name}`}
    onInput={onInput(name)}
  >
    {#if name === 'bottom'}
      <InfoPanel>
        <svelte:fragment slot="title">Why isn't the bottom value being respected?</svelte:fragment>
        <span slot="description">
          If both top and bottom are specified (not "auto"), the top value wins and the bottom value
          is ignored. Try
          <button
            class="inline-button"
            on:click={() => onUpdate((s) => s.child.top?.update('auto'))}
          >
            resetting the top value
          </button>
          and see what happens!
        </span>
      </InfoPanel>
    {/if}
    {#if name === 'right'}
      <InfoPanel>
        <svelte:fragment slot="title">Why isn't the right value being respected?</svelte:fragment>
        <span slot="description">
          This is because the text you're reading is written in English, which has a directionality
          of left-to-right ("ltr"), set by your user agent. In this text directionality, if both
          left and right are specified (not "auto"), the left value wins and the right value is
          ignored. Try
          <button
            class="inline-button"
            on:click={() => onUpdate((s) => s.child.left?.update('auto'))}
          >
            resetting the left value
          </button>
          and see what happens!
        </span>
      </InfoPanel>
    {/if}
  </OffsetInput>
{/each}
