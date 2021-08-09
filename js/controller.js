import { GameTimer } from "./models/game.js";
import { SetupPage } from "./components/setup.js";
import { TimerPage } from "./components/game.js";

// TODO: support starting a new game

const app = Vue.createApp({
  data() {
    return {
      gametimer: new GameTimer()
    }
  }
})

app.component('setup-page', SetupPage)
app.component('timer-page', TimerPage)

app.mount("#app")
