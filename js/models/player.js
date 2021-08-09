
const COLOR_LIST = [
  'red',
  'blue',
  'green',
  'pink',
  'orange',
  'purple'
]

class PlayerTimer {
  name = ""
  color = ""
  seconds = 0
  #_id = ""
  #_parent = null
  #_active = false
  constructor(parent, seconds, name, color) {
    this.seconds = seconds
    this._parent = parent
    this._id = Math.random().toString(16).substr(2, 8)

    if (!name) {
      // TODO: create a random name
      this.name = this._id
    }
    if (!color) {
      if (COLOR_LIST.length > 0) {
        this.color = COLOR_LIST.pop()
      } else {
        this.color = 'black'
      }
    }
  }

  get id() {
    return this._id
  }

  tick() {
    if (this.seconds > 0) {
      this.seconds--;
    }
  }

  get active() {
    return this._active
  }

  set active(val) {
    this._active = !!val
    if (this._active) {
      this._parent.activePlayerId = this._id
    }
  }
}

export { PlayerTimer }