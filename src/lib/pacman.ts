//based off https://github.com/daleharvey/pacman

export enum DIRECTION {
  NONE="NONE",
  UP="UP",
  LEFT="LEFT",
  DOWN="DOWN",
  RIGHT="RIGHT",
}

export enum GAME_STATE {
  WAITING = "WAITING",
  PAUSE = "PAUSE",
  PLAYING = "PLAYING",
  COUNTDOWN = "COUNTDOWN",
  EATEN_PAUSE = "EATEN_PAUSE",
  DYING = "DYING",
}

export type RewardType = {
  biscuit: number,
  death: number,
  eatGhostMultiplier: number,
  pill: number,
}

export type PositionType = {x:number,y:number}

const IS_BROWSER = typeof window !== "undefined"

export type PacmanOptionsType = {
  arena: ArenaType,
  canvas?:HTMLCanvasElement,
  reward?: RewardType,
  userActCallback?: (user: User) => DIRECTION
  walls: WallType[],
}

export default class Pacman {
  arena: ArenaType
  // audio = null
  blockSize:number = 20
  ctx: CanvasRenderingContext2D
  fps: number = 30
  ghostsEatenCount:number = 0
  ghostPos: {new: PositionType, old: PositionType}[] = []
  ghosts: Ghost[] = []
  ghostColors:string[] = ["#00FFDE", "#FF0000", "#FFB8DE", "#FFB847"]
  intervalId: number | null = null //tracks the id of the game interval
  lastTime:number = 0
  level:number = 0
  map: Map
  reward: RewardType = {
    biscuit: 10,
    death: -100,
    eatGhostMultiplier: 50,
    pill: 50,
  }
  state:GAME_STATE = GAME_STATE.WAITING
  stateChanged:boolean = true
  stored:GAME_STATE = GAME_STATE.WAITING //used for pausing
  tick:number = 0 //game counter
  timerStart:number = 0 //used to track when certain events started
  user: User
  userPos = null
  walls: WallType[]

  constructor(options:PacmanOptionsType) {
    this.arena = options.arena
    this.reward = options.reward || this.reward
    this.walls = options.walls
    this.init(options.canvas, options.userActCallback)
  }

  completedLevel = () => {
    this.setState(GAME_STATE.WAITING)
    this.level++
    this.map.reset()
    this.user.newLevel()
    this.startLevel()
  }

  drawFooter = () => {
    const topLeft = this.map.height * this.map.blockSize
    const textBase = topLeft + 17

    this.ctx.fillStyle = "#000000"
    this.ctx.fillRect(0, topLeft, this.map.width * this.map.blockSize, 30)

    this.ctx.fillStyle = "#FFFF00"

    for (let i=0, len=this.user.getLives(); i<len; ++i) {
      const halfBlock = this.map.blockSize / 2

      this.ctx.fillStyle = "#FFFF00"
      this.ctx.beginPath()
      this.ctx.moveTo(
        150 + (25 * i) + halfBlock,
        (topLeft + 1) + halfBlock
      )
      this.ctx.arc(
        150 + (25 * i) + halfBlock,
        (topLeft + 1) + halfBlock,
        halfBlock,
        Math.PI * 0.25,
        Math.PI * 1.75,
        false
      )
      this.ctx.fill()
    }

    // this.ctx.fillStyle = !this.soundDisabled() ? "#00FF00" : "#FF0000"
    // this.ctx.font = "bold 16px sans-serif"
    //this.ctx.fillText("♪", 10, textBase)
    // this.ctx.fillText("s", 10, textBase)

    this.ctx.fillStyle = "#FFFF00"
    this.ctx.font = "14px BDCartoonShoutRegular"
    this.ctx.fillText("Score: " + this.user.getScore(), 30, textBase)
    this.ctx.fillText("Level: " + this.level, 260, textBase)
  }

  drawScore = (text: string, newPosition: PositionType) => {
    this.ctx.fillStyle = "#FFFFFF"
    this.ctx.font = "12px BDCartoonShoutRegular"
    this.ctx.fillText(
      text,
      newPosition.x / 10 * this.map.blockSize,
      (newPosition.y + 5) / 10 * this.map.blockSize
    )
  }

  eatenPill = () => {
    // this.audio.play("eatpill")
    this.timerStart = this.tick
    this.ghostsEatenCount = 0 //tracks how many ghosts the user ate after eating the pill
    this.ghosts.forEach(g => g.makeEdible())
  }

  getTick = () => this.tick

  init = (canvas?: HTMLCanvasElement, userActCallback?:(user:User) => DIRECTION) => {
    //canvas set up
    if(canvas) {
      //DPR is important for improving the picture quality of the canvas, especially for text
      //based off this fiddle http://jsfiddle.net/65maD/83/ from this stack answer https://stackoverflow.com/a/54027313
      const DPR = window.devicePixelRatio

      const height = this.blockSize * this.arena.length + 30
      const width = this.blockSize * this.arena[0].length
      canvas.setAttribute("height", `${height*DPR}px`)
      canvas.setAttribute("width", `${width*DPR}px`)
      canvas.style.height = `${height}px;`
      canvas.style.width = `${width}px;`

      this.ctx = canvas.getContext('2d')
      this.ctx.scale(DPR, DPR)
    }

    //game initialization
    // this.audio = new Audio({ "soundDisabled": soundDisabled });
    this.map = new Map(this,this.blockSize)
    this.user = new User(this,userActCallback)
    this.ghosts = this.ghostColors.map(c => new Ghost(this, c))

    // var extension = Modernizr.audio.ogg ? 'ogg' : 'mp3';
    // var audio_files = [
    //   ["start", root + "audio/opening_song." + extension],
    //   ["die", root + "audio/die." + extension],
    //   ["eatghost", root + "audio/eatghost." + extension],
    //   ["eatpill", root + "audio/eatpill." + extension],
    //   ["eating", root + "audio/eating.short." + extension],
    //   ["eating2", root + "audio/eating.short." + extension]
    // ];
    // load(audio_files, function () { loaded(); })

    //render
    IS_BROWSER && this.map.draw(this.ctx)
    IS_BROWSER && this.renderText("Loading ...")
    this.loaded()
  }

