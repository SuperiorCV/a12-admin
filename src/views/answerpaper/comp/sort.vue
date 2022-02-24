<template>
  <div id="questionShow">
    <p class="head">{{ idx }}、排序题</p>
    <draggable v-model="question.studentAnswer" @end="onDragEnd">
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