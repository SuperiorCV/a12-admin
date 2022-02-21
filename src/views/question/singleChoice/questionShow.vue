<template>
  <div id="questionShow">
      在这里面写预览
  </div>
</template>


<script>
export default {
  name: "questionShow",
  props:{
      question: Object
  }
};
</script>

<style scoped>
#questionShow {
  width: 100%;
  min-height: 200px;
  background: pink;
}
</style>