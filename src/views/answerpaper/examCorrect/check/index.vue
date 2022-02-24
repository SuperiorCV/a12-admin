<template>
  <div id="check">
    <div id="l-side">
      <h3>{{ exam.title }}</h3>
      <div class="info">
        <p>提交人：{{ exam.student }}</p>
        <p>提交时间：{{ exam.submitTime }}</p>
        <p>已判题数：6 / {{ exam.total }}题</p>
        <p>试卷分数：{{ exam.currentScore }} / {{ exam.fullScore }}分</p>
      </div>
      <div class="menu">
        <el-tag
          class="tag"
          :type="questionStatus(item.status)"
          v-for="(item, j) in tags"
          :key="j"
          @click="goAnchor(`#question-${item.id}`)"
          >{{ j + 1 }}</el-tag
        >
      </div>
      <div class="tool">
        <el-button type="primary" plain>提交批改</el-button>
        <el-button plain>返回列表</el-button>
      </div>
    </div>
    <div id="r-main">
      <div class="module" v-for="(mod, idx) in exam.modules" :key="idx">
        <div class="header">
          <h3>模块{{ idx + 1 }}：{{ mod.title }}</h3>
        </div>
        <div
          :id="`question-${question.id}`"
          class="card"
          v-for="(question, j) in mod.questionList"
          :key="j"
        >
          <singleChoice
            v-if="idx == 0"
            :question="question"
            :idx="j + 1"
          ></singleChoice>
          <multipleChoice
            v-else-if="idx == 1"
            :question="question"
            :idx="j + 1"
          ></multipleChoice>
          <trueFalse
            v-else-if="idx == 2"
            :question="question"
            :idx="j + 1"
          ></trueFalse>
          <shortAnswer
            v-else-if="idx == 3"
            :question="question"
            :idx="j+1"
          ></shortAnswer>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import singleChoice from "../../comp/singleChoice";
