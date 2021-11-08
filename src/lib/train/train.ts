import { readFileSync, writeFile } from "fs"

import Pacman, {
  ARENA,
  DIRECTION,
  WALLS
} from "../pacman"
import nStepSemiGradientSarsa from "./nStepSemiGradientSarsa"
import eGreedy from "./eGreedy"
import linearQFunction, { linearQFunctionGrad } from "./linearQFunction"
import isTerminal from "./isTerminal"
import transition from "./transition"
import getActionsData from "./getActionsData"
import selectAction from "./selectAction"



// const game = new Pacman({
//   arena: ARENA,
//   walls: WALLS,
// })
// game.startNewGame()
// game.user.desiredDirection = DIRECTION.NONE
// for(let i=0; i<100; ++i) {
//   game.mainLoop()
//   console.log(
//     game.user.currentArenaPosition(game.user.position),
//     getActionsData(undefined)
//   )
// }


const NUM_EPISODES = 500

/**
 * Try to read weighs from file, else initialize to zeros
 * @returns 
 */
function initW() {
  let w = [0,0,0,0]
  // try { //try to read the weights from file
  //   const data = readFileSync("./data/weights.json")
  //   w = JSON.parse(data.toString())
  //   console.log("Loaded saved weights")
  // }
  // catch(err) {
  //   console.error(err)
  // }
  return w
}

/**
 * Create, initialize, and start a pacman game
 * @returns pacman game instance
 */
function getInitState():Pacman {
  const game = new Pacman({ arena: ARENA, walls: WALLS })
  game.init()
  game.startNewGame()
  return game
}

const policy = eGreedy

const q = linearQFunction

const gradQ = linearQFunctionGrad


const benchmarkData:{episodeIndex: number, avgReward: number}[] = [] //used to track periodic training results
function episodeCallback(episodeIndex:number, w: number[]) {
  if(episodeIndex < 10 || (episodeIndex + 1) % 10 === 0) { //every 10th episode
    const numRuns = 10 //number of runs for this one benchmark
    let reward = 0

    for(let i=0; i<numRuns; ++i) {
      const game = getInitState()

      while(!isTerminal(game)) { //while the game is not over yet
        const action = selectAction(game, w, policy, q, 0) //act greedily with no exploration
        reward += transition(game, action).reward //sum the rewards
      }
    }

    console.log("Benchmark", episodeIndex, w, reward / numRuns)

    benchmarkData.push({
      episodeIndex,
      avgReward: reward / numRuns
    })
  }
}

const w = nStepSemiGradientSarsa<Pacman,DIRECTION>(
  NUM_EPISODES,
  initW,
  getInitState,
  getActionsData,
  isTerminal,
  transition,
  policy,
  q,
  gradQ,
  episodeCallback
)

writeFile(__dirname+"/data/weights.json", JSON.stringify(w), {}, (err) => {
  if(err) return console.error(err)
  console.log("Successfully saved weights")
})

writeFile(
  __dirname+"/data/benchmarkData.tsv",
  `Episode Index \t Average Reward (over 10 purely greedy runs)\n`+benchmarkData.map(b => `${b.episodeIndex}\t${b.avgReward}`).join("\n"),
  {},
  (err) => {
  if(err) return console.error(err)
  console.log("Successfully saved benchmark data")
})