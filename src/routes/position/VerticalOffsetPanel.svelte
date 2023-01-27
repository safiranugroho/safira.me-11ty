<script>
  import infoIcon from '$lib/assets/info-icon.png';
</script>

<div class="container">
  <img src={infoIcon} alt="" class="title-icon" />
  <div class="content-container">
    <h3 class="title">Why isn't the <code>bottom</code> value being respected?</h3>
    <p class="description">
      If both <code>top</code> and <code>bottom</code> are specified (not "auto"), <code>top</code>
      wins. Try resetting the <code>top</code> value and see what happens!
    </p>
  </div>
</div>

<style>
  .container {
    font-size: 1rem;

    background: #efefef;
    border-radius: var(--border-radius);

    padding: 16px;
    margin: 24px 0;

    display: flex;
    gap: 8px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .title-icon {
    width: 1.25em;
    height: 1.25em;

    margin: 2px;
  }

  .title,
  .description {
    margin: 0;
  }

  .title {
    color: var(--primary-text-color);
  }

  .description {
    color: var(--secondary-text-color);
  }
</style>
