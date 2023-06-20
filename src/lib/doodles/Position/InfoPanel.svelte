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
  @import '../../../global.css';

  .container {
    font-size: 1rem;

    background-color: var(--background-color-50);
    border: 1px solid var(--primary-border-color);
    border-radius: var(--border-radius);

    padding: 24px;
    margin: 24px 0;

    display: flex;
    gap: 8px;
  }

  .title-container {
    display: flex;
    gap: 8px;
    align-items: center;

    cursor: pointer;

    list-style: none;
  }

  .title-container::-webkit-details-marker {
    display: none;
  }

  .title-icon {
    align-self: flex-start;
  
    width: 1em;
    height: 1em;

    margin: 4px 0;
  }

  .title,
  .description {
    margin: 0;
  }

  .title {
    color: currentColor;
    font-weight: 700;
  }

  .description {
    padding-top: 16px;
    color: currentColor;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
