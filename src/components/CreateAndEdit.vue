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
      <option :value="idForHtmlAndCss">Basic HTML and CSS</option>
      <option :value="idForJs">Basic JS</option>
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
  <form @submit.prevent>
    <div class="active-Container">
      <p>Should the question be active?</p>
      <label for="yes">Yes</label
      ><input
        type="radio"
        name="activeButtons"
        id="yes"
        value="true"
        v-model="isActive"
      />
      <label for="no">No</label
      ><input
        type="radio"
        name="activeButtons"
        id="no"
        value="false"
        v-model="isActive"
      />
    </div>
    <button type="submit" class="submitButton" @click="submitTheQuestion()">
      Submit the question
    </button>
  </form>
</template>

<script>
import router from "@/router";

export default {
  name: "CreateAndEdit",
  data() {
    return {
      suggestedNewQuestion: "",
      selectedGroup: "",
      suggestedAnswer: "",
      answerArray: [],
      idForHtmlAndCss: "c76668d0-ce3a-48a7-acd5-0f54ad6818e1",
      idForJs: "9d5ae045-ef9a-4068-bc6c-1b102bda5f55",
      newQuestion: {},
      isActive: null,
      radioButtonYes: false,
      radioButtonNo: false,
      localHost: "http://localhost:3000/",
    };
  },
  props: {
    whatShouldBeDone: Object,
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
      const newAnswerObject = {
        id: 0,
        isValid: false,
        text: event.target.value,
      };
      this.answerArray.push(newAnswerObject);
      this.suggestedAnswer = "";
    },
    sendTheQuestionToBackend() {
      if (this.whatShouldBeDone.whatShouldBeDone === "Create") {
        fetch(this.localHost + "questions/", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(this.newQuestion),
        })
          .then((response) => {
            if (response.ok === true) {
              return response.json();
            } else {
              alert("Error: Question could not be send to server!!!");
            }
          })
          .then((data) => {
            const allData = JSON.parse(localStorage.getItem("allData"));
            allData.questions.push(data);
            localStorage.setItem("allData", JSON.stringify(allData));
            router.push({ name: "adminControlPanel" });
          });
      } else {
        fetch(
          this.localHost + "questions/" + this.whatShouldBeDone.question.id,
          {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(this.newQuestion),
          }
        )
          .then((response) => {
            if (response.ok === true) {
              return response.json();
            } else {
              alert("Error: Question could not be send to server!!!");
            }
          })
          .then((data) => {
            const allData = JSON.parse(localStorage.getItem("allData"));
            for (let i = 0; i < allData.questions.length; i++) {
              if (allData.questions[i].id === data.id) {
                allData.questions[i] = data;
              }
            }
            localStorage.setItem("allData", JSON.stringify(allData));
            localStorage.removeItem("questionToEdit");
            router.push({ name: "adminControlPanel" });
          });
      }
    },
    submitTheQuestion() {
      if (
        this.suggestedNewQuestion.length > 5 &&
        this.suggestedNewQuestion[this.suggestedNewQuestion.length - 1] === "?"
      ) {
        if (this.selectedGroup !== "") {
          if (this.answerArray.length > 1) {
            let howManyValidAnwers = 0;
            for (let answer of this.answerArray) {
              if (answer.isValid) {
                howManyValidAnwers++;
              }
            }
            if (howManyValidAnwers > 0) {
              if (this.isActive !== null) {
                for (let i = 0; i < this.answerArray.length; i++) {
                  this.answerArray[i].id = i + 1;
                }
                this.newQuestion.groupId = this.selectedGroup;
                this.newQuestion.isActive = this.isActive;
                this.newQuestion.question = this.suggestedNewQuestion;
                this.newQuestion.answers = this.answerArray;
                this.sendTheQuestionToBackend();
              } else {
                alert(
                  "Please choose wether the question should be active: yes or no!!!"
                );
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
    if (this.whatShouldBeDone.whatShouldBeDone === "Edit") {
      this.answerArray = this.whatShouldBeDone.question.answers;
      this.selectedGroup = this.whatShouldBeDone.question.groupId;
      this.isActive = this.whatShouldBeDone.question.isActive;
      if (this.whatShouldBeDone.question.isActive === true) {
        this.radioButtonYes = true;
      } else {
        this.radioButtonNo = true;
      }
      this.suggestedNewQuestion = this.whatShouldBeDone.question.question;
    }
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
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

h1 {
  margin-block: 1rem;
  font-size: 3rem;
  text-shadow: none;
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
  margin-bottom: 2rem;
}

.active-Container {
  margin-block: 4rem;
}

.active-Container > p {
  font-size: 2rem;
  font-weight: 600;
  color: green;
}

.active-Container input {
  margin-inline: 0.5rem;
}
</style>
