const PlayerSetupItem = {
  props: [
    'timer'
  ],
  template: `
  <div class="setup-item" v-bind:class="timer.color">
    <button class="remove-button" @click="removePlayer"></button>
    <input class="player-name-input" v-model="timer.name" type="text"/>
  </div>
  `,
  methods: {
    removePlayer: function() {
      this.timer._parent.removePlayer(this.timer.id)
    }
  }
}

const SetupPage = {
  props: [ 'gametimer' ],
  template: `
  <div class='setup-box' v-show="gametimer.paused">
    <div class="length-setup">
      <label>
        Minutes per player: <input class="length-input" type="number" v-model="gametimer.baseMinutes"/>
      </label>
    </div>
    <div class="player-setup-list">
      <player-setup-item v-for="t in gametimer.timers" :timer="t">
      </player-setup-item>
    </div>
    <div class="game-buttons">
      <button class="add-button" :disabled="gametimer.isMaxPlayers" @click="addPlayer"></button>
      <button class="start-game" :disabled="gametimer.numPlayers == 0" @click="unpause"></button>
    </div>
  </div>
  `,
  methods: {
    addPlayer() {
      this.gametimer.addPlayer()
    },
    unpause() {
      this.gametimer.paused = false
    }
  },
  components: {
    'player-setup-item': PlayerSetupItem
  }
}

export { SetupPage }