import multipleChoice from "../../comp/multipleChoice";
import trueFalse from "../../comp/trueFalse";
import shortAnswer from "../../comp/shortAnswer";
export default {
  name: "check",
  components: {
    singleChoice,
    multipleChoice,
    trueFalse,
    shortAnswer,
  },
  data() {
    return {
      exam: {
        currentScore: 80,
        fullScore: 150,
        total: 30,
        submitTime: "2022-02-09 22:40",
        student: "langwenchong",
        title: "第一次试验检测",
        tip: "",
        examClass: [],
        dateMap: [],
        duration: 1,
        modules: [
          // 单选题模块
          {
            title: "选择题",
            questionList: [
              {
                id: 1,
                questionType: 1,
                difficult: 3,
                // -1表示标题
                title: "fsfsafsafsfsa",
                items: [
                  { prefix: "A", content: "ggg" },
                  { prefix: "B", content: "gggggg" },
                  { prefix: "C", content: "aaa" },
                  { prefix: "D", content: "cccc" },
                ],
                status: 1, //-1表示错误，0表示待批改，1表示正确
                answer: "A",
                studentAnswer: "C",
                // -2表示解析
                analyze: "fsagsagsagsag",
                score: 1,
                studentScore: 1,
              },
              {
                id: 2,
                questionType: 1,
                difficult: 2,
                // -1表示标题
                title: "fsfsfssd",
                items: [
                  { prefix: "A", content: "fafsa" },
                  { prefix: "B", content: "gsagsgs" },
                  { prefix: "C", content: "faf" },
                  { prefix: "D", content: "fasfs" },
                ],
                status: -1, //-1表示错误，0表示待批改，1表示正确
                answer: "A",
                // -2表示解析
                analyze: "fafsfs",
                studentAnswer: "C",
                score: 2,
                studentScore: 0,
              },
              {
                id: 3,
                questionType: 1,
                difficult: 3,
                // -1表示标题
                title: "fsfsfss",
                items: [
                  { prefix: "A", content: "fsafs" },
                  { prefix: "B", content: "fsaf" },
                  { prefix: "C", content: "fsafs" },
                  { prefix: "D", content: "fsaf" },
                ],
                status: 1, //-1表示错误，0表示待批改，1表示正确
                answer: "D",
                studentAnswer: "C",
                // -2表示解析
                analyze: "",
                score: 2,
                studentScore: 2,
              },
            ],
          },
          {
            title: "多选题",
            questionList: [
              {
                id: 4,
                questionType: 1,
                difficult: 3,
                // -1表示标题
                title: "fsfsafsafsfsa",
                items: [
                  { prefix: "A", content: "ggg" },
                  { prefix: "B", content: "gggggg" },
                  { prefix: "C", content: "aaa" },
                  { prefix: "D", content: "cccc" },
                ],
                status: 1, //-1表示错误，0表示待批改，1表示正确
                answer: ["A", "C", "D"],
                studentAnswer: ["A", "C", "D"],
                // -2表示解析
                analyze: "fsagsagsagsag",
                score: 1,
                studentScore: 1,
              },
              {
                id: 5,
                questionType: 1,
                difficult: 2,
                // -1表示标题
                title: "fsfsfssd",
                items: [
                  { prefix: "A", content: "fafsa" },
                  { prefix: "B", content: "gsagsgs" },
                  { prefix: "C", content: "faf" },
                  { prefix: "D", content: "fasfs" },
                ],
                status: -1, //-1表示错误，0表示待批改，1表示正确
                answer: "A",
                // -2表示解析
                answer: ["A", "C", "B"],
                studentAnswer: ["A", "C"],
                score: 2,
                studentScore: 0,
              },
              {
                id: 6,
                questionType: 1,
                difficult: 3,
                // -1表示标题
                title: "fsfsfss",
                items: [
                  { prefix: "A", content: "fsafs" },
                  { prefix: "B", content: "fsaf" },
                  { prefix: "C", content: "fsafs" },
                  { prefix: "D", content: "fsaf" },
                ],
                status: 1, //-1表示错误，0表示待批改，1表示正确
                answer: ["A", "C"],
                studentAnswer: ["A", "C"],
                // -2表示解析
                analyze: "SASASASA",
                score: 2,
                studentScore: 2,
              },
            ],
          },
          {
            title: "判断题",
            questionList: [
              {
                id: 7,
                questionType: 1,
                difficult: 3,
                // -1表示标题
                title: "fsfsafsafsfsa",
                items: [
                  { prefix: "A", content: "正确" },
                  { prefix: "B", content: "错误" },
                ],
                status: 1, //-1表示错误，0表示待批改，1表示正确
                answer: "A",
                studentAnswer: "A",
                // -2表示解析
                analyze: "fsagsagsagsag",
                score: 1,
                studentScore: 1,
              },
              {
                id: 8,
                questionType: 1,
                difficult: 2,
                // -1表示标题
                title: "fsfsfssd",
                items: [
                  { prefix: "A", content: "正确" },
                  { prefix: "B", content: "错误" },
                ],
                status: -1, //-1表示错误，0表示待批改，1表示正确
                answer: "A",
                // -2表示解析
                analyze: "fafsfs",
                studentAnswer: "B",
                score: 2,
                studentScore: 0,
              },
              {
                id: 9,
                questionType: 1,
                difficult: 3,
                // -1表示标题
                title: "fsfsfss",
                items: [
                  { prefix: "A", content: "正确" },
                  { prefix: "B", content: "错误" },
                ],
                status: -1, //-1表示错误，0表示待批改，1表示正确
                answer: "A",
                studentAnswer: "B",
                // -2表示解析
                analyze: "",
                score: 2,
                studentScore: 0,
              },
            ],
          },
          {
            title: "简答题",
            questionList: [
              {
                id: 10,
                questionType: 4,
                difficult: 3,
                title: "fsfsfss",
                status: 0, //-1表示错误，0表示待批改，1表示正确
                answer: "答案1",
                studentAnswer: "sddfsssssssssssssssssss",
                // -2表示解析
                analyze: "SASASASA",
                score: 2,
                studentScore: 2,
              },
              {
                id: 11,
                questionType: 4,
                difficult: 3,
                // -1表示标题
                title: "fsfsfss",
                status: 0, //-1表示错误，0表示待批改，1表示正确
                answer: "123123",
                studentAnswer: "rtyui",
                // -2表示解析
                analyze: "SASASASA",
                score: 2,
                studentScore: 2,
              },
              {
                id: 12,
                questionType: 4,
                difficult: 3,
                // -1表示标题
                title: "fsfsfss",
                status: 0, //-1表示错误，0表示待批改，1表示正确
                answer: "456",
                studentAnswer: "oiuttd",
                // -2表示解析
                analyze: "SASASASA",
                score: 2,
                studentScore: 2,
              },
            ],
          },
          {
            title: "排序题",
            questionList: [
              {
                id: 13,
                questionType: 5,
                difficult: 3,
                // -1表示标题
                title: "fsfsfss",
                items: [
                  { prefix: "A", content: "<pre>A</pre>" },
                  { prefix: "B", content: "<p>B</p>" },
                  { prefix: "C", content: "<pre>C</pre>" },
                  { prefix: "D", content: "<p>D</p>" },
                ],
                status: 1, //-1表示错误，0表示待批改，1表示正确
                answer: [
                  { prefix: "A", content: "<pre>A</pre>" },
                  { prefix: "B", content: "<p>B</p>" },
                  { prefix: "D", content: "<p>D</p>" },
                  { prefix: "C", content: "<pre>C</pre>" },
                ],
                studentAnswer: [
                  { prefix: "A", content: "<pre>A</pre>" },
                  { prefix: "B", content: "<p>B</p>" },
                  { prefix: "C", content: "<pre>C</pre>" },
                  { prefix: "D", content: "<p>D</p>" },
                ],
                // -2表示解析
                analyze: "SASASASA",
                score: 2,
                studentScore: 2,
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    tags() {
      var tags = [];
      var modules = this.exam.modules;
      for (let i = 0; i < modules.length; i++) {
        var questionList = modules[i].questionList;
        for (let j = 0; j < questionList.length; j++) {
          tags.push(questionList[j]);
        }
      }
      return tags;
    },
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
    goAnchor(id) {
      this.$el.querySelector(id).scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "nearest",
      });
    },
  },
};
</script>

<style scoped>
#check {
  width: 100%;
  /* min-height: 90vh; */
  background: #eff3f7;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
#l-side {
  position: fixed;
  top: 105px;
  background: #fff;
  /* min-height: 200px; */
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
}
.info {
  border-bottom: 1px solid #e6e6e6;
}
.menu {
  box-sizing: border-box;
  padding: 10px 0px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  width: 100%;
}
.tag {
  margin-left: 5px;
  cursor: pointer;
}
.tool {
  display: flex;
  padding-top: 8px;
  border-top: 1px solid #e6e6e6;
}
.header {
  height: 64px;
  box-sizing: border-box;
  padding: 10px;
  background: #fafafa;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}
.card {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}
#r-main {
  width: calc(100% - 320px);
  /* min-height: 200px; */
  margin-left: 320px;
  background: #fff;
}
</style>