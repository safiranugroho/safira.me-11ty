<script lang="ts">
  import Page from '$lib/Page.svelte';
  import Code from '$lib/Code.svelte';
  import Header from '$lib/Header.svelte';

  import img from '$lib/assets/grace-hopper.jpg';

  import rules from './_rules';
  import writableStyles, {
    defaultStyles,
    generateCssText,
    generateCssVars,
    type OffsetName,
    type Styles
  } from './_styles';

  import PositionInput from './PositionInput.svelte';
  import OffsetInput from './OffsetInput.svelte';

  $: currentStyles = defaultStyles;
  $: currentPosition = defaultStyles.child.position;

  $: cssVars = generateCssVars(currentStyles);
  $: cssText = generateCssText(currentStyles);

  const positions = ['top', 'bottom', 'left', 'right'] as Array<OffsetName>;

  const updateStyles = (update: (n: Styles) => void) => {
    writableStyles.update((s: Styles) => {
      update(s);
      currentStyles = s;
      cssVars = generateCssVars(s);
      cssText = generateCssText(s);
      return s;
    });
  };

  const resetOffset = (name: OffsetName) => updateStyles((s) => s.child[name]?.update('auto'));
  const updateOffset = (name: OffsetName, value: number) =>
    updateStyles((s) => s.child[name]?.update(value, 'px'));

  const handleOffsetInput =
    (name: OffsetName) => (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
      e.currentTarget.value.length === 0
        ? resetOffset(name)
        : updateOffset(name, Number(e.currentTarget.value));
    };

  $: {
    updateStyles((s) => {
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
    completedDate="24 January 2023"
  />
  <div class="container" slot="content">
    <div class="view-container">
      <div class="asset">
        <div class="parent" style={cssVars.parent}>
          <div class="child" style={cssVars.child}>
            <img class="image" src={img} alt="Grace Hopper" />
          </div>
          <p class="text">
            <span>
              Grace Hopper was a pioneering computer scientist and United States Navy rear admiral.
              She was one of the first programmers of the Harvard Mark I computer, and invented the
              first compiler, an important tool that translates written code into machine language
              that a computer can understand.
            </span>
            <span>
              Hopper popularized the term "debugging" to describe the process of removing errors
              from a computer program. Her associates discovered a moth stuck in a relay and thereby
              impeding operation, whereupon she remarked that they were "debugging" the system.
            </span>
            <span>
              She also helped develop COBOL, one of the first high-level programming languages.
              Hopper's contributions to computer science and technology were significant and she is
              often referred to as the "mother of computing."
            </span>
            <span>
              Hopper was known to carry around a piece of wire that was exactly one foot long, which
              she called her "standard." She would use this wire to help explain the concept of a
              "nanosecond" (one billionth of a second) to her colleagues. It was a way to physically
              show them how small a nanosecond is and help them understand the speed at which
              computers worked.
            </span>
          </p>
        </div>
      </div>
      <Code content={cssText} language="css" />
    </div>
    <div class="input-container">
      <PositionInput bind:currentPosition />
      {#if rules[currentPosition.value]?.moves}
        <p>and offset it</p>
        {#each positions as name}
          <OffsetInput
            {name}
            value={currentStyles.child[name]?.value}
            label={`pixels from the ${name}`}
            onInput={handleOffsetInput(name)}
            onUpdate={updateStyles}
          />
        {/each}
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
    grid-template-rows: repeat(2, 1fr);
    gap: 48px;
  }

  .view-container,
  .input-container {
    width: 100%;
  }

  .view-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: 48px;
  }

  .parent,
  .child {
    border: 4px solid;
  }

  .parent {
    max-height: 420px;
    overflow: scroll;

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

  .text {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .input-container {
    border: 1px solid var(--primary-border-color);
    border-radius: var(--border-radius);

    padding: 2rem;
    font-size: 1rem;

    box-sizing: border-box;
  }

  .input-container p {
    margin-bottom: 0.25em;
  }

  .parent,
  .child {
    position: var(--position);
    top: var(--top);
    bottom: var(--bottom);
    left: var(--left);
    right: var(--right);
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-rows: unset;
      grid-template-columns: repeat(2, 1fr);

      max-width: 70%;
      margin: auto;
    }

    .input-container {
      padding: 3rem;
      font-size: 1.25rem;
    }
  }
</style>
