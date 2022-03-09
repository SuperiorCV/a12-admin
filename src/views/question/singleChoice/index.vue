<template>
  <div id="singleChoice">
    <el-form
      :model="question"
      :rules="rules"
      ref="question"
      label-width="100px"
    >
      <el-form-item label="题干：" prop="title" required>
        <RichEditor
          :id="-1"
          :cont="question.title"
          @updateContent="updateContent"
        ></RichEditor>
      </el-form-item>
      <el-form-item label="选项：" required>
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
      <el-form-item label="答案：" prop="answer" required>
        <el-radio-group v-model="question.answer">
          <el-radio
            v-for="item in question.items"
            :key="item.prefix"
            :label="item.prefix"
          >
            {{ item.prefix }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="解析：" prop="analyze" required>
        <RichEditor
          :id="-2"
          :cont="question.analyze"
          @updateContent="updateContent"
        ></RichEditor>
      </el-form-item>
      <el-form-item label="分数：" prop="score" required>
        <el-input-number
          :min="0"
          :step="0.5"
          v-model="question.score"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="难度：" required>
        <el-rate
          v-model="question.difficult"
          class="question-item-rate"
        ></el-rate>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitQuestion">提交</el-button>
        <el-button @click="resetQuestion">重置</el-button>
        <el-button type="success" @click="questionItemAdd">添加选项</el-button>
        <el-button type="success" @click="questionVisible = true"
          >预览题目</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="questionVisible"
      style="width: 100%; height: 100%"
    >
      <QuestionShow :question="question" />
    </el-dialog>
  </div>
</template>

<script>
import RichEditor from "@/components/RichEditor/index.vue";
import QuestionShow from "@/components/QuestionShow/index.vue";
export default {
  components: {
    RichEditor,
    QuestionShow,
  },
  name: "singleChoice",
  data() {
    return {
      isEdit: false,
      question: {
        id: "",
        questionType: 1,
        difficult: 0,

        title: "",
        items: [
          { prefix: "A", content: "" },
          { prefix: "B", content: "" },
          { prefix: "C", content: "" },
          { prefix: "D", content: "" },
        ],
        answer: "",
        analyze: "",
        score: "",
      },
      rules: {
        title: [{ required: true, message: "请输入题干", trigger: "blur" }],
        analyze: [{ required: true, message: "请输入解析", trigger: "blur" }],
        score: [{ required: true, message: "请输入分数", trigger: "blur" }],
        answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
      },
      questionVisible: false,
    };
  },
  created() {
    let myRow = this.$route.params.question;
    console.log(myRow);
    if (myRow != null) {
      this.isEdit = true;
      let myItems = myRow.items;
      let singleItem = myItems.split("<sep1>");

      this.question.items = [];
      this.question.id = myRow.qid;
      for (var i = 0; i < singleItem.length; i++) {
        let item = singleItem[i].split("<sep2>");
        let obj = { prefix: item[0], content: item[1] };
        this.question.items.push(obj);
      }

      this.question.title = myRow.title;
      this.question.answer = myRow.answer;
      this.question.analyze = myRow.analysis;
      this.question.score = myRow.score;
      this.question.difficult = myRow.difficult;
      this.question.questionType = myRow.qtype;
    }
  },
  methods: {
    questionItemRemove(idx) {
      this.question.items.splice(idx, 1);
    },
    questionItemAdd() {
      let items = this.question.items;
      let newLastPrefix = null;
      if (items.length > 0) {
        let last = items[items.length - 1];
        newLastPrefix = String.fromCharCode(last.prefix.charCodeAt() + 1);
      } else {
        newLastPrefix = "A";
      }
      items.push({ prefix: newLastPrefix, content: "" });
    },
    updateContent({ id, content }) {
      if (id === -1) {
        this.question.title = content;
      } else if (id === -2) {
        this.question.analyze = content;
      } else if (id >= 0) {
        this.question.items[id].content = content;
      }
    },
    submitQuestion() {
      if (!this.isEdit) {
        this.$refs.question.validate((valid) => {
          if (valid) {
            var items = "";
            for (let i = 0; i < this.question.items.length; i++) {
              items += this.question.items[i].prefix;
              items += "<sep2>";
              items += this.question.items[i].content;
              if (i != this.question.items.length - 1) {
                items += "<sep1>";
              }
            }

            this.apis.question
              .submitQuestion(
                sessionStorage.getItem("teacherUsername"),
                sessionStorage.getItem("teacherName"),
                this.question.title,
                this.question.answer,
                this.question.analyze,
                items,
                this.question.score,
                this.question.difficult,
                1
              )
              .then((res) => {
                if (res.data.status === 200) {
                  this.$notify({
                    title: "成功",
                    message: "题目上传成功！",
                    type: "success",
                  });
                  this.$router.push({ name: "questionList" });
                }
              });
          } else {
            return false;
          }
        });
      } else {
        this.editQuestion();
      }
    },
    editQuestion() {
      this.$refs.question.validate((valid) => {
        if (valid) {
          var items = "";
          for (let i = 0; i < this.question.items.length; i++) {
            items += this.question.items[i].prefix;
            items += "<sep2>";
            items += this.question.items[i].content;
            if (i != this.question.items.length - 1) {
              items += "<sep1>";
            }
          }

          this.apis.question
            .editQuestion(
              this.question.id,
              this.question.title,
              this.question.answer,
              this.question.analyze,
              items,
              this.question.score,
              this.question.difficult,
              1
            )
            .then((res) => {
              if (res.data.status === 200) {
                this.$notify({
                  title: "成功",
                  message: "题目修改成功！",
                  type: "success",
                });
                this.$router.push({ name: "questionList" });
              }
            });
        } else {
          return false;
        }
      });
    },
    resetQuestion() {
      let lastId = this.question.id;
      this.$refs.question.resetFields();
      this.question = {
        id: null,
        questionType: 1,
        difficult: 0,

        title: "",
        items: [
          { prefix: "A", content: "" },
          { prefix: "B", content: "" },
          { prefix: "C", content: "" },
          { prefix: "D", content: "" },
        ],
        answer: "",

        analyze: "",
        score: "",
      };
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
}
</style>