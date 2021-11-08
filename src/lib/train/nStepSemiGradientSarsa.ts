import type { 
  EpisodeStoreType,
  IsTerminalType,
  PolicyType,
  QFunction,
  QGradFunction,
  TransitionType
} from "./types"

/**
 * Episodic semi-gradient n-step Sarsa for estimating qˆ ≈ q∗, or qˆ ≈ qπ
 * from http://incompleteideas.net/book/bookdraft2017nov5.pdf
 * @param numEpisodes     the number of episodes to run training for
 * @param initW           a function that initializes the weight vector
 * @param getInitState    a function that returns a valid initial state
 * @param isTerminal      a function that returns true/false whether the given state is terminal
 * @param transition      the transition function that returns the next state and reward given an input state and action pair
 * @param policy          Input: a differentiable function ˆq : S × A × Rd → R, possibly π
 * @param v               Input: a differentiable function ˆv : S+ × Rd → R such that vˆ(terminal,·) = 0
 * @param gradV           function that returns the gradient of the estimate function given a state and weights
 * @param episodeCallback callback function to run at the end of an episode (which can be useful for periodically benchmarking the agent)
 * @param stepSize        step size α ∈ (0, 1]
 * @param gamma           discount factor ∈ [0,1]
 * @param n               a positive integer n
 */
export default function nStepSemiGradientSarsa<S,A>(
  numEpisodes: number,
  initW: () => number[],
  getInitState: () => S,
  getActionsData: (state:S) => {actions: A[], encodings: number[][]},
  isTerminal: IsTerminalType<S>,
  transition: TransitionType<S,A>,
  policy: PolicyType<S>,
  q: QFunction<S>,
  gradQ: QGradFunction<S>,
  episodeCallback: (episodeIndex:number,w:number[]) => any = () => {},
  stepSize: number = 0.001,
  gamma: number = 0.95,
  n: number = 3,
) {
  if(stepSize<=0 || stepSize>1) throw new Error(`Step size must be ∈ (0,1]. Received ${stepSize}`)
  if(gamma<0 || gamma>1) throw new Error(`Discount factor gamma must be ∈ [0,1]. Received ${gamma}`)
  if(n < 1) throw new Error(`N must be a positive number. Received ${n}`)

  // TODO All store and access operations (St and Rt) can take their index mod n
  const w = initW() // Initialize value-function weights w arbitrarily (e.g., w = 0)

  for(let ep=0; ep<numEpisodes; ++ep) { // Repeat (for each episode):
    // console.log('NEW EPISODE ---------------------------------------')
    let state = getInitState() // Initialize and store S0 != terminal

    // Select and store an action A0 ∼ π(·|S0) or ε-greedy wrt ˆq(S0, ·, w)
    let {actions, encodings} = getActionsData(state)
    let actionIndex = policy(state,encodings,w,q)
    let action = actions[actionIndex]

    let T = 10000 // T ← ∞

    const store:EpisodeStoreType<S,A> = {
      actions: [action], // add A_0
      encodings: [encodings[actionIndex]], // add the action encoding
      rewards: [0], // R_0 is always 0
      states: [state], // add S_0
    }
      
    // For t = 0, 1, 2, . . . :
    let t = 0
    let tau = 0
    while(tau !== T - 1) { // Until τ = T − 1
      if(t < T) { // If t < T, then:
        // console.log("ACTION", action)
        // Take action At
        // Observe and store the next reward as Rt+1 and the next state as St+1
        const { nextState, reward } = transition(state, action) // S_t+1 and R_t_1
        store.states.push(nextState) //store S_t+1
        store.rewards.push(reward) //store R_t+1

        if(isTerminal(nextState)) { // If St+1 is terminal, then
          T = t + 1 // T ← t + 1
        }
        else { // else:
          // Select and store At+1 ∼ π(·|St+1) or ε-greedy wrt ˆq(St+1, ·, w)
          let { actions, encodings } = getActionsData(nextState)
          // actions.forEach((a,i) => {
          //   console.log("    ", a, encodings[i])
          // })
          
          actionIndex = policy(state,encodings,w,q)
          action = actions[actionIndex]
          store.actions.push(action)
          store.encodings.push(encodings[actionIndex])
        }

        state = nextState //set the next state
      }
      tau = t - n + 1 // τ ← t − n + 1 (τ is the time whose state’s estimate is being updated)
      if(tau >= 0) { // If τ ≥ 0:
        // G ← sum from i=τ+1 to min(τ+n,T): γ^i−τ−1 * Ri
        let G = 0
        for(let i=tau+1, end=Math.min(tau+n,T); i<=end; ++i) { //sum discounted rewards
          G += Math.pow(gamma, i - tau - 1) * store.rewards[i]
        }

        // If τ + n < T, then G ← G + γ^n q(Sτ+n, Aτ+n, w)
        if(tau + n < T) {
          G = G + Math.pow(gamma, n) * q(store.states[tau + n], store.encodings[tau + n], w)
        }

        
        // w ← w + α [G − q(Sτ , Aτ , w)] ∇q(Sτ , Aτ , w)
        const gradient = gradQ(store.states[tau],store.encodings[tau],w)
        // console.log("gradient", gradient)
        const gradFactor = stepSize * (G - q(store.states[tau], store.encodings[tau], w))
        // console.log("gradFactor", gradFactor, (G - q(store.states[tau], store.encodings[tau], w)))
        w.forEach((w_i,wIndex) => {
          w[wIndex] = w_i + gradFactor * gradient[wIndex]
        })
      }

      t++ // For t = 0, 1, 2, . . . :
    } // Until τ = T − 1

    episodeCallback(ep, w) //run the endo-of-episode callback 
  }

  return w //return the output weight matrix
}
