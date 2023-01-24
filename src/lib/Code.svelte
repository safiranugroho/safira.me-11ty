<script lang="ts">
  import Prism from 'prismjs';
  import { createEventDispatcher } from 'svelte';
  import copyIcon from '$lib/assets/copy.png';

  export let content: string;
  export let language: string;

  let show = false;
  const showTooltip = () => {
    show = true;
    setTimeout(() => (show = false), 2000);
  };

  const dispatch = createEventDispatcher();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      showTooltip();
    } catch (e) {
      console.log(e);
    }

    dispatch('copy');
  };
</script>

<div class="code-container">
  <div class="code">
    <code class="code-content">
      {@html Prism.highlight(content, Prism.languages[language], language)}
    </code>
    <button on:click={copy} class="code-copy-button">
      <img src={copyIcon} alt="Copy to clipboard" class="code-copy-icon" />
      <div class="code-copy-tooltip" style="--show: {show ? 'inline-block' : 'none'}">Copied!</div>
    </button>
  </div>
</div>

<style>
  .code-container {
    display: flex;
    align-items: end;
  }

  .code {
    position: relative;

    padding: 16px;
    padding-right: 32px; /** To offset the copy button width. */
    width: 100%;

    border: 1px solid var(--primary-border-color);
    border-radius: var(--border-radius);

    display: flex;
    justify-content: space-between;
  }

  .code-content {
    font-family: var(--code-font-family);
    white-space: pre-wrap;
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

  .code-copy-tooltip {
    font-weight: 400;

    display: var(--show);
    position: absolute;
    top: -32px;
    right: 0;

    animation: fade-in-out 0.2s ease-out;
  }

  @keyframes fade-in-out {
    from {
      top: -16px;
    }
    to {
      top: -32px;
    }
  }
</style>
