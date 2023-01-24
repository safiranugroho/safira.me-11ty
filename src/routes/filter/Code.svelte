<script lang="ts">
  import Prism from 'prismjs';
  import { createEventDispatcher } from 'svelte';

  import copyIcon from '$lib/assets/copy.png';

  export let content: string;
  export let language: string;

  const dispatch = createEventDispatcher();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (e) {
      console.log(e);
    }

    dispatch('copy');
  };
</script>

<div class="code">
  <div class="code-content">
    {@html Prism.highlight(content, Prism.languages[language], language)}
  </div>
  <button on:click={copy} class="code-copy-button"
    ><img src={copyIcon} alt="Copy to clipboard" class="code-copy-icon" /></button
  >
</div>

<style>
  .code {
    position: relative;

    padding: 16px;
    width: 100%;

    border: 1px solid var(--primary-border-color);
    border-radius: 8px;

    font-family: var(--code-font-family);

    display: flex;
    justify-content: space-between;
  }

  .code-copy-button {
    position: absolute;
    top: -1px;
    right: -1px;

    padding: 4px;
  }

  .code-copy-icon {
    width: 20px;
    height: 20px;
    opacity: 0.8;
  }
</style>
