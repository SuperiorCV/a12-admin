<template>
  <div id="questionShow">
    <p class="head">{{ idx }}、排序题</p>
    <draggable v-model="question.studentAnswer">
      <transition-group>
        <div
          class="answerBox"
          v-for="(element, j) in question.studentAnswer"
          :key="element.prefix"
        >
          <div class="ql-container ql-snow">
            <span>{{ j }}</span>
            <div class="content ql-editor" v-html="element.content" />
          </div>
        </div>
      </transition-group>
    </draggable>
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
      <p>正确答案：</p>
      <draggable v-model="question.answer">
        <transition-group>
          <div
            class="answerBox"
            v-for="(element, j) in question.answer"
            :key="element.prefix"
          >
            <div class="ql-container ql-snow">
              <span>{{ j }}</span>
              <div class="content ql-editor" v-html="element.content" />
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import draggable from "vuedraggable";
export default {
  name: "questionShow",
  props: {
    question: Object,
    idx: Number,
  },
  components: {
    draggable,
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
#questionShow {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}
.head {
  margin-top: 0;
  background: #596275;
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
.answerBox {
  cursor: pointer;
  min-height: 40px;
  margin-bottom: 15px;
  background: #ffff;
  border: 1px solid #dcdfe6;
  padding: 5px 10px;
  border-radius: 4px;
}
.answerBox:hover {
  background: #f5f7fa;
}
</style>