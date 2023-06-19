<script lang="ts">
  import HorizontalOffsetInfoPanel from './HorizontalOffsetInfoPanel.svelte';
  import type { OnInput } from './InputOffset.svelte';
  import Offsets from './Offsets.svelte';
  import VerticalOffsetInfoPanel from './VerticalOffsetInfoPanel.svelte';
  import type { Styles } from './_styles';

  export let currentStyles: Styles;
  export let onInput: (name: string) => OnInput;
  export let onUpdate: (f: (s: Styles) => void) => void;
</script>

<Offsets bind:currentStyles {onInput}>
  <VerticalOffsetInfoPanel slot="vertical-offset-info" {onUpdate} />
  <HorizontalOffsetInfoPanel slot="horizontal-offset-info" {onUpdate} />
</Offsets>
