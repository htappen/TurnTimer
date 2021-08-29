import { PlayerTimer } from './player.js'

const MAX_PLAYERS = 6
const START_PLAYERS = 2

class GameTimer {
  _timers = []
  _interval
  _paused = true
  _activePlayerId = ""
  _activePlayerIndex = -1
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
    if (
        this._timers.length > 0 && 
        (playerIndex == this._activePlayerIndex || id == this._activePlayerId)
      ) {
      this._timers[0].active = true
    }
  }

  getPlayerIndexFromId(id) {
    return this._timers.findIndex(timer => timer.id == id)
  }

  get activePlayerId() {
    return this._activePlayerId
  }

  set activePlayerId(val) {
    this._activePlayerId = val 
    if (this._activePlayerIndex >= 0) {
      this._timers[this._activePlayerIndex].active = false
    }
    this._activePlayerIndex = this.getPlayerIndexFromId(val)
  }

  tick() {
    this._timers[this._activePlayerIndex].tick()
  }

  get paused() {
    return this._paused
  }

  set paused(val) {
    this._paused = !!val
    if (this._paused) {
      clearInterval(this._interval)
    } else {
      this._interval = setInterval(this.tick.bind(this), 1000)
    }
  }
}

export { GameTimer }