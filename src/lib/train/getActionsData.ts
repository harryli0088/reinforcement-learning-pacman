import type Pacman from "../pacman"
import { DIRECTION } from "../pacman"
import lineOfSightEncoding from "./lineOfSightEncoding"
import initTreeSearch from "./treeSearch"

export default function getActionsData(game: Pacman, encodingType:string = "tree") {
  let actions = [DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.UP, DIRECTION.DOWN]
  const currArenaPosition = game.user.currentArenaPosition(game.user.position)

  //get the encoding for each action
  //if the encoding is null, the action is considered invalid
  let encodings:(number[] | null)[] = actions.map(a => {
    if(encodingType === "tree") {
      return initTreeSearch(game, currArenaPosition, a)
    }
    return lineOfSightEncoding(game, currArenaPosition, a)
  })

  //only allow actions that do not go into a wall
  actions = actions.filter((a,i) => encodings[i] !== null)
  encodings = encodings.filter(e => e !== null)

  //use this code to debug the state encodings
  // const print = []
  // for(let i=0;i<actions.length;++i) {
  //   print.push(actions[i])
  //   print.push(JSON.stringify(encodings[i]))
  //   print.push(", ")
  // }
  // console.log("encodings", ...print)

  return { actions, encodings }
}