<script lang="ts">
  import HorizontalOffsetInfoPanel from './HorizontalOffsetInfoPanel.svelte';
  import InputOffset, { type OnInput } from './InputOffset.svelte';
  import VerticalOffsetInfoPanel from './VerticalOffsetInfoPanel.svelte';
  import { P, type OffsetName, type Styles } from './_styles';

  export let currentStyles: Styles;
  export let onInput: (name: string) => OnInput;
  export let onUpdate: (f: (s: Styles) => void) => void;

  const positions = ['top', 'bottom', 'left', 'right'] as Array<OffsetName>;
</script>

{#each positions as name}
  <InputOffset
    {name}
    value={currentStyles.child[name]?.value}
    label={`pixels from the ${name}`}
    onInput={onInput(name)}
  >
    {#if name === 'bottom'}<VerticalOffsetInfoPanel {onUpdate} />{/if}
    {#if name === 'right'}
      <HorizontalOffsetInfoPanel {onUpdate}>
        <svelte:fragment>
          <span>
            Alternatively, while it's not recommended to do this, watch what happens if both left
            and right values stay set, and the containing block's text direction is set to
            <button
              class="inline-button"
              on:click={() => onUpdate((s) => (s.parent.direction = P('rtl')))}
            >
              right-to-left ("rtl")
            </button>.
          </span>
          <button class="inline-button" on:click={() => onUpdate((s) => delete s.parent.direction)}>
            Reset back to default ("ltr").
          </button>
        </svelte:fragment>
      </HorizontalOffsetInfoPanel>
    {/if}
  </InputOffset>
{/each}
