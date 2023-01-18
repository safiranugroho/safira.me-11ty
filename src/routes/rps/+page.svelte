<script>
  import rock from '$lib/assets/rock.png';
  import paper from '$lib/assets/paper.png';
  import scissors from '$lib/assets/scissors.png';
  import Page from '$lib/Page.svelte';

  /**
   * @type {Record<string, any>}
   */
  const hands = {
    rock: rock,
    paper: paper,
    scissors: scissors
  };

  /**
   * @type {string | null}
   */
  let playerHand = null;
</script>

<Page>
  <fieldset class="hands" slot="content">
    {#each Object.keys(hands) as hand}
      <input
        class="hand-checkbox"
        type="radio"
        id={hand}
        name="player-hand"
        value={hand}
        bind:group={playerHand}
      />
      <label for={hand} class="hand-container">
        <img class="hand-icon" src={hands[hand]} alt={hand} />
        <p class="hand-text">{hand}</p>
      </label>
    {/each}
  </fieldset>
</Page>

<style>
  .hands {
    all: unset;

    display: flex;
    gap: 64px;

    max-width: 1096px;
  }

  .hand-checkbox {
    display: none;
  }

  .hand-container {
    flex: 1;

    padding: 24px;
    border: 2px solid #000;
    box-sizing: border-box;

    display: grid;
    grid-template-rows: 5fr 1fr;
    text-align: center;
    align-items: center;
  }

  .hand-checkbox:checked + .hand-container {
    margin: -8px;
    border: 10px solid #ffb800;
  }

  .hand-icon {
    max-width: 80%;
    max-height: 80%;

    margin: auto;

    object-fit: contain;
  }
</style>
