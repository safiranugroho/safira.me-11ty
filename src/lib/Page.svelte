<div class="page">
  <slot name="header" />
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
  }

  .page {
    padding: 60px 24px;

    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    display: flex;
    flex-direction: column;
  }

  .content {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: auto;
    margin-top: 32px;
  }
</style>
