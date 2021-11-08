import type { PositionType } from "../pacman"
import Pacman, { BLOCK, DIRECTION } from "../pacman"
import getDxDy from "./getDxDy"
import { ACTION_ENCODING } from "./types"
import type { EncodingFunctionType } from "./types"

const lineOfSightEncoding:EncodingFunctionType = (
  game: Pacman,
  currArenaPosition: PositionType,
  direction: DIRECTION,
) => {
  const { dx, dy } = getDxDy(direction)
  const ghosts = game.ghosts
  let encoding = null
  let x = currArenaPosition.x
  let y = currArenaPosition.y

  let nextBlock = game.map.getBlock({x: x + dx, y: y + dy})
  while(
    nextBlock !== undefined
    && nextBlock !== BLOCK.WALL
    && nextBlock !== BLOCK.RESTRICTED
  ) { //while we don't see a wall yet
    if(encoding === null) { //if this action doesn't immediately hit a wall
      encoding = [0,0,0,0] //[# dangerous ghosts, # edible ghosts, # pills, # biscuits]
    }

    if(nextBlock === BLOCK.PILL) {
      encoding[ACTION_ENCODING.PILL]++ //increment pill count
    }
    else if(nextBlock === BLOCK.BISCUIT) {
      encoding[ACTION_ENCODING.BISCUIT]++ //increment biscuit count
    }

    const ghostsInView = ghosts.filter(g => { //check all the ghosts
      const arenaPos = g.currentArenaPosition(g.position) //get the arena position of the ghost
      return arenaPos.x===x && arenaPos.y===y //return true if the ghost is on this arena block
    })

    let shouldBreak = false
    for(const g of ghostsInView) {
      if(g.isDangerous()) { //if we see a dangerous ghost
        encoding[ACTION_ENCODING.DANGEROUS_GHOST]++ //increment dangerous ghost count
        shouldBreak = true //don't look past this arena block
      }
      else if(g.isVunerable()) { //if the ghost is vulnerable
        encoding[ACTION_ENCODING.EDIBLE_GHOST]++ //increment edible ghost count
      }
      //else the ghost is hidden, ignore it
    }
    if(shouldBreak) break
    

    x += dx
    y += dy
    nextBlock = game.map.getBlock({x,y})
  }

  return encoding
}

export default lineOfSightEncoding