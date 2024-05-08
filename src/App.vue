<template>
  <div class="root-whole-area">
    <div class="menu-container">
      <img
        src="@/assets/menu.png"
        alt="menu-icon"
        :style="{ display: showMenuIcon }"
        @click="displayMenu($event)"
      />
      <img
        src="@/assets/close.png"
        alt="close-icon"
        :style="{ display: showCloseIcon }"
        @click="displayMenu($event)"
      />
      <h1>Quizbox</h1>
    </div>
    <nav :style="{ display: showNav }">
      <router-link :to="{ name: 'home' }" @click="displayMenu($event)"
        >Home</router-link
      >
      <router-link :to="{ name: 'theData' }" @click="displayMenu($event)"
        >Data</router-link
      >
      <router-link
        :to="{ name: 'adminControlPanel' }"
        @click="displayMenu($event)"
        >Admin Control Panel</router-link
      >

      <router-link :to="{ name: 'about' }" @click="displayMenu($event)"
        >About</router-link
      >
    </nav>
    <div class="theTriangle"></div>
    <router-view />
  </div>
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
      showMenuIcon: "block",
      showCloseIcon: "none",
      showNav: "none",
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
          }
        });
    },
    displayMenu(event) {
      if (event.target.alt === "menu-icon") {
        this.showMenuIcon = "none";
        this.showCloseIcon = "block";
        this.showNav = "flex";
      } else if (
        event.target.alt === "close-icon" ||
        event.srcElement.localName === "a"
      ) {
        this.showMenuIcon = "block";
        this.showCloseIcon = "none";
        this.showNav = "none";
      }
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

.menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #42b983;
  padding-top: 30px;
}

img {
  width: 2rem;
  height: 2rem;
}

h1 {
  margin-block: 0;
}

.theTriangle {
  width: 0;
  height: 0;
  border-left: 50vw solid transparent;
  border-right: 50vw solid transparent;
  border-top: 20px solid #42b983;
  position: absolute;
  z-index: 1;
}

nav {
  padding: 30px;
  flex-direction: column;
  background-color: #42b983;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #424ab9;
}
</style>