  keyDown = (e: KeyboardEvent) => {
    if (e.key === "n") { //if the user wants to start a new game
      this.startNewGame()
    } else if (e.key === "s") { //if the user is toggling the sound
      // this.audio.disableSound()
      // localStorage["soundDisabled"] = !this.soundDisabled()
    } else if (e.key === "p" && this.state === GAME_STATE.PAUSE) { //if the user is resuming
      // this.audio.resume()
      this.map.draw(this.ctx)
      this.setState(this.stored)
    } else if (e.key === "p") { //if the user is pausing
      // this.audio.pause()
      this.stored = this.state
      this.setState(GAME_STATE.PAUSE)
      // this.map.draw(this.ctx)
      this.renderText("Paused")
    } else if (this.state !== GAME_STATE.PAUSE) { //if we are not paused
      return this.user.keyDown(e) //pass the event to the user class
    }
    return true
  }

  keyPress = (e: KeyboardEvent) => {
    if (this.state !== GAME_STATE.WAITING && this.state !== GAME_STATE.PAUSE) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // load = (arr, callback) => {
  //   if (arr.length === 0) {
  //     callback();
  //   } else {
  //     var x = arr.pop();
  //     this.audio.load(x[0], x[1], function () { this.load(arr, callback); });
  //   }
  // }

  loaded = () => {
    if(IS_BROWSER) {
      this.renderText("Press N to Start")

      //add event listeners
      document.addEventListener("keydown", this.keyDown, true)
      document.addEventListener("keypress", this.keyPress, true)
      
      this.intervalId = window.setInterval(this.mainLoop, 1000 / this.fps) //start running the game
    }
  }
  
  loseLife = () => {
    this.setState(GAME_STATE.WAITING)
    this.user.loseLife()
    if (this.user.getLives() > 0) {
      this.startLevel()
    }
  }

  mainLoop = (shouldDraw:boolean = IS_BROWSER) => {
    let userReward = 0

    if (this.state !== GAME_STATE.PAUSE) { //if we are not paused
      ++this.tick //increment the game counter
    }

    shouldDraw && this.map.drawPills(this.ctx)

    if (this.state === GAME_STATE.PLAYING) {
      this.ghostPos = this.ghosts.map(g => g.move())
      this.ghosts.forEach(g => {
        g.act()
        g.behave()
      })
      IS_BROWSER && this.ghostPos.forEach((gp) => this.redrawBlock(gp.old))
      IS_BROWSER && this.ghosts.forEach(g => g.draw(this.ctx))

      const userMove = this.user.move()
      this.userPos = userMove.new
      this.user.act()

      /* Calculate whether the user ate a pill or biscuit */
      const nextWhole = this.user.nextWholeBlock(this.user.position, this.user.direction) //get the next whole block
      const block = this.map.getBlock(nextWhole) //get the block of the next whole square

      if ( //if the user are hitting a pill or biscuit
        (this.user.isMidBlock(this.user.position.y) || this.user.isMidBlock(this.user.position.x)) //if the user are in the middle of the square
        && (block === BLOCK.BISCUIT || block === BLOCK.PILL) //if this block is a pill or biscuit
      ) {
        this.map.setBlock(nextWhole, BLOCK.EMPTY) //empty the block
        
        const reward = block === BLOCK.BISCUIT ? this.reward.biscuit : this.reward.pill
        this.user.biscuitPillEatenCount++ //increment how many pills/biscuits the user has eaten
        this.user.addScore(reward) //increase the score
        userReward += reward

        if (this.user.biscuitPillEatenCount === 182) { //if the user finished the level, HARDCODED
          this.completedLevel()
        }

        if (block === BLOCK.PILL) { //if the user ate a pill
          this.eatenPill()
        }
      }

      shouldDraw && this.redrawBlock(userMove.old)
      shouldDraw && this.user.draw(this.ctx)

      this.ghosts.forEach((g,i) => { //loop through all the ghosts for collision detection
        if (this.userGhostCollision(this.userPos, this.ghostPos[i].new)) { //if the user and ghost userGhostCollision
          if (g.isVunerable()) { //if the user ate the ghost
            // this.audio.play("eatghost")
            g.eaten()
            this.ghostsEatenCount++ //update the eaten count
            const reward = this.ghostsEatenCount * this.reward.eatGhostMultiplier //add this to the score
            this.user.addScore(reward)
            this.setState(GAME_STATE.EATEN_PAUSE) //update the game state
            this.timerStart = this.tick //record when the ghost was eaten
            userReward += reward

            shouldDraw && this.drawScore(reward.toString(), this.ghostPos[i].new)
          } else if ( //if the user is killed by the ghost
            g.isDangerous() //if the ghost dangerous
            && this.state !== GAME_STATE.DYING //if pacman is not already dead (in theory pacman can run into multiple ghosts simultaneously)
          ) {
            // this.audio.play("die")
            this.setState(GAME_STATE.DYING) //update the game state
            this.timerStart = this.tick //record when the player was killed
            userReward += this.reward.death
          }
        }
      })
    } else if (this.state === GAME_STATE.WAITING && this.stateChanged) {
      this.stateChanged = false
      
      shouldDraw && this.map.draw(this.ctx)
      shouldDraw && this.renderText("Press N to Start a New Game")
    } else if (
      (this.state === GAME_STATE.EATEN_PAUSE)
      && (this.tick - this.timerStart > this.fps / 3)
    ) {
        this.setState(GAME_STATE.PLAYING)

        shouldDraw && this.map.draw(this.ctx)
      } else if (this.state === GAME_STATE.DYING) {
      if (this.tick - this.timerStart > this.fps * 2) {
        this.loseLife()
      } else {
        shouldDraw && this.redrawBlock(this.userPos)
        shouldDraw && this.ghostPos.forEach(gp => this.redrawBlock(gp.old))
        shouldDraw && this.user.drawDead(this.ctx, (this.tick - this.timerStart) / (this.fps * 2))
      }
    } else if (this.state === GAME_STATE.COUNTDOWN) {
      const diff = 5 + Math.floor((this.timerStart - this.tick) / this.fps)

      if (diff === 0) { //if we should start the game
        this.setState(GAME_STATE.PLAYING)
        
        shouldDraw && this.map.draw(this.ctx)
      } else {
        if (diff !== this.lastTime) { //if we should update the time
          this.lastTime = diff

          shouldDraw && this.map.draw(this.ctx)
          shouldDraw && this.renderText("Starting in: " + diff)
        }
      }
    }

    shouldDraw && this.drawFooter()

    return userReward //return the reward the user got
  }

  redrawBlock = (pos: PositionType) => {
    this.map.drawBlock(Math.floor(pos.x / 10), Math.floor(pos.y / 10), this.ctx)
    this.map.drawBlock(Math.ceil(pos.x / 10), Math.ceil(pos.y / 10), this.ctx)
  }

  renderText = (text: string) => {
    this.ctx.fillStyle = "#FFFF00"
    this.ctx.font = "14px BDCartoonShoutRegular"
    let width = this.ctx.measureText(text).width
    let x = (this.map.width * this.map.blockSize - width) / 2
    this.ctx.fillText(text, x, this.map.height * 10 + 8)
  }

  setState = (nState: GAME_STATE) => {
    this.state = nState
    this.stateChanged = true
  }

  // soundDisabled = () => localStorage["soundDisabled"] === "true"

  startLevel = () => {
    // this.audio.play("start")
    this.user.resetPosition() //reset the user
    this.ghosts.forEach(g => g.reset()) //reset all the ghosts
    this.timerStart = this.tick
    this.setState(
      IS_BROWSER
      ? GAME_STATE.COUNTDOWN //start the countdown
      : GAME_STATE.PLAYING
    )
  }

  startNewGame = () => {
    this.setState(GAME_STATE.WAITING)
    this.level = 1
    this.user.reset()

    this.map.reset()
    IS_BROWSER && this.map.draw(this.ctx)
    this.startLevel()
  }

  /**
   * this function checks whether the user and a ghost have collided
   * @param userPos   user position
   * @param ghostPos  ghost position
   * @returns         whether or not the user and the ghost have collided
   */
  userGhostCollision = (userPos: PositionType, ghostPos: PositionType) => (
    Math.hypot(ghostPos.x - userPos.x, ghostPos.y - userPos.y) < 10
  )
}

export class Entity { //to be extended by Ghost and User
  desiredDirection:DIRECTION = DIRECTION.NONE //this is the entity's desired direction that they will take once it is possible
  direction:DIRECTION = DIRECTION.NONE
  game:Pacman
  position:PositionType = {x:0,y:0}
  score:number = 0

