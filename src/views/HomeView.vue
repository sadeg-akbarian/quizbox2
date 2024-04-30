<template>
  <div class="home"></div>
  <GetAllBackendData :backendData="allBackendData" />
</template>

<script>
import GetAllBackendData from "@/components/GetAllBackendData.vue";
export default {
  name: "HomeView",
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
            console.log(response);
            return response.json();
          } else {
            alert("Error: Could not be loaded!");
          }
        })
        .then((data) => {
          console.log("qqqqqqqqqqqqqqqqqqqqqq");
          this.allBackendData[xxx] = data;
          if (xxx === "questions") {
            localStorage.setItem(
              "allData",
              JSON.stringify(this.allBackendData)
            );
          }
        });
    },
  },
  components: {
    GetAllBackendData,
  },
  created() {
    this.fetchAllData("highscore");
    this.fetchAllData("groups");
    this.fetchAllData("questions");
  },
};
</script>
