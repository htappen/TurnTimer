const ALERT_FREQ = 30
const ALERT_ANIM_LENGTH = 1

const PlayerTimer = {
  props: [ 'timer', 'turntime' ],
  template: `
  <div class="player-timer" :class="[ timer.color, timer.active ? 'active': 'inactive']" @click="activate">
    <div :class="{'time-display': true, 'zoom-anim': shouldanim }">{{ timeRemaining }}</div>
    <div class="player-name">{{ timer.name }}</div>
  </div>
  `,
  methods: {
    activate() {
      this.timer.active = true
    }
  },
  computed: {
    timeRemaining() {
      const minutes = Math.floor(this.timer.seconds / 60).toString()
      const seconds = (this.timer.seconds % 60).toString().padStart(2, '0')

      return `${minutes}:${seconds}`
    },
    shouldanim() {
      return (
        this.timer.active &&
        this.turntime > ALERT_ANIM_LENGTH && 
        this.turntime % ALERT_FREQ <= ALERT_ANIM_LENGTH
      )
    }
  }
}

const TimerPage = {
  props: [ 'gametimer', 'turntime' ],
  template: `
  <div class="timer-box" v-show="!gametimer.paused">
    <audio id="downBeat"><source src="audio/downBeat.mp3" type="audio/mpeg"></audio>
    <div class="timer-list">
      <player-timer v-for="t in gametimer.timers" :timer="t" :turntime="turntime">
      </player-timer>
    </div>
    <div class="pause-box">
      <button @click="pauseGame"></button>
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
  },
  watch: {
    turntime(newTime) {
      if (newTime > 0 && newTime % ALERT_FREQ == 0) {
        document.getElementById('downBeat').play()
      }
    }
  }
}

export { TimerPage }