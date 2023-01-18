<script>
  export let background = '#ffffff';
</script>

<div class="page" style="--background: {background};">
  <div class="header"><slot name="header" /></div>
  <div class="content"><slot name="content" /></div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Toto:wght@400;700&display=swap');

  :global(html) {
    height: 100%;
  }

  :global(body) {
    font-family: 'Noto Serif Toto', serif;

    min-height: 100%;
    margin: 0;

    color: var(--primary-text-color);
  }

  :global(a, a:visited) {
    color: var(--primary-text-color);
  }

  :global(a:hover, a:focus, a:focus-visible) {
    color: var(--secondary-text-color);
  }

  .page {
    padding: 0 24px;

    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    display: flex;
    flex-direction: column;

    background: var(--background);

    min-height: 100%;
    height: fit-content;

    overflow: scroll;
  }

  .header {
    margin-top: 60px;
  }

  .content {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: auto;
    margin-top: 32px;
    margin-bottom: 60px;
  }
</style>
