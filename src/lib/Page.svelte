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

    background-color: #ffffff;
    color: var(--primary-text-color);
  }

  :global(a, a:visited) {
    color: var(--primary-text-color);
  }

  :global(a:hover, a:focus, a:focus-visible) {
    color: var(--secondary-text-color);
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

    background-color: #ffffff;

    width: fit-content;
    height: fit-content;
  }

  .content {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: auto;
    margin-top: 32px;
  }

  @media screen and (min-width: 768px) {
    .page {
      height: auto;
    }
  }

  @media screen and (min-width: 1024px) {
    .page {
      width: auto;
    }
  }
</style>
