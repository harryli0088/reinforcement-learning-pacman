import { BLOCK, DIRECTION } from "../pacman";
import type Pacman from "../pacman";
import type { PositionType } from "../pacman";
import { ACTION_ENCODING } from "./types";
import type { EncodingFunctionType } from "./types";
import getDxDy from "./getDxDy";

/**
 * initializes a tree search encoding for a particular direction
 * @param game 
 * @param currentArenaPosition 
 * @param direction 
 * @returns if the direction is valid, the tree search encoding, else null
 */
const initTreeSearch: EncodingFunctionType = (
  game: Pacman,
  currentArenaPosition: PositionType,
  direction: DIRECTION,
  discountFactor: number = 0.95
) => {
  const { dx, dy } = getDxDy(direction) //get the change in direction

  //get the tree search averaged state encoding for this direction
  const { encoding, isValidBlock } = treeSearch(
    game,
    currentArenaPosition.x + dx,
    currentArenaPosition.y + dy,
    { //mark the current position as already visited
      [encodeArenaPosition(currentArenaPosition.x, currentArenaPosition.y)]: true
    },
    10,
    discountFactor
  )

  if(isValidBlock) { //if our starting block is valid
    return encoding //return the encoding
  }
  return null //else the action is invalid, return null
}

export default initTreeSearch


//look left, right, up, and down
const DX_DY = [
  [-1,0],
  [1,0],
  [0,-1],
  [0,1],
]

/**
 * this function recursively searches the the arena from a starting point and averages the state encodings between branches
 * @param game            pacman game
 * @param x               arena x coordinate
 * @param y               arena y coordinate
 * @param visitedTracker  key-value object used to avoid re-visiting blocks
 * @param depth           how deep to search, decremented after each block visit
 * @param discountFactor  how much to discount farther states
 * @returns               the encoding of the block and whether the block is valid
 */
function treeSearch(
  game: Pacman,
  x: number,
  y: number,
  visitedTracker:{[key:string]:boolean} = {},
  depth: number = 10,
  discountFactor: number = 0.9
):{ encoding: number[], isValidBlock: boolean } {
  visitedTracker[encodeArenaPosition(x, y)] = true //mark that we have visited this block

  const encoding = [0,0,0,0] //[# dangerous ghosts, # edible ghosts, # pills, # biscuits]
  const { isValidBlock, keepSearching } = encodeBlock(game, x, y, encoding) //analyze this block

  //if we should keep searching AND we have not exceeded our search depth
  if(keepSearching && depth > 0) {
    const sumNextEncodings = [0,0,0,0]
    let nextValidBlockCount = 0

    //look in all valid directions
    DX_DY.forEach(([dx, dy]) => {
      const nextX = x + dx
      const nextY = y + dy
  
      //if we have not already visited this next block
      if(visitedTracker[encodeArenaPosition(nextX, nextY)] === undefined) {
        //visit this next block
        const {
          encoding:nextEncoding,
          isValidBlock
        } = treeSearch(game, nextX, nextY, visitedTracker, depth-1,discountFactor)

        if(isValidBlock) {
          //sum the encodings
          sumNextEncodings.forEach((s,i) => {
            sumNextEncodings[i] += discountFactor * nextEncoding[i]
          })
          nextValidBlockCount++ //increment the count so we can properly average the encodings later
        }
      }
    })

    //if there were any valid next blocks
    if(nextValidBlockCount > 0) {
      //add the average of all the next encodings
      encoding.forEach((e,i) => {
        encoding[i] += sumNextEncodings[i] / nextValidBlockCount
      })
    }
  }

  return {
    encoding,
    isValidBlock,
  }
}

/**
 * string encode an x and y coordinate
 * @param x 
 * @param y 
 * @returns string encoding
 */
function encodeArenaPosition(x:number,y:number) {
  return `${x}-${y}`
}

/**
 * 
 * @param game      pacman game instance
 * @param x         arena x position
 * @param y         arena y position
 * @param encoding  state encoding
 * @returns         true/false whether the tree search algorithm should keep searching and whether the block was valid
 */
function encodeBlock(game: Pacman, x: number, y: number, encoding: number[]):{
  isValidBlock: boolean,
  keepSearching: boolean,
} {
  const block = game.map.getBlock({x, y})
  
  //if we hit a wall or restricted block, stop searching
  if(block === undefined || block === BLOCK.WALL || block === BLOCK.RESTRICTED) {
    return {
      isValidBlock: false,
      keepSearching: false,
    }
  }
  else {
    if(block === BLOCK.PILL) {
      encoding[ACTION_ENCODING.PILL]++ //increment pill count
    }
    else if(block === BLOCK.BISCUIT) {
      encoding[ACTION_ENCODING.BISCUIT]++ //increment biscuit count
    }
  
    const ghostsInView = game.ghosts.filter(g => { //check all the ghosts
      const arenaPos = g.currentArenaPosition(g.position) //get the arena position of the ghost
      return arenaPos.x===x && arenaPos.y===y //return true if the ghost is on this arena block
    })
  
    let keepSearching = true
    for(const g of ghostsInView) {
      if(g.isDangerous()) { //if we see a dangerous ghost
        encoding[ACTION_ENCODING.DANGEROUS_GHOST]++ //increment dangerous ghost count
        keepSearching = false //don't look past this arena block
      }
      else if(g.isVunerable()) { //if the ghost is vulnerable
        encoding[ACTION_ENCODING.EDIBLE_GHOST]++ //increment edible ghost count
      }
      //else the ghost is hidden, ignore it
    }

    return {
      isValidBlock: true,
      keepSearching,
    }
  }
}