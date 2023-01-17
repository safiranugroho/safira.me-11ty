<script>
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
  <a href="/" title="Back to home" class="home-link">🖍️</a>
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
  .home-link {
    text-decoration: none;
    position: absolute;
    top: 24px;
    left: 24px;

    font-size: 32px;
    padding: 4px;
    border: 1px solid transparent;
  }

  .home-link:hover,
  .home-link:focus,
  .home-link:focus-visible {
    border: 1px solid var(--border-color);
  }

  .header {
    min-height: 72px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 24px;

    margin-top: 60px;
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
    text-align: right;
    border-right: 1px solid var(--border-color);
    padding: 0 24px;
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
