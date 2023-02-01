<script lang="ts">
  import InfoPanel from './InfoPanel.svelte';
  import OffsetInput from './OffsetInput.svelte';
  import type { OffsetName, Styles } from './_styles';

  export let currentStyles: Styles;
  export let onInput: (
    name: OffsetName
  ) => (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
  export let onSwitchImagePosition: () => void;

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
        <svelte:fragment slot="description">
          <span>
            With position set to "sticky", the element is treated as relatively positioned until its
            containing block crosses a specified threshold, in which case it will stick to that
            threshold.
          </span>
          <span>
            This element is naturally positioned at the top in the markup. It will never stick to
            the bottom with this setting, as once the scroll position is back to initial, the
            element will be re-positioned back to its relative position.
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

    {#if name === 'right'}
      <InfoPanel>
        <svelte:fragment slot="title">Why isn't the right value being respected?</svelte:fragment>
        <svelte:fragment slot="description">
          <span>
            Same as the case with the bottom value, this element is naturally positioned on the left
            in the markup. It will never stick to the right side with this setting, as once the
            scroll position is back to initial, the element will be re-positioned back to its
            relative position.
          </span>
        </svelte:fragment>
      </InfoPanel>
    {/if}
  </OffsetInput>
{/each}
