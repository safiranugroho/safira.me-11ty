<script lang="ts">
  import { onMount } from 'svelte';

  import Page from '$lib/Page.svelte';
  import Code from '$lib/Code.svelte';
  import Header from '$lib/Header.svelte';

  import img from '$lib/assets/grace-hopper.jpg';

  import styles, {
    defaultStyles,
    generateCssText,
    generateCssVars,
    generateCssVarsForClass,
    type Positions
  } from './_styles';

  const rules: { [key: string]: any } = {
    static: {
      text: 'as is',
      moves: false,
      stacks: 'never'
    },
    relative: {
      text: 'relative to itself',
      moves: true,
      stacks: 'when z-index is not auto'
    },
    absolute: {
      text: 'relative to its parent',
      moves: true,
      stacks: 'when z-index is not auto'
    },
    fixed: {
      text: 'relative to the viewport',
      moves: true,
      stacks: 'always'
    },
    sticky: {
      text: 'so it keeps its position on scroll',
      moves: true,
      stacks: 'always'
    }
  };

  $: cssVars = {
    parent: generateCssVarsForClass(defaultStyles.parent),
    child: generateCssVarsForClass(defaultStyles.child)
  };

  $: cssText = generateCssText(defaultStyles);

  const { position, ...positions } = defaultStyles.child;
  $: currentPositionName = position;
  $: currentPositions = positions;
  $: positionNames = Object.keys(currentPositions) as Array<keyof Positions>;

  onMount(() => {
    styles.subscribe((s) => {
      const { position, ...positions } = s.child;
      currentPositionName = position;
      currentPositions = positions;
    });
  });

  const handlePositionInput =
    (name: keyof Positions) => (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
      styles.update((s) => {
        e.currentTarget.value.length === 0
          ? s.child[name]?.update('auto')
          : s.child[name]?.update(Number(e.currentTarget.value), 'px');

        return s;
      });
    };

  $: {
    styles.update((s) => {
      s.parent.position.update(currentPositionName.value === 'absolute' ? 'relative' : 'static');
      s.child.position.update(currentPositionName.value);

      cssVars = generateCssVars(s);
      cssText = generateCssText(s);
      return s;
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
      <div>
        <label for="position">I want to position the picture</label>
        <select
          bind:value={currentPositionName.value}
          name="position"
          id="position"
          class="position"
        >
          {#each Object.entries(rules) as [name, { text }]}
            <option value={name} class="position-option">{text}</option>
          {/each}
        </select>
      </div>
      <div>
        {#if rules[currentPositionName.value]?.moves}
          {#each positionNames as name}
            <div>
              <label for={name}>{name}</label>
              <input
                {name}
                id={name}
                type="number"
                on:input={handlePositionInput(name)}
                placeholder="auto"
              />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</Page>

<style>
  .container {
    flex: 1;

    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 48px;
  }

  .view-container,
  .input-container {
    flex: 1;
  }

  .view-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    gap: 36px;
  }

  .input-container {
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
    width: 420px;

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
    }
  }
</style>
