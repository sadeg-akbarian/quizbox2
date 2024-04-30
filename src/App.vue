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
