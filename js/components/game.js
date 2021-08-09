const PlayerTimer = {
  props: [ 'timer' ],
  template: `
  <div class="player-timer" :class="timer.color" @click="activate">
    <div class="time-box">{{ timer.seconds }}</div>
    <div class="player-name">{{ timer.name }}</div>
  </div>
  `,
  methods: {
    activate() {
      this.timer.active = true
    }
  }
}

const TimerPage = {
  props: [ 'gametimer' ],
  template: `
  <div class="timer-box">
    <div class="timer-list">
      <player-timer v-for="t in gametimer.timers" :timer="t">
      </player-timer>
    </div>
    <div class="pause-box">
      <button @click="pauseGame">Pause</button>
    </div>
  </div>
  `,
  components: {
    'player-timer': PlayerTimer
  },
  methods: {
    pauseGame() {
      this.gametimer.paused = true
    }
  }
}

export { TimerPage }