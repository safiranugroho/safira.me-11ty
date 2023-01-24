<script lang="ts">
  import Page from '$lib/Page.svelte';
  import Code from '$lib/Code.svelte';
  import Header from '$lib/Header.svelte';
  import { writable } from 'svelte/store';

  const defaultStyle = {
    parent: {
      '--position': 'static'
    },
    child: {
      '--position': 'static',
      '--top': '0px',
      '--bottom': '0px',
      '--left': '0px',
      '--right': '0px'
    }
  };

  const style = writable(defaultStyle);

  const generateVars = (o: { [s: string]: string }) =>
    Object.entries(o).reduce((a, [k, v]) => `${a} ${k}: ${v};`, '');

  $: parentVars = generateVars(defaultStyle.parent);
  $: childVars = generateVars(defaultStyle.child);

  $: css = `
  .parent {
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
          <div class="child" style={childVars} />
          <p class="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ullamcorper velit.
            Curabitur eleifend, sapien id porta vestibulum, leo mauris cursus eros, non pulvinar
            metus tellus a mauris. Sed in viverra nulla, id bibendum nisi. Sed cursus felis auctor,
            sagittis massa vel, ultrices ligula. Aenean non ligula et libero viverra iaculis. Donec
            orci ex, maximus eu tincidunt non, tincidunt in neque. Nam iaculis ornare aliquet.
            Integer tempor lobortis efficitur. Donec dui nisi, venenatis sed bibendum sit amet,
            finibus nec arcu. Nunc semper iaculis dui at faucibus.
          </p>
        </div>
      </div>
      <Code content={css} language="css" />
    </div>
    <div class="input-container">
      <div>
        <label for="child-position">I want to position my element</label>
        <select
          bind:value={childPosition}
          name="child-position"
          id="child-position"
          class="child-position"
        >
          <option value="static" class="static">as is</option>
          <option value="relative" class="relative">following the natural box flow</option>
          <option value="fixed" class="fixed">relative to the viewport</option>
          <option value="absolute" class="absolute">relative to my parent</option>
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

    gap: 48px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .parent {
    width: 420px;

    padding: 16px;
    border-color: red;
    border-radius: var(--border-radius);
  }

  .child {
    width: 100px;
    height: 100px;

    border-color: blue;
    border-radius: 50%;
    background-color: blue;
  }

  .parent,
  .child {
    border: 1px solid;

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
