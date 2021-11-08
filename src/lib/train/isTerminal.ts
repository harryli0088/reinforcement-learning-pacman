import type Pacman from "../pacman";
import { GAME_STATE } from "../pacman";

export default function isTerminal(game: Pacman) {
  return game.state === GAME_STATE.DYING
}