  act = () => {} //the entity runs this to take an action, to be overridden

  /**
   * Collision detection (walls) is done when a ghost lands on an exact block
   * make sure they dont skip over it 
   * @param x1 
   * @param x2 
   * @returns 
   */
  addBounded = (x1: number, x2: number) => {
    const rem = x1 % 10
    const result = rem + x2
    if (rem !== 0 && result > 10) {
      return x1 + (10 - rem)
    } else if (rem > 0 && result < 0) {
      return x1 - rem
    }
    return x1 + x2
  }

  behave = () => {} //entity-specific behavior, to be overridden

  /**
   * HARDCODED
   * returns the teleported position if applicable, else returns the current position
   * @param dir the current direction
   * @param pos the current position
   * @returns   the teleported position, if applicable
   */
  checkTeleport = (dir:DIRECTION, pos:PositionType) => {
    if (pos.y === 100 && pos.x >= 190 && dir === DIRECTION.RIGHT) {
      return { y: 100, x: -10 }
    }
    else if (pos.y === 100 && pos.x <= -10 && dir === DIRECTION.LEFT) {
      return { y: 100, x: 190 }
    }
    return pos
  }

  currentArenaPosition = (pos: PositionType) => ({
    x: this.positionToBlock(pos.x),
    y: this.positionToBlock(pos.y),
  })

  /**
   * Get the new position of the entity, with collision detection checks
   * @returns the new position
   */
  getNewPosition = () => {
    let newPosition = null

    if (this.desiredDirection !== this.direction) { //if the desired direction is different from the current
      newPosition = this.getNextPosition(this.desiredDirection, this.position) //get the desired new position

      if ( //if the entity is allowed to move in the desired direction
        this.turnedAround(this.desiredDirection, this.direction) //if the user is going back the way they came
        || ( //if the user is on a whole square AND the desired space is valid
          this.onWholeBlock(this.position) //if the user is on a whole square
          && this.game.map.isFloorBlock(this.nextWholeBlock(newPosition, this.desiredDirection)) //if the desired space is valid
        )
      ) {
        this.direction = this.desiredDirection //move in the desired direction
      } else {
        newPosition = null //the desired position is not currently valid
      }
    }

    if (newPosition === null) { //if we should keep moving in the same direction
      newPosition = this.getNextPosition(this.direction, this.position) //get the new position
    }

    newPosition = this.checkTeleport(this.direction, newPosition)

    return newPosition
  }

