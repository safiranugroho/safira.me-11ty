<script lang="ts">
  export let heading = '';
  export let subheading = '';
  export let completedDate = '';
</script>

<div class="header">
  <div class="heading-container">
    <h1 class="heading">{heading}</h1>
    <h2 class="subheading">{subheading}</h2>
  </div>
  <div class="metadata-container">
    <p class="metadata">
      {completedDate}
    </p>
    <p class="metadata">
      <slot name="promptBy" />
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

  .heading-container,
  .metadata-container {
    flex: 1;

    display: flex;
    gap: 8px;
  }

  .heading-container {
    flex-direction: column;
    justify-content: center;
    gap: 2px;

    border-bottom: 1px solid var(--border-color);
    padding: 16px 0;
  }

  .heading,
  .subheading {
    margin: 0;
  }

  .heading {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    font-style: italic;
    color: var(--text-color);
  }

  .subheading {
    font-weight: 400;
    font-size: 14px;
    color: var(--text-color-90);
  }

  .metadata-container {
    flex-direction: row;
    gap: 24px;

    padding: 8px 0;
    width: 100%;
  }

  .metadata {
    margin: 0;

    font-weight: 400;
    font-size: 12px;
    color: var(--text-color-90);
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

    .heading-container {
      text-align: right;
      border-bottom: none;
      border-right: 1px solid var(--border-color);
      padding: 0 24px;
    }

    .metadata-container {
      flex-direction: column;
      gap: 8px;

      padding: unset;
      justify-content: unset;
      width: unset;
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
