<template>
  <form @submit.prevent>
    <label for="typeInQuestion">Type in a new question:</label>
    <textarea
      name=""
      id="typeInQuestion"
      v-model="suggestedNewQuestion"
    ></textarea>
    <label for="groupSelection">Select a group:</label>
    <select name="" id="groupSelection" v-model="selectedGroup">
      <option disabled value="">Please select one</option>
      <option value="htmlAndCss">Basic HTML and CSS</option>
      <option value="js">Basic JS</option>
    </select>
    <label for="oneAnswer"
      >Please add multiple (wright and wrong) answers:</label
    >
    <input
      type="text"
      id="oneAnswer"
      v-model="suggestedAnswer"
      @keyup.enter="addNewAnswer($event)"
    />
  </form>
  <h1>Given Answers</h1>
  <table>
    <thead>
      <tr>
        <th>The Anwers</th>
        <th>Is the answer valid</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="answer of answerArray"
        :key="answer.text.toLowerCase().replaceAll(' ', '')"
      >
        <td>{{ answer.text }}</td>
        <td>
          <div class="check-container">
            <p>check if yes:</p>
            <input
              type="checkbox"
              :checked="answer.isValid"
              @click="answer.isValid = !answer.isValid"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <h2>
    Du musst noch ein isActive-Check durchführen und diesen in Zeile 108 mit
    einer if-else-Schleife einfügen!!!
  </h2>
  <button type="submit" class="submitButton" @click="submitTheQuestion()">
    Submit the question
  </button>
</template>

<script>
export default {
  name: "CreateNewQuestion",
  data() {
    return {
      suggestedNewQuestion: "",
      selectedGroup: "",
      suggestedAnswer: "",
      answerArray: [],
      idForHtmlAndCss: "c76668d0-ce3a-48a7-acd5-0f54ad6818e1",
      idForJs: "9d5ae045-ef9a-4068-bc6c-1b102bda5f55",
      newQuestion: {},
      isActive: false,
    };
  },
  methods: {
    initialQuestionObject() {
      this.newQuestion = {
        groupId: "",
        isActive: this.isActive,
        question: "",
        answers: [],
      };
    },
    addNewAnswer(event) {
      this.answerNumber++;
      console.log(event.target.value);
      const newAnswerObject = {
        id: 0,
        isValid: false,
        text: event.target.value,
      };
      this.answerArray.push(newAnswerObject);
      this.suggestedAnswer = "";
    },
    submitTheQuestion() {
      if (
        this.suggestedNewQuestion.length > 5 &&
        this.suggestedNewQuestion[this.suggestedNewQuestion.length - 1] === "?"
      ) {
        if (this.selectedGroup !== "") {
          if (this.answerArray.length > 1) {
            console.log("Hallo");
            let howManyValidAnwers = 0;
            for (let answer of this.answerArray) {
              if (answer.isValid) {
                howManyValidAnwers++;
              }
            }
            if (howManyValidAnwers > 0) {
              console.log("öööööööööööööö");
              for (let i = 0; i < this.answerArray.length; i++) {
                this.answerArray[i].id = i + 1;
              }
            } else {
              alert("Please check at least 1 of the answers!");
            }
          } else {
            alert("Please add at least 2 answers!");
          }
        } else {
          alert("Please select a group!");
        }
      } else {
        alert(
          "Please type in a question which has more than 5 characters and which ends with the symbol '?'"
        );
      }
    },
  },
  created() {
    this.initialQuestionObject();
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-size: 1.5rem;
  font-weight: 600;
  margin-block: 1rem;
}

textarea {
  width: 40vw;
  height: 5vw;
}

textarea,
select,
form {
  margin-bottom: 4rem;
}

table {
  margin-inline: auto;
  border-collapse: collapse;
}

th,
td {
  border: 0.1rem solid black;
  padding: 1rem;
}

.check-container {
  display: flex;
  justify-content: center;
}

p {
  display: inline;
  margin: 0;
  margin-right: 0.5rem;
}

.submitButton {
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 0.5em;
  background-color: chocolate;
  padding: 1rem;
  margin-block: 2rem;
}

h2 {
  font-size: 3rem;
  color: red;
  text-decoration: underline;
}
</style>
