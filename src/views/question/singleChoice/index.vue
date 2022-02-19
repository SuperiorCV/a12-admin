<template>
  <div id="singleChoice">
    <el-form
      :model="question"
      ref="form"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="题干" prop="title" required>
        <RichEditor
          :id="-1"
          :cont="question.title"
          @updateContent="updateContent"
        ></RichEditor>
      </el-form-item>
      <el-form-item label="选项" required>
        <el-form-item
          :label="idx + `、`"
          :key="idx"
          v-for="(item, idx) in question.items"
          class="item question-item-label"
          label-width="50px"
        >
          <el-input v-model="item.prefix" style="width: 50px"></el-input>
          <RichEditor
            :id="idx"
            :cont="item.content"
            @updateContent="updateContent"
          ></RichEditor>
          <el-button
            type="danger"
            size="mini"
            class="question-item-remove"
            icon="el-icon-delete"
            @click="questionItemRemove(idx)"
          ></el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item label="解析" prop="analyze" required>
        <RichEditor
          :id="-2"
          :cont="question.analyze"
          @updateContent="updateContent"
        ></RichEditor>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import RichEditor from "@/components/RichEditor/index.vue";
export default {
  components: {
    RichEditor,
  },
  name: "singleChoice",
  data() {
    return {
      question: {
        id: null,
        questionType: 1,
        difficult: 0,
        // -1表示标题
        title: "",
        items: [
          { prefix: "A", content: "" },
          { prefix: "B", content: "" },
          { prefix: "C", content: "" },
          { prefix: "D", content: "" },
        ],
        answer: "",
        // -2表示解析
        analyze: "",
        score: "",
      },
      formLoading: false,
    };
  },
  methods: {
    questionItemRemove(idx) {
      this.question.items.splice(idx, 1);
    },
    updateContent({ id, content }) {
      if (id === -1) {
        this.question.title = content;
        // alert(this.question.title);
      } else if (id === -2) {
        this.question.analyze = content;
      } else if (id >= 0) {
        this.question.items[id].content = content;
      }
    },
  },
};
</script>

<style scoped>
#singleChoice {
  width: 100%;
  min-height: 50vh;
  box-sizing: border-box;
  padding: 20px;
  /* background: red; */
}
</style>