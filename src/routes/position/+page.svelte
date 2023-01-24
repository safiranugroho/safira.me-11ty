<script lang="ts">
  import { writable } from 'svelte/store';

  import Page from '$lib/Page.svelte';
  import Code from '$lib/Code.svelte';
  import Header from '$lib/Header.svelte';

  import img from '$lib/assets/grace-hopper.jpg';

  const positions = {
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

  const defaultStyle = {
    parent: {
      '--position': 'static'
    },
    child: {
      '--position': 'static',
      '--top': '0px',
      '--left': '0px',
      '--bottom': '0px',
      '--right': '0px'
    }
  };

  const style = writable(defaultStyle);

  const generateVars = (o: { [s: string]: string }) =>
    Object.entries(o).reduce((a, [k, v]) => `${a}${k}: ${v};`, '');

  $: parentVars = generateVars(defaultStyle.parent);
  $: childVars = generateVars(defaultStyle.child);

  $: css = `
  .parent {
    overflow: scroll;
    ${parentVars.replaceAll('--', '').replaceAll(';', ';\n' + ' '.repeat(4))}
  }

  .child {
    ${childVars.replaceAll('--', '').replaceAll(';', ';\n' + ' '.repeat(4))}
  }`;

  let childPosition = defaultStyle.child['--position'];

  $: {
    style.update((s) => {
      if (childPosition === 'absolute') {
        s.parent['--position'] = 'relative';
        s.child['--position'] = childPosition;
      } else {
        s.parent['--position'] = 'static';
        s.child['--position'] = childPosition;
      }

      parentVars = generateVars(s.parent);
      childVars = generateVars(s.child);
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
        <div class="parent" style={parentVars}>
          <div class="child" style={childVars}>
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
              from a computer program. Her associates found a moth that was stuck in a relay,
              impending operation, and hence they were "debugging" the system.
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
      <Code content={css} language="css" />
    </div>
    <div class="input-container">
      <div>
        <label for="child-position">I want to position the picture</label>
        <select
          bind:value={childPosition}
          name="child-position"
          id="child-position"
          class="child-position"
        >
          {#each Object.entries(positions) as [name, { text }]}
            <option value={name} class="child-position-option">{text}</option>
          {/each}
        </select>
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
    border: 1px solid;
  }

  .parent {
    max-height: 420px;
    width: 420px;

    overflow: scroll;

    padding: 24px;
    border-color: var(--primary-border-color);
    border-radius: var(--border-radius);
  }

  .child {
    width: 150px;
    height: 150px;

    border-color: transparent;
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
