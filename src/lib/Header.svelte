<script>
  import NavLink from './NavLink.svelte';

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
</script>

<div class="header">
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
      <a href="https://www.adventofcss.com/" class="external-link" target="_blank" rel="noreferrer"
        >Advent of CSS</a
      >
    </p>
  </div>
</div>

<style>
  .header {
    min-height: 72px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
  }

  .header-section {
    flex: 1;

    display: flex;
    gap: 8px;
  }

  .header-section > * {
    margin: 0;
  }

  .header-section:first-of-type {
    flex-direction: column;
    justify-content: center;

    border-bottom: 1px solid var(--border-color);
    padding: 16px 0;
  }

  .header-section:last-of-type {
    flex-direction: row;
    gap: 24px;

    padding: 8px 0;
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

    display: grid;
    grid-template-rows: repeat(2, 1fr);
  }

  .metadata-label {
    font-weight: 700;
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

  @media screen and (min-width: 768px) {
    .header {
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
      flex-direction: column;
      gap: 8px;

      padding: unset;
      justify-content: unset;
      width: unset;
    }

    .metadata {
      grid-template-rows: unset;
      grid-template-columns: 1fr 2fr;
      line-height: 10px;

      gap: 12px;
    }
  }

  @media screen and (min-width: 1024px) {
    .header {
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
