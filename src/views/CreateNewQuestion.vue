<template>
  <CreateAndEdit :whatShouldBeDone="sendToCreateAndEdit" />
</template>

<script>
import CreateAndEdit from "@/components/CreateAndEdit.vue";

export default {
  data() {
    return {
      sendToCreateAndEdit: {
        whatShouldBeDone: "Create",
      },
    };
  },
  name: "CreateNewQuestion",
  components: {
    CreateAndEdit,
  },
};
</script>
