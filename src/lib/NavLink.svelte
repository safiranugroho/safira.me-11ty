<script context="module">
  /**
   * @type {Record<string, any>}
   */
  let current = {};
</script>

<script>
  import { getContext } from 'svelte';
  import { page } from '$app/stores';

  import arrowPrev from '$lib/assets/arrow-prev.png';
  import arrowNext from '$lib/assets/arrow-next.png';

  /** @type {boolean} */
  export let prev = false;

  const doodles = getContext('doodles');

  page.subscribe((p) => {
    const doodle = doodles[p.url.pathname];
    if (doodle && current.name !== doodle.name) {
      current = doodle;
    }
  });

  let url = prev ? current?.prev : current?.next;
  let title = url && doodles[url].name;
  let icon = prev ? arrowPrev : arrowNext;

  let alignText = prev ? 'left' : 'right';
  let alignItems = prev ? 'start' : 'end';
  let direction = prev ? 'row' : 'row-reverse';
</script>

{#if url}
  <a
    href={url}
    title="Link to previous doodle"
    class="nav-link"
    style="--align-text: {alignText}; --align-items: {alignItems}; --direction: {direction}"
  >
    <img src={icon} alt="Previous doodle" class="nav-icon" />
    <p class="nav-text">{title}</p>
  </a>
{:else}
  <a
    href="/"
    title="Back to home"
    class="nav-link"
    style="--align-text: {alignText}; --align-items: {alignItems}; --direction: {direction}"
  >
    <img src={icon} alt="Back to home" class="nav-icon" />
    <p class="nav-text">Home</p>
  </a>
{/if}

<style>
  .nav-link {
    padding: 2px;
    border: 1px solid transparent;

    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: var(--align-items);

    font-size: 12px;
    text-align: var(--align-text);
  }

  .nav-text {
    margin: 0;
  }

  .nav-icon {
    width: 18px;
    height: 18px;
  }

  .nav-link:hover,
  .nav-link:focus,
  .nav-link:focus-visible {
    border: 1px solid var(--border-color);
  }

  @media screen and (min-width: 768px) {
    .nav-link {
      flex-direction: var(--direction);
      gap: 8px;
      align-items: center;
    }
  }
</style>
