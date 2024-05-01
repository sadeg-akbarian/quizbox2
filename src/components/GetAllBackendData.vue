<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      dataFromBackend: this.backendData,
    };
  },
  name: "GetAllBackendData",
  props: {
    backendData: Object,
  },
};
</script>
