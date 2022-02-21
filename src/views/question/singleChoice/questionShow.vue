<template>
  <div id="questionShow">
    <div id="stem">
      <span style="margin-right:10px">[{{question.score}}分]</span>
      <div class="ql-editor" v-html="question.title"></div>
    </div>
    <el-radio-group v-model="radio">
      <div v-for="(el, idx) in question.items" :key="idx">
        <el-radio :label="el.prefix">
          <div class="radio" ql-container ql-show>
            <span class="ql-editor">{{ el.prefix }}.</span>
            <div class="ql-editor" v-html="el.content"></div>
          </div>
        </el-radio>
      </div>
    </el-radio-group>
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
  flex-direction:column;
}
#stem{
  display: flex;
  margin-bottom: 10px;
}
.ql-container.ql-snow {
  border: none !important;
}
.ql-editor {
  padding: 0 !important;
  margin-right: 10px;
}
.el-radio {
  display: flex;
  margin-top: 10px;
}
.radio {
  display: flex;
}
.radio p{
  margin-block-start: 0!important;
    margin-block-end: 0!important;
}
</style>