import type { PositionType } from "../pacman"
import Pacman, { BLOCK, DIRECTION } from "../pacman"
import getDxDy from "./getDxDy"
import { ACTION_ENCODING } from "./types"
import type { EncodingFunctionType } from "./types"

/**
 * calculate the state encoding by line of sight
 * @param game              pacman game instance
 * @param currArenaPosition the current user position
 * @param direction         the direction to look in
 * @param discountFactor    the discounter factor for farther away states
 * @returns                 encoding for looking in that direction
 */
const lineOfSightEncoding:EncodingFunctionType = (
  game: Pacman,
  currArenaPosition: PositionType,
  direction: DIRECTION,
  discountFactor: number = 0.9
) => {
  const { dx, dy } = getDxDy(direction)
  const ghosts = game.ghosts
  let encoding = null
  let x = currArenaPosition.x
  let y = currArenaPosition.y

  let i = 0
  let nextBlock = game.map.getBlock({x: x + dx, y: y + dy})
  while(
    nextBlock !== undefined
    && nextBlock !== BLOCK.WALL
    && nextBlock !== BLOCK.RESTRICTED
  ) { //while we don't see a wall yet
    const increment = Math.pow(discountFactor, i) //calculate the discounter factor

    if(encoding === null) { //if this action doesn't immediately hit a wall
      encoding = [0,0,0,0] //[# dangerous ghosts, # edible ghosts, # pills, # biscuits]
    }

    if(nextBlock === BLOCK.PILL) {
      encoding[ACTION_ENCODING.PILL] += increment //increment pill count
    }
    else if(nextBlock === BLOCK.BISCUIT) {
      encoding[ACTION_ENCODING.BISCUIT] += increment //increment biscuit count
    }

    const ghostsInView = ghosts.filter(g => { //check all the ghosts
      const arenaPos = g.currentArenaPosition(g.position) //get the arena position of the ghost
      return arenaPos.x===x && arenaPos.y===y //return true if the ghost is on this arena block
    })

    let shouldBreak = false
    for(const g of ghostsInView) {
      if(g.isDangerous()) { //if we see a dangerous ghost
        encoding[ACTION_ENCODING.DANGEROUS_GHOST] += increment //increment dangerous ghost count
        shouldBreak = true //don't look past this arena block
      }
      else if(g.isVunerable()) { //if the ghost is vulnerable
        encoding[ACTION_ENCODING.EDIBLE_GHOST] += increment //increment edible ghost count
      }
      //else the ghost is hidden, ignore it
    }
    if(shouldBreak) break
    

    ++i
    x += dx
    y += dy
    nextBlock = game.map.getBlock({x,y})
  }

  return encoding
}

export default lineOfSightEncoding