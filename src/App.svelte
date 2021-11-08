<script lang="ts">
	import { onMount } from 'svelte'

  import Pacman, { ARENA, DIRECTION, User, WALLS } from "./lib/pacman";
  import selectAction from "./lib/train/selectAction";
  import weights from "./lib/train/data/weights.json"
  import eGreedy from './lib/train/eGreedy';
  import linearQFunction from './lib/train/linearQFunction';


  let canvas: HTMLCanvasElement

  onMount(async () => {
    const game = new Pacman({
      arena: ARENA,
      canvas,
      userActCallback: (user: User):DIRECTION => {
        if(user.onWholeBlock(user.position)) {
          return selectAction(
            user.game,
            weights,
            eGreedy,
            linearQFunction,
          )
        }
        return user.desiredDirection
      },
      walls: WALLS,
    })
  })
</script>

<main>
  <header></header>
	<section>
    <canvas id="pacman" bind:this={canvas}/>
  </section>

  <footer>
		<p>Built using <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">Svelte</a> and <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">Typescript</a></p>
		<p>Github Repo: <a href="https://github.com/harryli0088/binary-visualized" target="_blank" rel="noopener noreferrer">https://github.com/harryli0088/binary-visualized</a></p>
		<p>Github Logo provided by Font Awesome: <a href="https://fontawesome.com/license" target="_blank" rel="noopener noreferrer">https://fontawesome.com/license</a></p>
	</footer>
</main>

<style>
	header, section, footer {
		padding: 1em;
	}
	@media only screen and (min-width: 600px) {
		header, section, footer {
			padding-left: var(--tablet-padding);
			padding-right: var(--tablet-padding);
		}
	}
	@media only screen and (min-width: 1000px) {
		header, section, footer {
			padding-left: var(--desktop-padding);
			padding-right: var(--desktop-padding);
		}
	}

	header {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background-color: #17202A;
		color: white;
	}
	@media only screen and (min-width: 600px) {
		header {
			height: 50vh;
			flex-direction: row;
		}
	}
	@media only screen and (min-width: 1000px) {
		header {
			height: 70vh;
		}
	}

	footer {
		background-color: #ddd;
	}
</style>