<script lang="ts">
  import infoIcon from '$lib/assets/info-icon.png';
</script>

<details class="container">
  <summary class="title-container">
    <img src={infoIcon} alt="" class="title-icon" />
    <p class="title"><slot name="title" /></p>
  </summary>
  <p class="description"><slot name="description" /></p>
</details>

<style>
  .container {
    font-size: 1rem;

    background: #efefef;
    border-radius: var(--border-radius);

    padding: 24px;
    margin: 24px 0;

    display: flex;
    gap: 8px;
  }

  .title-container {
    display: flex;
    gap: 8px;
    align-items: start;

    cursor: pointer;

    list-style: none;
  }

  .title-container::-webkit-details-marker {
    display: none;
  }

  .title-icon {
    width: 1em;
    height: 1em;

    margin: 4px 0;
  }

  .title,
  .description {
    margin: 0;
  }

  .title {
    color: var(--primary-text-color);
    font-weight: 700;
  }

  .description {
    padding-top: 16px;
    color: var(--secondary-text-color);

    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
