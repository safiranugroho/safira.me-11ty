<script lang="ts">
  import OffsetInput from './OffsetInput.svelte';
  import type { OffsetName, Styles } from './_styles';

  export let currentStyles: Styles;
  export let onInput: (
    name: OffsetName
  ) => (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;

  const positions = ['top', 'bottom', 'left', 'right'] as Array<OffsetName>;
</script>

{#each positions as name}
  <OffsetInput
    {name}
    value={currentStyles.child[name]?.value}
    label={`pixels from the ${name}`}
    onInput={onInput(name)}
  />
{/each}
