<script lang="ts">
  import infoIcon from '$lib/assets/info-icon.png';

  export let onClick: () => void;
</script>

<button class="position-offset-button" on:click={onClick}>
  <img class="position-offset-icon" src={infoIcon} alt="Show more info" />
</button>

<style>
  .position-offset-button {
    border-radius: 50%;
    padding: 2px;
    align-self: center;
    display: flex;
  }

  .position-offset-icon {
    width: 1.25em;
    height: 1.25em;
    align-self: center;
  }
</style>
