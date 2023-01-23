<script lang="ts">
  import NavLink from './NavLink.svelte';
</script>

<div class="footer">
  <div class="link-container">
    <NavLink prev />
    <NavLink />
  </div>
</div>

<style>
  .footer {
    border-top: 1px solid var(--border-color);
    padding-top: 12px;
    margin-bottom: 60px;
  }

  .link-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
