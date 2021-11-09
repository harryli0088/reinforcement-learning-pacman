import type Pacman from "../pacman";
import { GAME_STATE } from "../pacman";

/**
 * returns whether or not the game is in a terimal state
 * the episode terminates if the agent is eaten or finishes the level
 * @param game  pacman game
 * @returns     whether or not the game is in a terimal state
 */
export default function isTerminal(game: Pacman) {
  return game.state === GAME_STATE.DYING || game.state === GAME_STATE.WAITING
}
