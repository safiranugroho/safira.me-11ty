<script lang="ts">
  import HorizontalOffsetInfoPanel from './HorizontalOffsetInfoPanel.svelte';
  import OffsetInput, { type OnInput } from './OffsetInput.svelte';
  import VerticalOffsetInfoPanel from './VerticalOffsetInfoPanel.svelte';
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
    {#if name === 'bottom'}<VerticalOffsetInfoPanel {onUpdate} />{/if}
    {#if name === 'right'}<HorizontalOffsetInfoPanel {onUpdate} />{/if}
  </OffsetInput>
{/each}
