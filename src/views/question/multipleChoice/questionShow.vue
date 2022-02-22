<template>
  <div id="questionShow">
    <p class="head">[{{ question.score }}分] 多选题</p>
    <div class="ql-editor" v-html="question.title"></div>
    <el-checkbox-group v-model="checkList">
      <div v-for="(el, idx) in question.items" :key="idx">
        <el-checkbox :label="el.prefix">
          <div class="checkbox" ql-container ql-show>
            <span class="ql-editor">{{ el.prefix }}.</span>
            <div class="ql-editor" v-html="el.content"></div>
          </div>
        </el-checkbox>
      </div>
    </el-checkbox-group>
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
      checkList: [],
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
  background: #e9ad69;
  padding: 8px;
  color: #fff;
}
.ql-container.ql-snow {
  border: none !important;
}
.ql-editor {
  padding: 0 !important;
  margin-right: 10px;
}
.el-checkbox {
  display: flex;
  margin-top: 10px;
}
.checkbox {
  display: flex;
}
.checkbox p {
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
}
</style>