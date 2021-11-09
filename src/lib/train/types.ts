import type { DIRECTION, PositionType } from "../pacman"
import type Pacman from "../pacman"

export enum ACTION_ENCODING {
  DANGEROUS_GHOST = 0,
  EDIBLE_GHOST = 1,
  PILL = 2,
  BISCUIT = 3,
}

export type EpisodeStoreType<S,A> = {
  actions: A[],
  encodings: number[][],
  states: S[],
  rewards: number[]
}

export type IsTerminalType<S> = (state: S) => boolean

export type PolicyType<S> = (state:S, actionEncodings: number[][], w: number[], ...rest:any[]) => number

export type QFunction<S> = (state:S, actionEncoding: number[], w: number[]) => number

export type QGradFunction<S> = (state:S, actionEncoding: number[], w: number[]) => number[]

export type TransitionType<S,A> = (state:S, action:A) => ({nextState: S, reward: number})

export type EncodingFunctionType = (
  game: Pacman,
  currentArenaPosition: PositionType,
  direction: DIRECTION,
  discountFactor?: number,
) => number[] | null