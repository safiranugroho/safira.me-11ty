<script lang="ts">
  import Page from '$lib/Page.svelte';
  import Code from '$lib/Code.svelte';
  import Header from '$lib/Header.svelte';

  import img from '$lib/assets/grace-hopper.jpg';

  import rules from './_rules';
  import styles, {
    defaultStyles,
    generateCssText,
    generateCssVars,
    type Positions,
    type Styles
  } from './_styles';
  import { onMount } from 'svelte';

  $: cssVars = generateCssVars(defaultStyles);
  $: cssText = generateCssText(defaultStyles);
  $: currentPositionName = defaultStyles.child.position;

  const positionNames = ['top', 'bottom', 'left', 'right'] as Array<keyof Positions>;
  const updateStyles = (update: (n: Styles) => void) => {
    styles.update((s: Styles) => {
      update(s);
      cssVars = generateCssVars(s);
      cssText = generateCssText(s);
      return s;
    });
  };

  const handleInput =
    (name: keyof Positions) => (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
      updateStyles((s) => {
        e.currentTarget.value.length === 0
          ? s.child[name]?.update('auto')
          : s.child[name]?.update(Number(e.currentTarget.value), 'px');
      });
    };

  $: {
    updateStyles((s) => {
      s.parent.position.update(currentPositionName.value === 'absolute' ? 'relative' : 'static');
      s.child.position.update(currentPositionName.value);
    });
  }

  $: dynamicSize = '';
  onMount(() => {
    const selectEl = document.querySelector('.position-select') as HTMLElement;
    const helperEl = document.querySelector('.position-select-helper') as HTMLElement;

    dynamicSize = `${helperEl.offsetWidth}px`;

    selectEl?.addEventListener('change', (event) => {
      // @ts-ignore
      helperEl.innerHTML = event.target.querySelector('option:checked').innerText;
      dynamicSize = `${helperEl.offsetWidth}px`;
    });
  });
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
      <label for="position">I want to position the picture</label>
      <select
        bind:value={currentPositionName.value}
        name="position"
        id="position"
        class="position-select"
        style="--size: {dynamicSize}"
      >
        {#each Object.entries(rules) as [name, { text }]}
          <option value={name} class="position-option">{text}</option>
        {/each}
      </select>
      <strong class="position-select-helper" aria-hidden="true">{currentPositionName.value}</strong>
      {#if rules[currentPositionName.value]?.moves}
        {#each positionNames as name}
          <label for={name}>{name}</label>
          <input {name} id={name} type="number" on:input={handleInput(name)} placeholder="auto" />
        {/each}
      {/if}
    </div>
  </div>
</Page>

<style>
  .container {
    flex: 1;

    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

    gap: 36px;
  }

  .input-container > * {
    display: inline;
    line-height: 2em;
    margin-right: 4px;
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

  .position-select-helper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -99999;
  }

  .position-select {
    border: 1px solid var(--primary-border-color);
    border-radius: var(--border-radius);

    font-weight: 700;
    padding: 0.5em;

    width: var(--size);
    box-sizing: content-box;
  }

  .position-select:hover,
  .position-select:focus-visible {
    color: var(--secondary-text-color);
    border-color: var(--secondary-border-color);
    text-decoration: underline;
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
      max-width: 70%;
      margin: auto;
    }
  }
</style>
