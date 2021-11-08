import type Pacman from "../pacman"
import type { PolicyType, QFunction } from "./types"
import getActionsData from "./getActionsData"

export default function selectAction(
  game: Pacman,
  w: number[],
  policy: PolicyType<Pacman>,
  q: QFunction<Pacman>,
  epislon: number = 0,
) {
  const { actions, encodings } = getActionsData(game)
  return actions[policy(game,encodings,w,q,epislon)]
}