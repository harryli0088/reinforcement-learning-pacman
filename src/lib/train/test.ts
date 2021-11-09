import Pacman, { ARENA, DIRECTION, WALLS } from "../pacman";
import initTreeSearch from "./treeSearch";
const game = new Pacman({arena: ARENA, walls: WALLS})

console.log(initTreeSearch(game, {x: 0, y:10}, DIRECTION.LEFT))

const test = {}
export default test