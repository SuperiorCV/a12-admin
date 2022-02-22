<template>
  <div id="questionShow">
    <p class="head">[{{ question.score }}分] 简答题</p>
    <div class="ql-editor" v-html="question.title"></div>
    <el-input
      type="textarea"
      :min="3"
      :max="6"
      placeholder="请输入答案"
      v-model="question.answer">
    </el-input>
    
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "questionShow",
  props: {
    question: Object,
  },
  data() {
    return {
      radio: "",
    };
  },
};
</script>

<style scoped>
#questionShow {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}
.head {
  margin-top: 0;
  background: #cf6a87;
  padding: 8px;
  color: #fff;
}
.ql-container.ql-snow {
  border: none !important;
}
.ql-editor {
  padding: 0 !important;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>