import type { QFunction } from "./types"

/**
 * An epsilon-greedy policy
 * If the randomly chosen number is > epsilon, choose the action with the max value (exploit)
 * Else choose a random action (explore)
 * @param actions array of available action indices
 * @param v       value estimate function (given a state and action, return the value estimate)
 * @param epsilon if the random number is bigger than this value, act greedily,e lse explore
 * @returns       selected action index
 */
export default function eGreedy<S>(
  state: S,
  actionEncodings: number[][],
  w:number[], 
  q:QFunction<S>, 
  epsilon: number = 0.1
):number {
  actionEncodings.forEach(a => {
    if(a.length !== w.length) throw new Error(`Action encodings and weights lengths must match. Received ${a.length} and weights ${w.length}`)
  })
  if(epsilon<0 || epsilon>1) throw new Error(`Epsilon must be between 0 and 1. Received ${epsilon}`)

  let chosenAction = 0
  if(Math.random() > epsilon) { //if we are acting greedily
    let maxValue = -Infinity //init to negative infinity
    actionEncodings.forEach((a,i) => { //loop through the actions
      const val = q(state,a,w)
      if(val > maxValue) { //if this action estimate is better
        chosenAction = i
        maxValue = val
      }
    })
  }
  else { //else we are randomly picking an action
    chosenAction = Math.floor(Math.random() * actionEncodings.length)
  }

  return chosenAction
}