<script lang="ts">
  import Prism from 'prismjs';

  export let content: string;
  export let language: string;
</script>

<div class="code">
  {@html Prism.highlight(content, Prism.languages[language], language)}
</div>

<style>
  .code {
    padding: 16px;
    width: 100%;

    border: 1px solid var(--primary-border-color);
    border-radius: 8px;

    font-family: var(--code-font-family);
  }
</style>
