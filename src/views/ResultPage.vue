<template>
  <div class="whole-area">
    <router-link
      :to="{ name: 'home' }"
      class="replayButton"
      @click="deletetheResultInLocalStorage()"
      >Start new game</router-link
    >
    <h1>{{ congratulationWords }}</h1>
    <div class="statisticsContainer">
      <p>
        Time needed &#x2192; {{ endResult.stopTime.minutes }}:{{
          endResult.stopTime.seconds
        }}min
      </p>
      <p>Correct Answers &#x2192; {{ percentageOfRightAnswers }}%</p>
    </div>
    <table>
      <thead>
        <tr>
          <th>The question</th>
          <th>The answers</th>
          <th>Selected answer</th>
          <th>Expected answer</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(question, indexOfQuestion) of endResult.quizQuestions"
          :key="question.createdAt"
        >
          <tr
            v-for="(answer, indexOfAnswer) of question.answers"
            :key="'' + question.createdAt + indexOfAnswer"
          >
            <td v-if="indexOfAnswer === 0" :rowspan="question.answers.length">
              {{ question.question }}
            </td>
            <td>{{ answer.text }}</td>
            <td>
              {{
                isItRightOrWrong(
                  endResult.answeredQuizQuestions[indexOfQuestion][
                    indexOfAnswer
                  ].answerChecked
                )
              }}
            </td>
            <td>{{ isItRightOrWrong(answer.isValid) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ResultPage",
  data() {
    return {
      endResult: {},
      congratulationWords: "",
      totalAmountOfAnswers: 0,
      amountOfRightAnswers: 0,
      amountOfWrongAnswers: 0,
      percentageOfRightAnswers: 0,
    };
  },
  methods: {
    getDataFromLocalStorage() {
      const endResult = JSON.parse(localStorage.getItem("endResult"));
      this.endResult = endResult;
    },
    createUniqueKey() {
      const dateString = Date.now().toString(36);
      const randomness = Math.random().toString(36).substring(2);
      return dateString + randomness;
    },
    isItRightOrWrong(isValid) {
      if (isValid) {
        return "✅";
      } else {
        return "❌";
      }
    },
    createTheStatistics() {
      for (let i = 0; i < this.endResult.quizQuestions.length; i++) {
        const expectedAnswersForThisQuestion =
          this.endResult.quizQuestions[i].answers;
        this.totalAmountOfAnswers += expectedAnswersForThisQuestion.length;
        const selectedAnswersForThisQuestion =
          this.endResult.answeredQuizQuestions[i];
        for (let j = 0; j < expectedAnswersForThisQuestion.length; j++) {
          if (
            expectedAnswersForThisQuestion[j].isValid ===
            selectedAnswersForThisQuestion[j].answerChecked
          ) {
            this.amountOfRightAnswers++;
          } else {
            this.amountOfWrongAnswers++;
          }
        }
      }
      const percentageOfRightAnswers = (
        (this.amountOfRightAnswers / this.totalAmountOfAnswers) *
        100
      ).toFixed(0);
      this.percentageOfRightAnswers = Number(percentageOfRightAnswers);
      if (this.percentageOfRightAnswers < 50) {
        this.congratulationWords =
          "Not bad for beginners. Continue to practice 😉";
      } else if (50 <= this.percentageOfRightAnswers <= 99) {
        this.congratulationWords =
          "That was already pretty good! Try it again to join the 100% club 🤙";
      } else if (this.percentageOfRightAnswers > 99) {
        this.congratulationWords =
          "Wow you are very talented! I bet you can`t repeat that, can you? 😁";
      }
    },
    deletetheResultInLocalStorage() {
      localStorage.removeItem("endResult");
    },
  },
  created() {
    this.getDataFromLocalStorage();
    this.createTheStatistics();
  },
};
</script>

<style scoped>
.whole-area {
  padding-bottom: 2rem;
  position: relative;
  margin-top: 40px;
}

.replayButton {
  position: absolute;
  font-size: 1.5rem;
  right: 2.5vw;
  font-weight: 600;
  border: 0.125em solid black;
  border-radius: 0.375rem;
  padding: 0.375em;
  text-decoration: none;
  background-color: red;
}

@media screen and (min-width: 470px) {
  .replayButton {
    top: 14.5em;
  }
}

@media screen and (min-width: 540px) {
  .replayButton {
    top: 12em;
  }
}

@media screen and (min-width: 590px) {
  .replayButton {
    top: 9.75em;
  }
}

@media screen and (min-width: 690px) {
  .replayButton {
    right: 4vw;
    top: 14.5em;
  }
}

/* @media screen and (min-width: 596px) {
  .replayButton {
    top: 14.5em;
    right: 5vw;
  }
} */

@media screen and (min-width: 786px) {
  .replayButton {
    font-size: 2rem;
    top: 8.5em;
    right: 7.5vw;
  }
}

@media screen and (min-width: 1120px) {
  .replayButton {
    top: 6.5em;
    right: 10vw;
  }
}

h1 {
  margin-inline: 15vw;
  margin-bottom: 5rem;
}

.statisticsContainer {
  max-width: fit-content;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  margin-left: 10vw;
  margin-top: 2rem;
  margin-bottom: 4rem;
  padding: 2rem;
  background-color: #7bf0bb;
}

.statisticsContainer p {
  margin-block: 0.25rem;
}

table {
  border-collapse: collapse;
  margin-inline: 5vw;
}

thead {
  position: sticky;
  top: 0.5rem;
  background-color: lightblue;
}

th,
td {
  border: 0.3rem solid #42b983;
  padding-block: 1.5rem;
}
</style>
