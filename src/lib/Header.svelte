<script context="module">
  /**
   * @type {Record<string, any>}
   */
  let current = {};
</script>

<script>
  import { getContext } from 'svelte';
  import { page } from '$app/stores';

  import prev from '$lib/assets/arrow-prev.png';
  import next from '$lib/assets/arrow-next.png';
  import HomeLink from './HomeLink.svelte';

  /**
   * @type {string}
   */
  export let heading;
  /**
   * @type {string}
   */
  export let subheading;
  /**
   * @type {string}
   */
  export let completedDate;

  const doodles = getContext('doodles');

  page.subscribe((p) => {
    const doodle = doodles[p.url.pathname];
    if (doodle && current.name !== doodle.name) {
      current = doodle;
    }
  });
</script>

<div class="header">
  {#if current.prev}<a href={current.prev} title="Link to previous doodle"
      ><img src={prev} alt="Previous doodle" class="nav-link" /></a
    >{:else}
    <HomeLink />{/if}
  <div class="sections">
    <div class="header-section">
      <h1 class="heading">{heading}</h1>
      <h2 class="subheading">{subheading}</h2>
    </div>
    <div class="header-section">
      <p class="metadata">
        <span class="metadata-label">Completed at:</span><span>{completedDate}</span>
      </p>
      <p class="metadata">
        <span class="metadata-label">Prompt by:</span>
        <a
          href="https://www.adventofcss.com/"
          class="external-link"
          target="_blank"
          rel="noreferrer">Advent of CSS</a
        >
      </p>
    </div>
  </div>
  {#if current.next}<a href={current.next} title="Link to next doodle"
      ><img src={next} alt="Next doodle" class="nav-link" /></a
    >{:else}
    <HomeLink />{/if}
</div>

<style>
  .header {
    min-height: 72px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }

  .nav-link {
    height: 32px;
    border: 1px solid transparent;
  }

  .nav-link:hover,
  .nav-link:focus,
  .nav-link:focus-visible {
    border: 1px solid var(--border-color);
  }

  .sections {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }

  .header-section {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header-section > * {
    margin: 4px 0;
  }

  .header-section:first-of-type {
    border-bottom: 1px solid var(--border-color);
    padding: 8px 0;
  }

  .header-section:last-of-type {
    padding: 8px 0;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .heading {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    font-style: italic;
    color: var(--primary-text-color);
  }

  .subheading {
    font-weight: 400;
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  .metadata {
    font-weight: 400;
    font-size: 12px;
    color: var(--secondary-text-color);

    display: flex;
    flex-direction: column;
  }

  .metadata > *:first-child {
    flex: 1;
    font-weight: 700;
  }

  .metadata > *:last-child {
    flex: 1;
  }

  .external-link::after {
    content: '';
    background-image: url('$lib/assets/external-link.png');
    display: inline-block;
    height: 1em;
    width: 1em;
    vertical-align: middle;
    background-size: 1em;
    background-repeat: no-repeat;
    margin-left: 0.25em;
  }

  @media screen and (min-width: 480px) {
    .metadata > *:last-child {
      flex: 2;
    }
  }

  @media screen and (min-width: 768px) {
    .sections {
      flex: 1;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 24px;
    }

    .header-section:first-of-type {
      text-align: right;
      border-bottom: none;
      border-right: 1px solid var(--border-color);
      padding: 0 24px;
    }

    .header-section:last-of-type {
      padding: unset;
      flex-direction: column;
      justify-content: unset;
      width: unset;
    }

    .metadata {
      flex-direction: row;
      line-height: 10px;
    }
  }

  @media screen and (min-width: 1024px) {
    .metadata > *:last-child {
      flex: 5;
    }
  }
</style>
