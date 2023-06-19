<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import Page from '$lib/Page.svelte';
  import Code from '$lib/components/Code.svelte';
  import Header from '$lib/Header.svelte';

  import img from '$lib/assets/grace-hopper.jpg';

  import rules from './_rules';
  import writableStyles, {
    defaultStyles,
    generateCss,
    type OffsetName,
    type Styles
  } from './_styles';

  import InputPosition from './InputPosition.svelte';

  import InfoPanel from './InfoPanel.svelte';
  import OffsetAbsolute from './OffsetAbsolute.svelte';
  import OffsetRelative from './OffsetRelative.svelte';
  import OffsetFixed from './OffsetFixed.svelte';
  import OffsetSticky from './OffsetSticky.svelte';
  import FillerText from './FillerText.svelte';

  const components = {
    relative: OffsetRelative,
    absolute: OffsetAbsolute,
    fixed: OffsetFixed,
    sticky: OffsetSticky
  } as { [key: string]: typeof SvelteComponent };

  $: currentStyles = defaultStyles;
  $: currentPosition = defaultStyles.child.position;

  $: css = generateCss(currentStyles);
  $: cssText = `
.parent {
  ${css.parent}
}

.child {
  ${css.child}
}`;

  const updateStyles = (update: (n: Styles) => void) => {
    writableStyles.update((s: Styles) => {
      update(s);
      currentStyles = s;
      return s;
    });
  };

  const resetOffset = (name: OffsetName) => updateStyles((s) => s.child[name]?.update('auto'));
  const updateOffset = (name: OffsetName, value: number) =>
    updateStyles((s) => s.child[name]?.update(value, 'px'));

  const handleInputOffset =
    (name: OffsetName) => (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
      e.currentTarget.value.length === 0
        ? resetOffset(name)
        : updateOffset(name, Number(e.currentTarget.value));
    };

  $: imageOnTop = true;
  const switchImagePositionInMarkup = () => (imageOnTop = !imageOnTop);

  $: {
    updateStyles((s) => {
      delete s.parent.direction;
      imageOnTop = true;

      s.parent.position.update(currentPosition.value === 'absolute' ? 'relative' : 'static');
      s.child.position.update(currentPosition.value);
    });
  }
</script>

<Page>
  <Header
    slot="header"
    heading="CSS position"
    subheading="No flex, no grid, just position."
    completedDate="1 February 2023"
  />
  <div class="container" slot="content">
    <div class="view-container">
      <div class="asset">
        <div class="parent" style={css.parent}>
          {#if imageOnTop === true}
            <div class="child" style={css.child}>
              <img class="image" src={img} alt="Grace Hopper" />
            </div>
          {/if}
          <FillerText />
          {#if imageOnTop === false}
            <div class="child" style={css.child}>
              <img class="image" src={img} alt="Grace Hopper" />
            </div>
          {/if}
        </div>
      </div>
      <Code content={cssText} language="css" />
    </div>
    <div class="input-container">
      <InputPosition bind:currentPosition />
      {#if rules[currentPosition.value]?.moves}
        <p>and offset it</p>
        <svelte:component
          this={components[currentPosition.value]}
          bind:currentStyles
          onInput={handleInputOffset}
          onUpdate={updateStyles}
          onSwitchImagePosition={switchImagePositionInMarkup}
        />
      {/if}
    </div>
  </div>
</Page>

<style>
  .container {
    flex: 1;

    width: 100%;
    padding: 48px 0;

    display: grid;
    gap: 48px;
  }

  .view-container,
  .input-container {
    width: 100%;
  }

  .view-container {
    display: flex;
    flex-direction: column;

    gap: 48px;
  }

  .parent,
  .child {
    border: 4px solid;
  }

  .parent {
    max-height: 420px;

    padding: 24px;
    border-color: #1d3557;
    border-radius: var(--border-radius);
  }

  .child {
    width: 150px;
    height: 150px;

    border-color: #e63946;
    border-radius: 50%;

    overflow: hidden;
  }

  .image {
    width: 100%;
    height: 100%;

    object-fit: contain;
  }

  .input-container {
    border: 1px solid var(--primary-border-color);
    border-radius: var(--border-radius);

    padding: 2rem;

    box-sizing: border-box;
  }

  .input-container p {
    margin-bottom: 0.25em;
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-columns: repeat(2, 1fr);

      max-width: 70%;
      margin: auto;
    }

    .input-container {
      padding: 3rem;
    }
  }
</style>
