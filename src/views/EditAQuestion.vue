<template>
  <CreateAndEdit :whatShouldBeDone="sendToCreateAndEdit" />
</template>

<script>
import CreateAndEdit from "@/components/CreateAndEdit.vue";

export default {
  name: "EditAQuestion",
  data() {
    return {
      sendToCreateAndEdit: {
        whatShouldBeDone: "Edit",
        question: {},
      },
    };
  },
  components: {
    CreateAndEdit,
  },
  created() {
    this.sendToCreateAndEdit.question = JSON.parse(
      localStorage.getItem("questionToEdit")
    );
  },
};
</script>
