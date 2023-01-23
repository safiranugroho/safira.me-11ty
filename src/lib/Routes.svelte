<script lang="ts">
  import routes from '../routes';
</script>

<div class="container">
  {#each Object.keys(routes) as path}
    <div class="card">
      <img src={routes[path].cover} alt={`Cover art for ${routes[path].name}`} />
      <a href={path}>{routes[path].name}</a>
    </div>
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .card {
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

  .card > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card > a {
    border-top: 1px solid var(--border-color);
    padding: 24px;
  }

  @media screen and (min-width: 768px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
