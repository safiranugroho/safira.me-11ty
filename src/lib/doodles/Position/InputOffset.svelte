<script lang="ts" context="module">
  export type OnInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
</script>

<script lang="ts">
  import type { OffsetName } from './_styles';

  export let name: OffsetName;
  export let value: string | number | undefined;
  export let label: string;
  export let onInput: OnInput;
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
</div>

<style>
  @import '../../../global.css';

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
