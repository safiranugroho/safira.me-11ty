<script>
  /**
   * @type {string | null}
   */
  export let href = null;
</script>

<a {href} class="external-link" target="_blank" rel="noreferrer">
  <slot />
</a>

<style>
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
</style>