  /**
   * Default function, returns the next position for the entity after movement based on its direction
   * @param dir current direction
   * @param pos current position
   * @returns   the new position after movement
   */
  getNextPosition = (dir: DIRECTION, pos: PositionType) => {
    const speed = this.getSpeed()
    const xSpeed = (dir === DIRECTION.LEFT && -speed || dir === DIRECTION.RIGHT && speed || 0)
    const ySpeed = (dir === DIRECTION.DOWN && speed || dir === DIRECTION.UP && -speed || 0)

    return {
      "x": this.addBounded(pos.x, xSpeed),
      "y": this.addBounded(pos.y, ySpeed)
    }
  }

  getRandomDirection = () => {
    const moves = (
      this.direction === DIRECTION.LEFT || this.direction === DIRECTION.RIGHT //if the ghost is moving horizontally
      ? [DIRECTION.UP, DIRECTION.DOWN] //move vertically
      : [DIRECTION.LEFT, DIRECTION.RIGHT] //else randomly move horizontally
    )
    return moves[Math.floor(Math.random() * 2)] //return a random move
  }

  getSpeed = () => 2 //default speed for an entity is 2

  /**
   * Callback function to run after hitting a wall
   */
  hitWallCallback = () => {
    this.direction = DIRECTION.NONE //make the entity stop moving
    return { new: this.position, old: this.position } //return that the positions don't change
  }

  /**
   * returns whether or not a coordinate is a whole coordinate (multiple of 10)
   * @param n any number
   * @returns true if the number is a multiple of 10
   */
  isWholeCoordinate = (n: number) => n % 10 === 0

  /**
   * function that handles entity movement
   * @returns new and old positions
   */
  move = () => {
    const oldPosition = this.position
    const newPosition = this.getNewPosition()

    if ( //if the entity has hit a wall
      this.onWholeBlock(this.position)
      && this.game.map.isWall(this.nextWholeBlock(newPosition, this.direction))
    ) {
      return this.hitWallCallback()
    }

    this.setNewPosition(newPosition)

    return { //return the old and new positions
      new: this.position,
      old: oldPosition,
    }
  }

  /**
   * given a number and a direction, return the next block along the axis (ie multiple of 10)
   * @param n   the x or y position
   * @param dir the current direction
   * @returns   the next block
   */
  nextBlock = (n: number, dir: DIRECTION) => {
    const rem = n % 10
    if (rem === 0) { //if we are already on a whole block
      return n
    } else if (dir === DIRECTION.RIGHT || dir === DIRECTION.DOWN) { //if we are moving vertically
      return n + (10 - rem)
    } else { //else we are moving horizontally
      return n - rem
    }
  }
  
  /**
   * return the next whole block given the current position and direction
   * @param pos current position
   * @param dir current direction
   * @returns   the next whole block
   */
  nextWholeBlock = (pos: PositionType, dir: DIRECTION) => {
    return {
      x: this.positionToBlock(this.nextBlock(pos.x, dir)),
      y: this.positionToBlock(this.nextBlock(pos.y, dir)),
    }
  }

  /**
    * 
    * @param pos the current position
    * @returns   true if both x and y coordinates are on a whole block
    */
  onWholeBlock = (pos: PositionType) => this.isWholeCoordinate(pos.y) && this.isWholeCoordinate(pos.x)

  /**
   * converts a position value to an arena block value
   * @param x position value
   * @returns arena block value
   */
  positionToBlock = (x: number) => Math.round(x / 10)

  /**
   * Default function to set the new position
   * @param newPosition new position
   */
  setNewPosition = (newPosition:PositionType) => {
    this.position = newPosition //move to the new position
  }

  /**
   * determines whether the user turned around 180 and is trying to go back the way they came
   * @param desiredDirection  desired direction
   * @param dir               actual direction
   * @returns                 true if the directions are opposites: up/down or right/left
   */
  turnedAround = (desiredDirection: DIRECTION, dir:DIRECTION) => (
    ((desiredDirection === DIRECTION.LEFT || desiredDirection === DIRECTION.RIGHT) &&
    (dir === DIRECTION.LEFT || dir === DIRECTION.RIGHT)) ||
    ((desiredDirection === DIRECTION.UP || desiredDirection === DIRECTION.DOWN) &&
    (dir === DIRECTION.UP || dir === DIRECTION.DOWN))
  )
}


export class Ghost extends Entity {
  color: string = ""
  desiredDirection: DIRECTION = DIRECTION.NONE //this is the user's desired direction that they will take once it is possible
  direction: DIRECTION = DIRECTION.NONE
  eatenAt: number | null = null //the game tick at which the ghost was eaten, otherwise null
  edibleAt: number | null = null //the game tick at which the ghost became edible, otherwise null
  game: Pacman
  position: PositionType = {x:0,y:0}

  constructor(game: Pacman, color:string) {
    super()
    this.color = color
    this.game = game
  }

  act = () => {
    this.desiredDirection = this.getRandomDirection()
  }

