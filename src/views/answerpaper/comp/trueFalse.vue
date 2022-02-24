<template>
  <div id="singleChoice">
    <p class="head">{{ idx }}、 判断题</p>
    <div class="ql-editor" v-html="question.title"></div>
    <el-radio-group v-model="question.studentAnswer">
      <div v-for="(el, idx) in question.items" :key="idx">
        <el-radio :label="el.prefix">
          <div class="radio">
            <span class="ql-editor">{{ el.prefix }}.</span>
            <div class="ql-editor" v-html="el.content"></div>
          </div>
        </el-radio>
      </div>
    </el-radio-group>
    <div class="info">
      <p>
        结果：<el-tag :type="questionStatus(question.status)">
          {{ tagContent(question.status) }}</el-tag
        >
      </p>
      <p>得分：{{ question.studentScore }} / {{ question.score }}分</p>
      <p class="rate">
        难度：<el-rate disabled v-model="question.difficult"></el-rate>
      </p>
      <p>解析：{{ question.analyze }}</p>
      <p>正确答案：{{ question.answer }}</p>
    </div>
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "trueFalse",
  props: {
    question: Object,
    idx: Number,
  },
  data() {
    return {
        radio:"",
    };
  },
  methods: {
    questionStatus(status) {
      if (status === -1) {
        return `danger`;
      } else if (status === 0) {
        return `warning`;
      } else if (status === 1) {
        return `success`;
      }
    },
    tagContent(status) {
      if (status === -1) {
        return `错误`;
      } else if (status === 0) {
        return `待批改`;
      } else if (status === 1) {
        return `正确`;
      }
    },
  },
};
</script>

<style scoped>
#singleChoice {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}
.rate {
  display: flex;
}
.head {
  margin-top: 0;
  background: #6a89cc;
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
.el-radio {
  display: flex;
  margin-top: 10px;
}
.radio {
  display: flex;
}
.radio p {
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
}
</style>