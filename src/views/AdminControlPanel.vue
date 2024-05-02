<template>
  <form>
    <div class="suggestionAndSelection">
      <label for="searchElement">Type in your question</label>
      <input
        type="text"
        placeholder="Type in your question"
        id="searchElement"
        class="searchElement"
        v-model.trim="suggestedQuestion"
        @click="displayNoEntry = 'none'"
      />
      <button type="button" @click="findFittingQuestions">&#128270;</button>
      <div class="not-found" :style="{ display: displayNoEntry }">
        Sorry, no entry was found!!!
      </div>
      <div
        class="not-found-triangle"
        :style="{ display: displayNoEntry }"
      ></div>
      <label for="selectAGroup">Which group:</label>
      <select
        name="groupSelection"
        id="selectAGroup"
        @click="groupSelection($event), findFittingQuestions()"
      >
        <option value="">All groups</option>
        <option :value="idForHtmlAndCss">Basic HTML and CSS</option>
        <option :value="idForJs">Basic JS</option>
      </select>
    </div>
    <!-- <button type="button" class="createQuestion">Create Question jdjfd</button> -->
    <router-link :to="{ name: 'createnewquestion' }" class="createQuestion"
      >Create new question</router-link
    >
  </form>
  <ol>
    <li v-for="question of questionsSorted" :key="question.id">
      <pre><span>Question:</span> {{ question.question }}</pre>
      <pre><span>Group:</span> {{ whichGroupIsIt(question.groupId) }}</pre>
      <pre><span>isActive:</span> {{ question.isActive }}</pre>
    </li>
  </ol>
</template>

<script>
export default {
  name: "AdminControlPanel",
  data() {
    return {
      backendData: [],
      questionsSorted: [],
      suggestedQuestion: "",
      fittingQuestions: [],
      displayNoEntry: "none",
      whichGroupIsDisplayed: "",
      idForHtmlAndCss: "c76668d0-ce3a-48a7-acd5-0f54ad6818e1",
      idForJs: "9d5ae045-ef9a-4068-bc6c-1b102bda5f55",
      wasTheGroupChanged: true,
    };
  },
  methods: {
    getDataFromLocalStorage() {
      const allData = JSON.parse(localStorage.getItem("allData"));
      this.backendData = allData;
    },
    questionsSortedByDate(whichDataShouldBeSorted) {
      // Damit die backend-Daten nicht verändert werden, erstelle ich ein Klon in der Konstanten questions für das spätere Displayen der Fragen
      const questions = structuredClone(whichDataShouldBeSorted);

      const sortedQuestionsByDate = questions.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      this.questionsSorted = sortedQuestionsByDate;
    },
    whichGroupIsIt(theGroup) {
      if (theGroup === this.backendData.groups[0].id) {
        return this.backendData.groups[0].title;
      } else {
        return this.backendData.groups[1].title;
      }
    },
    groupSelection(event) {
      if (this.whichGroupIsDisplayed !== event.target.value) {
        this.whichGroupIsDisplayed = event.target.value;
        this.wasTheGroupChanged = true;
      } else {
        this.wasTheGroupChanged = false;
      }
    },
    sortByGroup(whichArrayToBeSorted) {
      const newArraySortedByGroup = [];
      for (let question of whichArrayToBeSorted) {
        if (question.groupId === this.whichGroupIsDisplayed) {
          newArraySortedByGroup.push(question);
        }
      }
      return newArraySortedByGroup;
    },
    findFittingQuestions() {
      if (this.wasTheGroupChanged) {
        if (this.suggestedQuestion === "") {
          if (this.whichGroupIsDisplayed === "") {
            this.questionsSortedByDate(this.backendData.questions);
          } else {
            const arraySortedByGroup = this.sortByGroup(
              this.backendData.questions
            );

            this.questionsSortedByDate(arraySortedByGroup);
          }
        } else {
          this.fittingQuestions.length = 0;
          const suggestedQuestionInLowCase =
            this.suggestedQuestion.toLowerCase();
          for (let question of this.backendData.questions) {
            const givenQuestionsInLowCase = question.question.toLowerCase();
            const isItIncluded = givenQuestionsInLowCase.includes(
              suggestedQuestionInLowCase
            );
            if (isItIncluded) {
              this.fittingQuestions.push(question);
            }
          }
          if (this.fittingQuestions.length > 0) {
            if (this.whichGroupIsDisplayed === "") {
              this.questionsSortedByDate(this.fittingQuestions);
            } else {
              const fittingQuestionsSortedByGroup = [];
              for (let question of this.fittingQuestions) {
                if (question.groupId === this.whichGroupIsDisplayed) {
                  fittingQuestionsSortedByGroup.push(question);
                }
              }
              if (fittingQuestionsSortedByGroup.length > 0) {
                this.questionsSortedByDate(fittingQuestionsSortedByGroup);
              } else {
                this.displayNoEntry = "block";
              }
            }
          } else {
            this.displayNoEntry = "block";
          }
        }
      }
    },
  },
  created() {
    this.getDataFromLocalStorage();
    this.questionsSortedByDate(this.backendData.questions);
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin-left: 2.5rem;
}
.suggestionAndSelection {
  display: flex;
  position: relative;
  align-items: center;
}

label:first-child {
  display: none;
}

label {
  margin-inline: 0.5rem;
}

.searchElement {
  width: 50vw;
}

.not-found {
  border: 0.2rem solid black;
  background-color: red;
  padding: 1rem;
  font-weight: 900;
  position: absolute;
  top: 2.6rem;
  left: 30vw;
}

.not-found-triangle {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 30px solid black;
  position: absolute;
  left: 30vw;
  top: 0.8rem;
}

.createQuestion {
  text-decoration: none;
  width: 15rem;
  margin-top: 1rem;
  background-color: rgb(240, 168, 61);
  font-size: 1.25rem;
  font-weight: 600;
  padding-block: 0.5em;
  padding-inline: 0.75em;
  border: 0.15rem solid black;
  border-radius: 0.5em;
}

ol {
  text-align: left;
  padding-bottom: 1rem;
}

li {
  border: 0.25rem solid purple;
  width: 70vw;
  padding: 0.25rem;
}

pre {
  white-space: pre-wrap;
}

span {
  margin-left: 1rem;
  background-color: hotpink;
}
</style>