  behave = () => {
    //reset edible and eaten at statuses
    if (this.edibleAt && this.secondsAgo(this.edibleAt) > 8) {
      this.edibleAt = null
    }
    if (this.eatenAt && this.secondsAgo(this.eatenAt) > 3) {
      this.eatenAt = null
    }
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    const s = this.game.map.blockSize
    const top = (this.position.y / 10) * s
    const left = (this.position.x / 10) * s

    const tl = left + s
    const base = top + s - 3
    const inc = s / 10

    const high = this.game.getTick() % 10 > 5 ? 3 : -3
    const low = this.game.getTick() % 10 > 5 ? -3 : 3

    ctx.fillStyle = this.getColor()
    ctx.beginPath()

    ctx.moveTo(left, base)

    ctx.quadraticCurveTo(left, top, left + (s / 2), top)
    ctx.quadraticCurveTo(left + s, top, left + s, base)

    // Wavy things at the bottom
    ctx.quadraticCurveTo(tl - (inc * 1), base + high, tl - (inc * 2), base)
    ctx.quadraticCurveTo(tl - (inc * 3), base + low, tl - (inc * 4), base)
    ctx.quadraticCurveTo(tl - (inc * 5), base + high, tl - (inc * 6), base)
    ctx.quadraticCurveTo(tl - (inc * 7), base + low, tl - (inc * 8), base)
    ctx.quadraticCurveTo(tl - (inc * 9), base + high, tl - (inc * 10), base)

    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "#FFF"
    ctx.arc(left + 6, top + 6, s / 6, 0, 300, false)
    ctx.arc((left + s) - 6, top + 6, s / 6, 0, 300, false)
    ctx.closePath()
    ctx.fill()

    const f = s / 12
    const off = {
      [DIRECTION.RIGHT]: [f, 0],
      [DIRECTION.LEFT]: [-f, 0],
      [DIRECTION.UP]: [0, -f],
      [DIRECTION.DOWN]: [0, f],
    }

    ctx.beginPath()
    ctx.fillStyle = "#000"
    ctx.arc(
      left + 6 + off[this.direction][0],
      top + 6 + off[this.direction][1],
      s / 15, 0, 300,
      false
    )
    ctx.arc(
      (left + s) - 6 + off[this.direction][0], 
      top + 6 + off[this.direction][1],
      s / 15, 0, 300,
      false
    )
    ctx.closePath()
    ctx.fill()
  }

  /**
   * Run this function when the user eats the ghost
   */
  eaten = () => {
    this.edibleAt = null //the ghost is no longer edible
    this.eatenAt = this.game.getTick() //mark that the ghost was eaten at this tick
  }

  /**
   * @returns the color of the ghost
   */
   getColor = () => {
    if (this.edibleAt > 0) { //if this ghost is edible
      if (this.secondsAgo(this.edibleAt) > 5) { //if this ghost has been edible for at least 5 seconds
        return this.game.getTick() % 20 > 10 ? "#FFFFFF" : "#0000BB" //flash white and blue
      } else {
        return "#0000BB" //blue
      }
    } else if (this.eatenAt > 0) { //if this ghost was eaten
      return "#222" //dark gray
    }
    return this.color //the ghost's normal color
  }

  getSpeed = () => this.isVunerable() ? 1 : this.isHidden() ? 4 : 2

  hitWallCallback = () => {
    this.act()
    return { new: this.position, old: this.position } //return that the positions don't change
    // return this.move() //try moving again
  }

  isDangerous = () => this.edibleAt === null && this.eatenAt === null

  isHidden = () => this.edibleAt === null && this.eatenAt !== null

  isVunerable = () => this.edibleAt !== null

  /**
   * Make the ghost edible
   */
  makeEdible = () => {
    this.direction = this.oppositeDirection(this.direction) //move in the opposite direction
    this.edibleAt = this.game.getTick() //mark that the ghost is edible at this tick
  }

  /**
   * @param dir the current direction
   * @returns   the opposite direction
   */
  oppositeDirection = (dir: DIRECTION) => (
    dir === DIRECTION.LEFT && DIRECTION.RIGHT
    || dir === DIRECTION.RIGHT && DIRECTION.LEFT
    || dir === DIRECTION.UP && DIRECTION.DOWN || DIRECTION.UP
  )

  reset = () => {
    this.eatenAt = null
    this.edibleAt = null
    this.position = { "x": 90, "y": 80 } //HARDCODED
    this.direction = this.getRandomDirection()
    this.desiredDirection = this.getRandomDirection()
  }
  
  /**
   * convert the tick to time in seconds (depends on fps)
   * @param tick  the tick in question
   * @returns     how many seconds ago that tick was
   */
  secondsAgo = (tick:number) => (this.game.getTick() - tick) / this.game.fps 
}

export class User extends Entity {
  actCallback?: (user: User) => DIRECTION
  biscuitPillEatenCount:number = 0 //how many pills or biscuits the user has eaten
  game: Pacman
  lives:number = 3

  keyMap = {
    ArrowLeft: DIRECTION.LEFT,
    ArrowUp: DIRECTION.UP,
    ArrowRight: DIRECTION.RIGHT,
    ArrowDown: DIRECTION.DOWN,
  }
  
  constructor(game: Pacman, actCallback?:(user: User) => DIRECTION) {
    super()
    this.actCallback = actCallback
    this.game = game
    this.initUser()
  }

  act = () => {
    //act can be handled by user keyboard actions

    if(this.actCallback) { //if there is an callback
      this.desiredDirection = this.actCallback(this) //run it
    }
  }

  /**
   * calculates the angle for drawing pacman's mouth
   * @param dir current direction
   * @param pos current position
   * @returns   start, end, and direction of the arc to draw
   */
  calcAngle = (dir:DIRECTION, pos:PositionType):{direction:boolean, end: number, start: number} => {
    if (dir === DIRECTION.RIGHT && (pos.x % 10 < 5)) {
      return {start: 0.25, end: 1.75, direction: false }
    } else if (dir === DIRECTION.DOWN && (pos.y % 10 < 5)) {
      return { start: 0.75, end: 2.25, direction: false }
    } else if (dir === DIRECTION.UP && (pos.y % 10 < 5)) {
      return { start: 1.25, end: 1.75, direction: true }
    } else if (dir === DIRECTION.LEFT && (pos.x % 10 < 5)) {
      return { start: 0.75, end: 1.25, direction: true }
    }
    return { start: 0, end: 2, direction: false }
  }

