import { PlayerTimer } from './player.js'

const MAX_PLAYERS = 6
const START_PLAYERS = 2

class GameTimer {
  _timers = []
  _interval
  _paused = true
  _activePlayerId = ""
  _activePlayerIndex = -1
  currentTurnTime = 0
  baseMinutes = 15
  
  constructor() {
    for (let i = 0; i < START_PLAYERS; i++) {
      this.addPlayer()
    }
  }

  get isMaxPlayers() {
    return this._timers.length >= MAX_PLAYERS
  }

  get numPlayers() {
    return this._timers.length
  }

  get timers() {
    return this._timers
  }

  addPlayer() {
    if (! this.isMaxPlayers ) {
      const newPlayer = new PlayerTimer(this, this.baseMinutes * 60)
      this._timers.push(newPlayer)

      if (this._timers.length == 1) {
        newPlayer.active = true
      }
    }
  }

  removePlayer(id) {
    const playerIndex = this.getPlayerIndexFromId(id)
    this._timers[playerIndex].cleanup()
    this._timers.splice(playerIndex, 1)

    // Deal with cases where the last player got removed
    if (this._timers.length > 0) {
      // Reset to another player
      if (playerIndex == this._activePlayerIndex || id == this._activePlayerId) {
        this._timers[0].active = true
      }
    } else {
      this._activePlayerIndex = -1;
      this._activePlayerId = "";
    }
  }

  getPlayerIndexFromId(id) {
    return this._timers.findIndex(timer => timer.id == id)
  }

  get activePlayerId() {
    return this._activePlayerId
  }

  set activePlayerId(val) {
    if (
        this._timers[this._activePlayerIndex] &&
        this._timers[this._activePlayerIndex].active &&
        val != this._activePlayerId
      ) {
        this._timers[this._activePlayerIndex].active = false
    }
    this._currentTurnTime = 0
    this._activePlayerId = val
    this._activePlayerIndex = this.getPlayerIndexFromId(val)
  }

  tick() {
    this.currentTurnTime++
    this._timers[this._activePlayerIndex].tick()
  }

  get paused() {
    return this._paused
  }

  set paused(val) {
    this.currentTurnTime = 0
    this._paused = !!val
    if (this._paused) {
      clearInterval(this._interval)
    } else {
      this._interval = setInterval(this.tick.bind(this), 1000)
    }
  }
}

export { GameTimer }