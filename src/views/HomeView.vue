<template>
  <div class="whole-area">
    <h1>Quizbox</h1>
    <form @submit.prevent>
      <div class="questionContainer">
        <label for="selectQuestions"
          >With how many questions would you like to play?</label
        >
        <select id="selectQuestions" v-model="amountOfSelectedQuestions">
          <option disabled value="0">Please choose</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="group-container">
        <label for="selectGroup"
          >With which group would you like to play?</label
        >
        <select id="selectGroup" v-model="theSelectedGroup">
          <option disabled value="">Please choose</option>
          <option :value="idForHtmlAndCss">Basic HTML and CSS</option>
          <option :value="idForJs">Basic JS</option>
        </select>
      </div>
      <button type="button" class="startButton" @click="startTheGame()">
        Start the quiz
      </button>
    </form>
    <p class="time-display">
      <span class="stopWatch">Stopwatch</span>
      <span class="theMinutes">{{ stopWatchMinutes }}</span> :
      <span class="theSeconds">{{ stopWatchSeconds }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      backendData: [],
      amountOfSelectedQuestions: 0,
      theSelectedGroup: "",
      idForHtmlAndCss: "c76668d0-ce3a-48a7-acd5-0f54ad6818e1",
      idForJs: "9d5ae045-ef9a-4068-bc6c-1b102bda5f55",
      stopWatchMinutes: "00",
      stopWatchSeconds: "00",
      stopWatchDoes: "start",
    };
  },
  methods: {
    getDataFromLocalStorage() {
      const allData = JSON.parse(localStorage.getItem("allData"));
      this.backendData = allData;
    },

    startStopWatch() {
      const intervallID = setInterval(() => {
        if (this.stopWatchDoes === "start") {
          let currentSeconds = Number(this.stopWatchSeconds);
          currentSeconds++;
          if (currentSeconds === 60) {
            let currentMinutes = (Number(this.stopWatchMinutes) + 1).toString();
            if (currentMinutes.length === 1) {
              currentMinutes = "0" + currentMinutes;
            }
            this.stopWatchMinutes = currentMinutes;
            this.stopWatchSeconds = "00";
          } else {
            currentSeconds = currentSeconds.toString();
            if (currentSeconds.length === 1) {
              currentSeconds = "0" + currentSeconds;
            }
            this.stopWatchSeconds = currentSeconds;
          }
        } else {
          clearInterval(intervallID);
        }
      }, 1000);
    },
    startTheGame() {
      this.startStopWatch();
    },
  },
  created() {
    this.getDataFromLocalStorage();
  },
};
</script>

<style scoped>
.whole-area {
  display: flex;
  flex-direction: column;
  position: relative;
}

h1 {
  color: blueviolet;
  text-decoration: underline;
  font-size: 3rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

div {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

label {
  font-weight: 600;
}

.startButton {
  width: 10rem;
}

.time-display {
  font-size: 3rem;
  border: 0.5rem solid green;
  max-width: fit-content;
  padding: 1rem;
}

.stopWatch {
  display: block;
  font-size: 1rem;
  text-decoration: underline;
}
</style>
