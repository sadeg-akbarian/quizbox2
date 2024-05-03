<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link :to="{ name: 'theData' }">Data</router-link> |
    <router-link :to="{ name: 'adminControlPanel' }"
      >Admin Control Panel</router-link
    >
    |
    <router-link :to="{ name: 'about' }">About</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      localHost: "http://localhost:3000/",
      allBackendData: {
        highscore: null,
        groups: null,
        questions: null,
      },
    };
  },
  methods: {
    fetchAllData(xxx) {
      fetch(this.localHost + xxx)
        .then((response) => {
          if (response.ok === true) {
            return response.json();
          } else {
            alert("Error: Could not be loaded!");
          }
        })
        .then((data) => {
          this.allBackendData[xxx] = data;
          if (xxx === "questions") {
            localStorage.setItem(
              "allData",
              JSON.stringify(this.allBackendData)
            );
            this.whatIsTheLatestDateOfAllQuestions();
          }
        });
    },
    whatIsTheLatestDateOfAllQuestions() {
      const allDates = [];
      for (let question of this.allBackendData.questions) {
        const wasDateAlreadyPushed = allDates.includes(question.createdAt);
        if (wasDateAlreadyPushed === false) {
          allDates.push(question.createdAt);
        }
      }
      const sortedDates = allDates.sort((a, b) => {
        return b - a;
      });
      localStorage.setItem("latestCreationDate", sortedDates[0]);
    },
  },
  created() {
    this.fetchAllData("highscore");
    this.fetchAllData("groups");
    this.fetchAllData("questions");
  },
};
</script>

<style>
*,
::before,
::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
