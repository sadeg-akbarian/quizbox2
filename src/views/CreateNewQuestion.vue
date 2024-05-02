<template>
  <form>
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
    <input type="text" list="newAnswers" id="oneAnswer" />
    <datalist id="newAnswers" @keyup.prevent.enter="addNewAnswer($event)">
      <option value="jbljfgh">nhdslj</option>
      <option value="xxxxx">Hallo</option>
    </datalist>
  </form>
  <p>Frag Chat GPT für die datalist!!!</p>
</template>

<script>
export default {
  name: "CreateNewQuestion",
  data() {
    return {
      suggestedNewQuestion: "",
      selectedGroup: "",
      suggestedAnswers: [],
    };
  },
  methods: {
    addNewAnswer(event) {
      console.log(event);
    },
  },
};
</script>

<style scoped>
p {
  font-size: 3rem;
  color: red;
}

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
</style>