  /**
   * draw pacman dying
   * @param ctx                     canvas context
   * @param deathAnimationProgress  how far into the death animation we are [0,1]
   */
  drawDead = (ctx: CanvasRenderingContext2D, deathAnimationProgress: number) => {
    if (deathAnimationProgress < 1) { //if we are not yet done with the death animation
      const size = this.game.map.blockSize
      const half = size / 2

      ctx.fillStyle = "#FFFF00"
      ctx.beginPath();
      ctx.moveTo(
        this.position.x / 10 * size + half,
        this.position.y / 10 * size + half
      )

      ctx.arc(
        this.position.x / 10 * size + half,
        this.position.y / 10 * size + half,
        half,
        0,
        Math.PI * 2 * deathAnimationProgress,
        true
      )

      ctx.fill()
    }
  }

  /**
   * draw pacman if he is alive
   * @param ctx canvas context
   */
  draw = (ctx: CanvasRenderingContext2D) => {
    const {
      direction,
      end,
      start,
    } = this.calcAngle(this.direction, this.position)
    const s = this.game.map.blockSize

    ctx.fillStyle = "#FFFF00"

    ctx.beginPath()

    ctx.moveTo(
      this.position.x / 10 * s + s / 2,
      this.position.y / 10 * s + s / 2
    )

    ctx.arc(
      this.position.x / 10 * s + s / 2,
      this.position.y / 10 * s + s / 2,
      s / 2,
      Math.PI * start,
      Math.PI * end,
      direction
    )

    ctx.fill()
  }

  getLives = () => this.lives

  addScore = (score:number) => {
    this.score += score
    if (this.score >= 10000 && this.score - score < 10000) { //gain a life after reaching score 10000
      this.lives++
    }
  }

  getScore = () => this.score

  initUser = () => {
    this.score = 0
    this.lives = 3
    this.newLevel()
  }

  /**
   * returns true if we are in the middle of a block
   * @param n x or y coordinate
   * @returns true if the value is close to the middle
   */
  isMidBlock = (n:number) => {
    const rem = n % 10
    return rem > 3 || rem < 7
  }

  /**
   * user key event listener
   * @param e keyboard event
   * @returns whether to cancel the event
   */
  keyDown = (e: KeyboardEvent) => {
    if (typeof this.keyMap[e.key] !== "undefined") {
      this.desiredDirection = this.keyMap[e.key]
      e.preventDefault()
      e.stopPropagation()
      return false
    }
    return true
  }

  loseLife = () => {
    this.lives--
  }

  newLevel = () => {
    this.resetPosition()
    this.biscuitPillEatenCount = 0
  }

  reset = () => {
    this.initUser()
    this.resetPosition()
  }

  resetPosition = () => {
    this.position = { x: 90, y: 120 } //HARDCODED
    this.direction = DIRECTION.LEFT
    this.desiredDirection = DIRECTION.LEFT
  }
}



export class Map {
  arena: number[][] //2d array containing all the map blocks
  blockSize: number //how big a block is in pixels on screen
  game: Pacman
  height: number = 0 //blokc height of the map
  pillSize: number = 0 //used to animate the pills
  width: number = 0 //block width of the map

  constructor(game: Pacman, blockSize: number) {
    this.blockSize = blockSize
    this.game = game
    this.reset()
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    const size = this.blockSize

    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, this.width * size, this.height * size)

    this.drawWall(ctx)

    for (let y=0; y<this.height; ++y) {
      for (let x=0; x<this.width; ++x) {
        this.drawBlock(x, y, ctx)
      }
    }
  }

  drawBlock = (x:number, y:number,ctx: CanvasRenderingContext2D) => {
    const block = this.getBlock({x,y})

    if (block !== BLOCK.PILL) {
      ctx.beginPath()

      if (block === BLOCK.EMPTY || block === BLOCK.RESTRICTED || block === BLOCK.BISCUIT) {
        ctx.fillStyle = "#000"
        ctx.fillRect(
          x * this.blockSize,
          y * this.blockSize,
          this.blockSize,
          this.blockSize
        )

        if (block === BLOCK.BISCUIT) {
          ctx.fillStyle = "#FFF"
          ctx.fillRect(
            x * this.blockSize + this.blockSize / 2.5,
            y * this.blockSize + this.blockSize / 2.5,
            this.blockSize / 6,
            this.blockSize / 6
          )
        }
      }
      ctx.closePath()
    }
  }

  drawPills = (ctx: CanvasRenderingContext2D) => {
    if (++this.pillSize > 30) { //add an increasing size animation to the pills
      this.pillSize = 0 //reset the pill size once it gets too big
    }

    for (let y=0; y<this.height; ++y) { //iterate over the height
      for (let x=0; x<this.width; ++x) { //iterate over the width
        if (this.getBlock({x,y}) === BLOCK.PILL) { //if this is a pull
          ctx.beginPath()

          ctx.fillStyle = "#000"
          ctx.fillRect(
            x * this.blockSize,
            y * this.blockSize,
            this.blockSize,
            this.blockSize
          )

          ctx.fillStyle = "#FFF"
          ctx.arc(
            x * this.blockSize + this.blockSize / 2,
            y * this.blockSize + this.blockSize / 2,
            Math.abs(5 - this.pillSize / 3),
            0,
            Math.PI * 2,
            false
          )
          ctx.fill()
          ctx.closePath()
        }
      }
    }
  }

  drawWall = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#0000FF"
    ctx.lineWidth = 5
    ctx.lineCap = "round"

