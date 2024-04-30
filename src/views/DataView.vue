<template>
  <pre>"highscore": {{ degdeg(theList.highscore) }}</pre>
  <div></div>
  <pre>"groups": {{ degdeg(theList.groups) }}</pre>
  <div></div>
  <pre>"questions": {{ degdeg(theList.questions) }}</pre>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      theList: null,
    };
  },
  methods: {
    degdeg(xxx) {
      const abc = JSON.stringify(xxx, null, 4);
      // console.log(abc);
      return abc;
    },
    getDataFromLocalStorage() {
      const allData = JSON.parse(localStorage.getItem("allData"));
      this.theList = allData;
    },
  },
  created() {
    this.getDataFromLocalStorage();
  },
};
</script>

<style scoped>
* {
  text-align: left;
}

div {
  width: 100%;
  height: 3rem;
  background-color: red;
}
</style>
