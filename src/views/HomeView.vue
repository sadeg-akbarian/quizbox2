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
      <button type="button" class="startButton">Start the quiz</button>
    </form>
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
    };
  },
  methods: {
    getDataFromLocalStorage() {
      const allData = JSON.parse(localStorage.getItem("allData"));
      this.backendData = allData;
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
</style>