    this.game.walls.forEach(w => {
      ctx.beginPath()

      w.forEach(l => {
        if (l.move) {
          ctx.moveTo(l.move[0] * this.blockSize, l.move[1] * this.blockSize)
        } else if (l.line) {
          ctx.lineTo(l.line[0] * this.blockSize, l.line[1] * this.blockSize)
        } else if (l.curve) {
          ctx.quadraticCurveTo(
            l.curve[0] * this.blockSize,
            l.curve[1] * this.blockSize,
            l.curve[2] * this.blockSize,
            l.curve[3] * this.blockSize
          )
        }
      })

      ctx.stroke()
    })
  }

  getBlock = (pos: PositionType) => {
    const width = this.arena[0].length
    const y = pos.y

    //allow for wrap-around teleporting
    let x = pos.x
    if(x < 0) {
      x += Math.ceil(-x/width) * width
    }
    x %= width
    
    const row = this.arena[y]
    if(row) {
      return row[x]
    }
    return undefined //the block isn't in bounds
  }

  /**
   * returns true if the position is a valid block (ie not a wall)
   * @param pos position in question
   * @returns   true if the block is not a wall
   */
  isFloorBlock = (pos: PositionType) => {
    if (this.withinBounds(pos)) { //if the position is in bounds of the map
      const block = this.getBlock(pos) //get the block
      return ( //return true if the block is empty or contains a pill or biscuit
        block === BLOCK.EMPTY
        || block === BLOCK.BISCUIT
        || block === BLOCK.PILL
      )
    }
    return false //otherwise this block must be invalid
  }

  /**
   * returns true if the position is a wall in bounds
   * @param pos position
   * @returns   true if the block is a wall in bounds
   */
  isWall = (pos: PositionType) => this.withinBounds(pos) && this.getBlock(pos) === BLOCK.WALL

  reset = () => {
    this.arena = JSON.parse(JSON.stringify(this.game.arena)) //copy the original arena
    this.height = this.arena.length
    this.width = this.arena[0].length
  }

  setBlock = (pos: PositionType, type: number) => {
    this.arena[pos.y][pos.x] = type
  }

  /**
   * returns true if the position is within bounds
   * @param pos position
   * @returns   true if x and y are within bounds
   */
  withinBounds = (pos:PositionType) => pos.y >= 0 && pos.y < this.height && pos.x >= 0 && pos.x < this.width
}

// Pacman.Audio = function (game) {

//   var files = [],
//     endEvents = [],
//     progressEvents = [],
//     playing = [];

//   function load(name, path, cb) {

//     var f = files[name] = document.createElement("audio");

//     progressEvents[name] = function (event) { progress(event, name, cb); };

//     f.addEventListener("canplaythrough", progressEvents[name], true);
//     f.setAttribute("preload", "true");
//     f.setAttribute("autobuffer", "true");
//     f.setAttribute("src", path);
//     f.pause();
//   };

//   function progress(event, name, callback) {
//     if (event.loaded === event.total && typeof callback === "function") {
//       callback();
//       files[name].removeEventListener("canplaythrough",
//         progressEvents[name], true);
//     }
//   };

//   function disableSound() {
//     for (var i = 0; i < playing.length; i++) {
//       files[playing[i]].pause();
//       files[playing[i]].currentTime = 0;
//     }
//     playing = [];
//   };

//   function ended(name) {

//     var i, tmp = [], found = false;

//     files[name].removeEventListener("ended", endEvents[name], true);

//     for (i = 0; i < playing.length; i++) {
//       if (!found && playing[i]) {
//         found = true;
//       } else {
//         tmp.push(playing[i]);
//       }
//     }
//     playing = tmp;
//   };

//   function play(name) {
//     if (!game.soundDisabled()) {
//       endEvents[name] = function () { ended(name); };
//       playing.push(name);
//       files[name].addEventListener("ended", endEvents[name], true);
//       files[name].play();
//     }
//   };

//   function pause() {
//     for (var i = 0; i < playing.length; i++) {
//       files[playing[i]].pause();
//     }
//   };

//   function resume() {
//     for (var i = 0; i < playing.length; i++) {
//       files[playing[i]].play();
//     }
//   };

//   return {
//     "disableSound": disableSound,
//     "load": load,
//     "play": play,
//     "pause": pause,
//     "resume": resume
//   };
// };


export enum BLOCK {
  WALL = 0,
  BISCUIT = 1,
  EMPTY = 2,
  RESTRICTED = 3, //ie ghost spawn area
  PILL = 4,
}

type ArenaType = BLOCK[][]

export const ARENA:ArenaType = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

type WallType = {
  curve?: number[],
  line?: number[],
  move?: number[],
}[]

