import type Pacman from "../pacman"
import type { DIRECTION } from "../pacman"
import isTerminal from "./isTerminal"

/**
 * transition the game such that the agent only acts on whole squares
 * @param state   ignored
 * @param action  action to take
 * @returns       { nextState, reward }
 */
 export default function transition(game: Pacman, action:DIRECTION):{ nextState: Pacman, reward: number } {
  game.user.desiredDirection = action //set desired action
  let reward = 0 //sum the rewards across the whole transition

  const LOOP_THRESHOLD = 100
  let noForeverLoop = 0 //prevent forever loops
  do {
    reward += game.mainLoop()
    noForeverLoop++ //increment the counter
  } while(
    !game.user.onWholeBlock(game.user.position)
    && !isTerminal(game)
    && noForeverLoop < LOOP_THRESHOLD //hopefully this is never triggered
  )
  if(noForeverLoop >= LOOP_THRESHOLD) {
    console.warn(`No forever loop triggered, ${noForeverLoop}`)
  }

  return {
    nextState: game,
    reward
  }
}
