<script>
  import { getContext } from 'svelte';

  const doodles = getContext('doodles');
</script>

<div class="doodle-list">
  {#each Object.keys(doodles) as path}
    <div class="doodle">
      <img src={doodles[path].cover} alt={`Cover art for ${doodles[path].name}`} />
      <a href={path}>{doodles[path].name}</a>
    </div>
  {/each}
</div>

<style>
  .doodle-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .doodle {
    flex: 1;

    border: 1px solid var(--border-color);
    border-radius: 20px;

    text-align: center;
    color: #ffffff;
    font-weight: 700;

    display: flex;
    flex-direction: column;

    overflow: hidden;
  }

  .doodle > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .doodle > a {
    border-top: 1px solid var(--border-color);
    padding: 24px;
  }

  @media screen and (min-width: 768px) {
    .doodle-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 1024px) {
    .doodle-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