export const WALLS:WallType[] = [
  [{ "move": [0, 9.5] }, { "line": [3, 9.5] },
  { "curve": [3.5, 9.5, 3.5, 9] }, { "line": [3.5, 8] },
  { "curve": [3.5, 7.5, 3, 7.5] }, { "line": [1, 7.5] },
  { "curve": [0.5, 7.5, 0.5, 7] }, { "line": [0.5, 1] },
  { "curve": [0.5, 0.5, 1, 0.5] }, { "line": [9, 0.5] },
  { "curve": [9.5, 0.5, 9.5, 1] }, { "line": [9.5, 3.5] }],

  [{ "move": [9.5, 1] },
  { "curve": [9.5, 0.5, 10, 0.5] }, { "line": [18, 0.5] },
  { "curve": [18.5, 0.5, 18.5, 1] }, { "line": [18.5, 7] },
  { "curve": [18.5, 7.5, 18, 7.5] }, { "line": [16, 7.5] },
  { "curve": [15.5, 7.5, 15.5, 8] }, { "line": [15.5, 9] },
  { "curve": [15.5, 9.5, 16, 9.5] }, { "line": [19, 9.5] }],

  [{ "move": [2.5, 5.5] }, { "line": [3.5, 5.5] }],

  [{ "move": [3, 2.5] },
  { "curve": [3.5, 2.5, 3.5, 3] },
  { "curve": [3.5, 3.5, 3, 3.5] },
  { "curve": [2.5, 3.5, 2.5, 3] },
  { "curve": [2.5, 2.5, 3, 2.5] }],

  [{ "move": [15.5, 5.5] }, { "line": [16.5, 5.5] }],

  [{ "move": [16, 2.5] }, { "curve": [16.5, 2.5, 16.5, 3] },
  { "curve": [16.5, 3.5, 16, 3.5] }, { "curve": [15.5, 3.5, 15.5, 3] },
  { "curve": [15.5, 2.5, 16, 2.5] }],

  [{ "move": [6, 2.5] }, { "line": [7, 2.5] }, { "curve": [7.5, 2.5, 7.5, 3] },
  { "curve": [7.5, 3.5, 7, 3.5] }, { "line": [6, 3.5] },
  { "curve": [5.5, 3.5, 5.5, 3] }, { "curve": [5.5, 2.5, 6, 2.5] }],

  [{ "move": [12, 2.5] }, { "line": [13, 2.5] }, { "curve": [13.5, 2.5, 13.5, 3] },
  { "curve": [13.5, 3.5, 13, 3.5] }, { "line": [12, 3.5] },
  { "curve": [11.5, 3.5, 11.5, 3] }, { "curve": [11.5, 2.5, 12, 2.5] }],

  [{ "move": [7.5, 5.5] }, { "line": [9, 5.5] }, { "curve": [9.5, 5.5, 9.5, 6] },
  { "line": [9.5, 7.5] }],
  [{ "move": [9.5, 6] }, { "curve": [9.5, 5.5, 10.5, 5.5] },
  { "line": [11.5, 5.5] }],


  [{ "move": [5.5, 5.5] }, { "line": [5.5, 7] }, { "curve": [5.5, 7.5, 6, 7.5] },
  { "line": [7.5, 7.5] }],
  [{ "move": [6, 7.5] }, { "curve": [5.5, 7.5, 5.5, 8] }, { "line": [5.5, 9.5] }],

  [{ "move": [13.5, 5.5] }, { "line": [13.5, 7] },
  { "curve": [13.5, 7.5, 13, 7.5] }, { "line": [11.5, 7.5] }],
  [{ "move": [13, 7.5] }, { "curve": [13.5, 7.5, 13.5, 8] },
  { "line": [13.5, 9.5] }],

  [{ "move": [0, 11.5] }, { "line": [3, 11.5] }, { "curve": [3.5, 11.5, 3.5, 12] },
  { "line": [3.5, 13] }, { "curve": [3.5, 13.5, 3, 13.5] }, { "line": [1, 13.5] },
  { "curve": [0.5, 13.5, 0.5, 14] }, { "line": [0.5, 17] },
  { "curve": [0.5, 17.5, 1, 17.5] }, { "line": [1.5, 17.5] }],
  [{ "move": [1, 17.5] }, { "curve": [0.5, 17.5, 0.5, 18] }, { "line": [0.5, 21] },
  { "curve": [0.5, 21.5, 1, 21.5] }, { "line": [18, 21.5] },
  { "curve": [18.5, 21.5, 18.5, 21] }, { "line": [18.5, 18] },
  { "curve": [18.5, 17.5, 18, 17.5] }, { "line": [17.5, 17.5] }],
  [{ "move": [18, 17.5] }, { "curve": [18.5, 17.5, 18.5, 17] },
  { "line": [18.5, 14] }, { "curve": [18.5, 13.5, 18, 13.5] },
  { "line": [16, 13.5] }, { "curve": [15.5, 13.5, 15.5, 13] },
  { "line": [15.5, 12] }, { "curve": [15.5, 11.5, 16, 11.5] },
  { "line": [19, 11.5] }],

  [{ "move": [5.5, 11.5] }, { "line": [5.5, 13.5] }],
  [{ "move": [13.5, 11.5] }, { "line": [13.5, 13.5] }],

  [{ "move": [2.5, 15.5] }, { "line": [3, 15.5] },
  { "curve": [3.5, 15.5, 3.5, 16] }, { "line": [3.5, 17.5] }],
  [{ "move": [16.5, 15.5] }, { "line": [16, 15.5] },
  { "curve": [15.5, 15.5, 15.5, 16] }, { "line": [15.5, 17.5] }],

  [{ "move": [5.5, 15.5] }, { "line": [7.5, 15.5] }],
  [{ "move": [11.5, 15.5] }, { "line": [13.5, 15.5] }],

  [{ "move": [2.5, 19.5] }, { "line": [5, 19.5] },
  { "curve": [5.5, 19.5, 5.5, 19] }, { "line": [5.5, 17.5] }],
  [{ "move": [5.5, 19] }, { "curve": [5.5, 19.5, 6, 19.5] },
  { "line": [7.5, 19.5] }],

  [{ "move": [11.5, 19.5] }, { "line": [13, 19.5] },
  { "curve": [13.5, 19.5, 13.5, 19] }, { "line": [13.5, 17.5] }],
  [{ "move": [13.5, 19] }, { "curve": [13.5, 19.5, 14, 19.5] },
  { "line": [16.5, 19.5] }],

  [{ "move": [7.5, 13.5] }, { "line": [9, 13.5] },
  { "curve": [9.5, 13.5, 9.5, 14] }, { "line": [9.5, 15.5] }],
  [{ "move": [9.5, 14] }, { "curve": [9.5, 13.5, 10, 13.5] },
  { "line": [11.5, 13.5] }],

  [{ "move": [7.5, 17.5] }, { "line": [9, 17.5] },
  { "curve": [9.5, 17.5, 9.5, 18] }, { "line": [9.5, 19.5] }],
  [{ "move": [9.5, 18] }, { "curve": [9.5, 17.5, 10, 17.5] },
  { "line": [11.5, 17.5] }],

  [{ "move": [8.5, 9.5] }, { "line": [8, 9.5] }, { "curve": [7.5, 9.5, 7.5, 10] },
  { "line": [7.5, 11] }, { "curve": [7.5, 11.5, 8, 11.5] },
  { "line": [11, 11.5] }, { "curve": [11.5, 11.5, 11.5, 11] },
  { "line": [11.5, 10] }, { "curve": [11.5, 9.5, 11, 9.5] },
  { "line": [10.5, 9.5] }]
]
