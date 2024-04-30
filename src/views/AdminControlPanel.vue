<template>
  <ol>
    <li v-for="question of backendDataSortedByDate" :key="question.id">
      <!-- <pre>{{ JSON.stringify(question, null, 4) }}</pre> -->
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
      backendData: null,
      backendDataSortedByDate: null,
    };
  },
  methods: {
    whichGroupIsIt(theGroupId) {
      if (theGroupId === this.backendData.groups[0].id) {
        return this.backendData.groups[0].title;
      } else {
        return this.backendData.groups[1].title;
      }
    },
    questionsSortedByDate() {
      // Damit die backend-Daten nicht verändert werden, erstelle ich ein Klon in der Konstanten questions für das spätere Displayen der Fragen
      const questions = structuredClone(this.backendData.questions);
      // In der Konstanten dateArray wird jeweils das Erstellungsdatum jeder einzelnen Frage gespeichert
      const dateArray = [];
      for (let question of questions) {
        dateArray.push(question.createdAt);
      }
      // In der Konstanten sortedDates wird dateArray neu geordnet in absteigender Reihenfolge, von neu nach alt
      const sortedDates = dateArray.sort((a, b) => {
        return b - a;
      });
      console.log(sortedDates);
      // Da einige Fragen genau dieselben Dates haben, speichere ich nun erst die einzigartigen IDs der Fragen in der Konstanten sortedIDs
      const sortedIDs = [];
      for (let date of sortedDates) {
        for (let i = 0; i < questions.length; i++) {
          console.log(date);
          console.log(questions[i].createdAt);
          // In der unteren Zeile schaue ich nun erst, ob das iterierte Datum mit aus sortedDates dem Datum der gerade iterieten Frage übereinstimmt
          if (date === questions[i].createdAt) {
            const isIDalreadyIncluded = sortedIDs.includes(questions[i].id);
            console.log(isIDalreadyIncluded);
            // Da einige Fragen dieselben Dates haben, aber immer einzigartige IDs haben, wird nun die ID der iterierten Frage nur dann gepusht, wenn sie noch nicht in
            // sortedIDs enthalten ist. Dadurch werden die Ids der Fragen mit den selben Dates auch jeweils gepusht.
            if (!isIDalreadyIncluded) {
              sortedIDs.push(questions[i].id);
            }
          }
        }
      }
      console.log(sortedIDs);
      const sortedArray = [];
      // In der Konstanten sortedArray werden nun alle Fragen von neu nach alt gespeichert
      for (let id of sortedIDs) {
        for (let question of questions) {
          if (id === question.id) {
            sortedArray.push(question);
          }
        }
      }
      console.log(sortedArray);
      this.backendDataSortedByDate = sortedArray;
    },
    getDataFromLocalStorage() {
      const allData = JSON.parse(localStorage.getItem("allData"));
      this.backendData = allData;
    },
  },
  created() {
    this.getDataFromLocalStorage();
    this.questionsSortedByDate();
  },
};
</script>

<style scoped>
* {
  text-align: left;
}

li {
  border: 0.25rem solid purple;
  width: 70vw;
}

span {
  margin-left: 1rem;
  background-color: hotpink;
}
</style>
