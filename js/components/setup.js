const PlayerSetupItem = {
  props: [
    'timer'
  ],
  template: `
  <div v-bind:class="timer.color">
    <button class="remove-button" @click="removePlayer">X</button>
    <input v-model="timer.name" />
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
  <div class='setup-box'>
    <div class="length-setup">
      <input type="number" v-model="gametimer.baseMinutes"/>
    </div>
    <div class="player-setup-list">
      <player-setup-item v-for="t in gametimer.timers" :timer="t">
      </player-setup-item>
    </div>
    <div class="add-button" @click="addPlayer" :disabled="gametimer.isMaxPlayers">
      <button>Add</button>
    </div>
    <div class="start-game">
      <button @click="unpause">Start game</button>
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