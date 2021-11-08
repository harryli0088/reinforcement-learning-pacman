import { DIRECTION } from "../pacman";

export default function getDxDy(direction: DIRECTION) {
  return {
    dx: (direction === DIRECTION.LEFT && -1 || direction === DIRECTION.RIGHT && 1 || 0),
    dy: (direction === DIRECTION.DOWN && 1 || direction === DIRECTION.UP && -1 || 0),
  }
}