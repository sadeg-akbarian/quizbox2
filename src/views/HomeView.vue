<template>
  <div class="whole-area">
    <form @submit.prevent :style="{ display: formDisplay }">
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
    <div class="progress-container" :style="{ display: showProgessContainer }">
      <p class="time-display">
        <span class="stopWatch">Stopwatch</span>
        <span class="theMinutes">{{ stopWatchMinutes }}</span> :
        <span class="theSeconds">{{ stopWatchSeconds }}</span>
      </p>
      <p
        class="visible-progress-indicator"
        :style="{
          backgroundImage:
            'linear-gradient(to right, #42b9b3 ' +
            progessIndicatorBackgroundSize +
            '%, transparent ' +
            progessIndicatorBackgroundSize +
            '%)',
        }"
      >
        <span class="finishedQuestions">Finished questions</span
        ><span
          >{{ currentDisplayedQuestion }} of {{ quizQuestions.length }}</span
        >
      </p>
    </div>
    <h2>Your choosen quiz questions</h2>
    <template
      v-for="(question, indexOfQuestions) of quizQuestions"
      :key="question.createdAt"
    >
      <div
        class="displayQuestion-container"
        v-if="indexOfQuestions === currentDisplayedQuestion"
      >
        <p>
          <span class="nrOfQuestion"
            >Question nr.{{ indexOfQuestions + 1 }}:</span
          >
          <span class="questionStyle">{{ " " + question.question }}</span>
        </p>
        <ul>
          <li v-for="answer of question.answers" :key="answer.text">
            <input
              type="checkbox"
              :id="answer.id"
              class="answerCheckbox"
            /><label :for="answer.id">{{ answer.text }}</label>
          </li>
        </ul>
        <button
          type="button"
          class="nextButton"
          @click="storeTheResults($event, indexOfQuestions)"
        >
          Next
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "HomeView",
  data() {
    return {
      backendData: [],
      amountOfSelectedQuestions: 0,
      theSelectedGroup: "",
      idForHtmlAndCss: "c76668d0-ce3a-48a7-acd5-0f54ad6818e1",
      idForJs: "9d5ae045-ef9a-4068-bc6c-1b102bda5f55",
      formDisplay: "flex",
      showProgessContainer: "none",
      stopWatchMinutes: "00",
      stopWatchSeconds: "00",
      stopWatchDoes: "start",
      allHtmlAndCssQuestions: [],
      allJsQuestions: [],
      quizQuestions: [],
      answeredQuizQuestions: [],
      currentDisplayedQuestion: 0,
    };
  },
  computed: {
    progessIndicatorBackgroundSize() {
      return (
        (this.currentDisplayedQuestion / this.amountOfSelectedQuestions) * 100
      );
    },
  },
  methods: {
    getDataFromLocalStorage() {
      const allData = JSON.parse(localStorage.getItem("allData"));
      this.backendData = allData;
    },
    createArraysForBothGroups() {
      for (let question of this.backendData.questions) {
        if (question.groupId === this.idForHtmlAndCss) {
          this.allHtmlAndCssQuestions.push(question);
        } else {
          this.allJsQuestions.push(question);
        }
      }
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
    getTheQuestions() {
      const arrayNumbers = [];
      function getRandomNumber(whichGroupOfQuestions) {
        const randomNumber = Math.floor(
          Math.random() * whichGroupOfQuestions.length
        );
        if (arrayNumbers.includes(randomNumber)) {
          getRandomNumber(whichGroupOfQuestions);
        } else {
          arrayNumbers.push(randomNumber);
        }
      }
      for (let i = 0; i < this.amountOfSelectedQuestions; i++) {
        if (this.theSelectedGroup === this.idForHtmlAndCss) {
          getRandomNumber(this.allHtmlAndCssQuestions);
        } else {
          getRandomNumber(this.allJsQuestions);
        }
      }
      const arrayOfQuizQuestions = [];
      if (this.theSelectedGroup === this.idForHtmlAndCss) {
        for (let number of arrayNumbers) {
          const currentQuestion = this.allHtmlAndCssQuestions[number];
          arrayOfQuizQuestions.push(currentQuestion);
        }
      } else {
        for (let number of arrayNumbers) {
          const currentQuestion = this.allJsQuestions[number];
          arrayOfQuizQuestions.push(currentQuestion);
        }
      }
      this.quizQuestions = arrayOfQuizQuestions;
    },
    startTheGame() {
      if (this.amountOfSelectedQuestions !== 0) {
        if (this.theSelectedGroup !== "") {
          this.formDisplay = "none";
          this.getTheQuestions();
          this.showProgessContainer = "flex";
          this.startStopWatch();
        } else {
          alert("Please choose which group you would like to play!");
        }
      } else {
        alert("Please choose how many questions you would like to play!");
      }
    },
    storeTheResults(event, questionIndex) {
      const theUl = event.target.parentElement.querySelector("ul");
      const allInputs = theUl.querySelectorAll("input");
      const answerArray = [];
      for (let input of allInputs) {
        const answerObject = {
          answerId: "_" + input.id,
          answerChecked: input.checked,
        };
        answerArray.push(answerObject);
      }
      this.answeredQuizQuestions[questionIndex] = answerArray;
      if (this.currentDisplayedQuestion !== this.quizQuestions.length - 1) {
        this.currentDisplayedQuestion++;
      } else {
        this.stopWatchDoes = "stop";
        const endResults = {};
        endResults.stopTime = {
          minutes: this.stopWatchMinutes,
          seconds: this.stopWatchSeconds,
        };
        endResults.quizQuestions = this.quizQuestions;
        endResults.answeredQuizQuestions = this.answeredQuizQuestions;
        localStorage.setItem("endResult", JSON.stringify(endResults));
        router.push({ name: "resultpage" });
      }
    },
  },
  created() {
    this.getDataFromLocalStorage();
    this.createArraysForBothGroups();
  },
};
</script>

<style scoped>
.whole-area {
  display: flex;
  flex-direction: column;
  position: relative;
}

form {
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 100px;
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

.progress-container {
  justify-content: center;
  position: relative;
  top: 45px;
}

.time-display,
.visible-progress-indicator {
  font-size: 3rem;
  border: 0.5rem solid #42b9b3;
  max-width: fit-content;
  margin-top: 0;
  padding: 1rem;
}

.stopWatch,
.finishedQuestions {
  display: block;
  font-size: 1rem;
  text-decoration: underline;
}

.displayQuestion-container {
  border: 1rem solid blueviolet;
  display: flex;
  flex-direction: column;
  position: relative;
}

.nrOfQuestion {
  font-size: 1.25rem;
  font-weight: 800;
  background-color: aqua;
}

.questionStyle {
  font-weight: 600;
}

ul {
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  margin-bottom: 4.5rem;
}

li {
  all: unset;
  max-width: fit-content;
}

.answerCheckbox {
  margin: 0.25rem;
}

.nextButton {
  /* position: absolute; */
  font-size: 1.5rem;
  background-color: rgb(231, 54, 231);
  padding: 0.5rem;
  border-radius: 0.5rem;
  max-width: fit-content;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
</style>
