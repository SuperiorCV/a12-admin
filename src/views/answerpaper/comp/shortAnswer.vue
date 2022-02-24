<template>
  <div id="shortAnswer">
    <p class="head">{{ idx }}、 简答题</p>
    <div class="ql-editor" v-html="question.title"></div>
    <div class="note">考生答案：</div>
    <div class="ql-editor" v-html="question.studentAnswer"></div>
    <div class="info">
      <p>
        结果：<el-tag :type="questionStatus(question.status)">
          {{ tagContent(question.status) }}</el-tag
        >
      </p>
      <div class="giveScore">
          <span>得分：</span>
          <el-input-number
          :min="0"
          :max="question.score"
          :step="0.5"
          v-model="studentScore"
        ></el-input-number>
      </div>
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
  name: "shortAnswer",
  props: {
    question: Object,
    idx: Number,
  },
  data() {
    return {
      studentScore: undefined,
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
#shortAnswer {
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
  background: #8cbda4;
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
.note {
    margin: 10px 0;
}

</style>