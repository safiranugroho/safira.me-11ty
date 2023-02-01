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
  </OffsetInput>
{/each}
