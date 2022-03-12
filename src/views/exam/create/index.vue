<template>
  <div id="create">
    <el-form :model="exam" :rules="rules" ref="exam" label-width="auto">
      <el-form-item label="考试学科：" prop="subject" required>
        <el-input placeholder="请输入考试学科" v-model="exam.subject" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="试卷名称：" prop="title" required>
        <el-input placeholder="请输入试卷名称" v-model="exam.title" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="注意事项：" prop="tip">
        <el-input
          type="textarea"
          placeholder="请输入考试注意事项"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="exam.tip"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="考试班级：" prop="examClass" required>
        <el-checkbox-group v-model="exam.examClass">
          <el-checkbox v-for="item in myClass" :label="item.id" :key="item.id">
            {{ item.className }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="考试时间：" prop="dateMap" required>
        <el-date-picker
          v-model="exam.dateMap"
          type="datetimerange"
          value-format="yyyy-MM-dd hh:mm:ss"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="考试时长：" prop="duration" required="">
        <el-input-number
          v-model="exam.duration"
          :min="1"
          :max="1000"
        ></el-input-number
        ><span>&nbsp;分钟</span>
      </el-form-item>
      <el-form-item
        :key="idx"
        :label="`模块${idx + 1}`"
        required
        v-for="(mod, idx) in exam.modules"
      >
        <el-input v-model="mod.title" placeholder="请输入模块名称"> </el-input>
        <el-button
          type="warning"
          class="link-left"
          icon="el-icon-circle-plus-outline"
          size="small"
          style="margin-top: 10px"
          @click="addQuestion(idx)"
          >添加题目</el-button
        >
        <el-button
          type="danger"
          class="link-left"
          icon="el-icon-delete"
          size="medium"
          style="margin-top: 10px"
          @click="deleteModule(idx)"
          >删除模块</el-button
        >
        <el-card v-if="mod.questionList.length > 0" style="margin-top: 20px">
          <el-form-item
            :key="questionIdx"
            style="margin-bottom: 15px"
            :label="`${questionIdx + 1}、`"
            v-for="(select, questionIdx) in mod.questionList"
          >
            <el-row>
              <el-col :span="20">
                <QuestionShow
                  :question="handleSelection(select)"
                ></QuestionShow>
              </el-col>
              <el-col :span="4">
                <el-button
                  style="margin-left: 40px"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteQuestion(idx, questionIdx)"
                ></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button>重置</el-button>
        <el-button type="success" @click="addModule">添加模块</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="questionPage.questionVisible"
      style="width: 100%; height: 100%"
    >
      <QuestionShow :question="question" />
    </el-dialog>
    <el-dialog :visible.sync="questionPage.showQuestionList" width="75%">
      <el-form :model="questionPage.queryParam" ref="queryForm" :inline="true">
        <el-form-item label="题型：">
          <el-select v-model="questionPage.queryParam.type" clearable>
            <el-option
              v-for="item in questionTypeEnum"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度：">
          <el-input
            v-model="questionPage.queryParam.difficult"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="分数：">
          <el-input
            v-model="questionPage.queryParam.score"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="上传教师：">
          <el-input
            v-model="questionPage.queryParam.teacherUsername"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="questionPage.listLoading"
        ref="questionList"
        :data="sliceQuestionData"
        @selection-change="handleSelectionChange"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column
          prop="qid"
          :formatter="idFormatter"
          label="ID"
          width="60px"
        ></el-table-column>
        <el-table-column
          prop="type"
          lebel="题型"
          width="70px"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="分数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="difficult" label="难度"></el-table-column>
        <el-table-column prop="name" label="教师账号"></el-table-column>
        <el-table-column prop="name" label="教师昵称"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button size="mini" @click="previewQuestion(row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        style="margin-top: 20px"
        v-show="total > 0"
        :total="total"
        :page.sync="questionPage.queryParam.pageIndex"
        :limit.sync="questionPage.queryParam.pageSize"
        @pagination="change"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="questionPage.showQuestionList = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmQuestionSelect"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>


<script>
import Pagination from "@/components/Pagination";
import QuestionShow from "@/components/QuestionShow/index.vue";
export default {
  name: "create",
  components: {
    Pagination,
    QuestionShow,
  },
  created() {
    var eid = this.$route.params.eid;
    if (eid != null) {
      this.eid = eid;
      this.isEdit = true;
      this.initData();
    }
    // 获取全部班级
    this.apis.Class.getClassList(
      sessionStorage.getItem("teacherUsername")
    ).then((res) => {
      let res_data = res.data.result;
      for (let i = 0; i < res_data.length; i++) {
        var pushList = new Object();
        pushList.id = res_data[i].cid;
        pushList.className = res_data[i].cname;
        pushList.password = res_data[i].command;
        pushList.num = res_data[i].studentNumber;
        this.myClass.push(pushList);
      }
    });

    // 获取题目
    this.apis.question.getList().then((res) => {
      let res_data = res.data.result;

      for (let i = 0; i < res_data.length; i++) {
        var pushList = new Object();
        pushList.qid = res_data[i].qid;
        if (res_data[i].qtype == 1) {
          pushList.type = "单选题";
        } else if (res_data[i].qtype == 2) {
          pushList.type = "多选题";
        } else if (res_data[i].qtype == 3) {
          pushList.type = "判断题";
        } else if (res_data[i].qtype == 4) {
          pushList.type = "简答题";
        } else if (res_data[i].qtype == 5) {
          pushList.type = "排序题";
        }
        pushList.score = res_data[i].score;
        pushList.difficult = res_data[i].difficulty;
        pushList.teacherUsername = res_data[i].teacherUsername;
        pushList.name = res_data[i].teacherName;
        pushList.items = res_data[i].items;
        pushList.analysis = res_data[i].analysis;
        pushList.answer = res_data[i].answer;
        pushList.count = res_data[i].count;
        pushList.rightCnt = res_data[i].rightCnt;
        pushList.title = res_data[i].title;
        this.questionPage.questionList.push(pushList);
      }
    });
  },
  data() {
    return {
      isEdit: false,
      eid: "",
      totalScore: 0,
      questionCnt: 0,
      question: {},
      modIdx: undefined,
      questionPage: {
        questionVisible: false,
        listLoading: false,
        showQuestionList: false,
        multipleSlection: [],
        questionList: [],
        queryParam: {
          type: "",
          score: "",
          difficult: "",
          teacherUsername: "",
          pageIndex: 1,
          pageSize: 5,
        },
      },
      questionTypeEnum: ["单选题", "多选题", "判断题", "简答题", "排序题"],
      exam: {
        title: "",
        tip: "",
        examClass: [],
        dateMap: [],
        duration: undefined,
        modules: [],
        subject: "",
      },
      myClass: [],
      rules: {
        title: [{ required: true, message: "请输入试卷名称", trigger: "blur" }],
        subject: [
          { required: true, message: "请输入考试科目", trigger: "blur" },
        ],
        examClass: [
          { required: true, message: "请选择考试班级", trigger: "blur" },
        ],
        dateMap: [
          { required: true, message: "请选择考试时间范围", trigger: "blur" },
        ],
        duration: [
          {
            required: true,
            message: "请输入考试时长",
            trigger: "blur",
          },
        ],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    initData() {
      // 获取考试信息
      this.apis.exam.getInfo(this.eid).then((res) => {
        console.log(res);
        if (res.status === 200) {
          var data = res.data.result;
          this.exam.title = data.exam.title;
          this.exam.subject = data.exam.course;
          this.exam.tip = data.exam.tips;
          this.exam.dateMap = [data.exam.startTime, data.exam.endTime];
          this.exam.duration = data.exam.duration;
          this.exam.examClass = data.class;
        }
      });
      //获取考试题目
      this.apis.exam.getQuestionList(this.eid).then((res) => {
        console.log(res);
        if (res.status === 200) {
          var result = res.data.result;
          this.exam.modules = result;
        }
      });
    },
    change({ page, limit }) {
      this.questionPage.queryParam.pageIndex = page;
      this.questionPage.queryParam.pageSize = limit;
    },
    idFormatter(row) {
      return row.qid.substring(1, 8);
    },
    handleSelection(question) {
      if (question.type === "单选题" && typeof question.items == "string") {
        // console.log(question);
        question.questionType = 1;
        var items = [];
        for (let i = 0; i < question.items.split("<sep1>").length; i++) {
          let item = question.items.split("<sep1>")[i].split("<sep2>");
          let obj = { prefix: item[0], content: item[1] };
          items.push(obj);
        }
        question.items = items;
      } else if (
        question.type === "多选题" &&
        typeof question.items == "string"
      ) {
        question.questionType = 2;
        var items = [];
        for (let i = 0; i < question.items.split("<sep1>").length; i++) {
          let item = question.items.split("<sep1>")[i].split("<sep2>");
          let obj = { prefix: item[0], content: item[1] };
          items.push(obj);
        }
        question.items = items;
      } else if (
        question.type === "判断题" &&
        typeof question.items == "string"
      ) {
        question.questionType = 3;
        var items = [];
        for (let i = 0; i < question.items.split("<sep1>").length; i++) {
          let item = question.items.split("<sep1>")[i].split("<sep2>");
          let obj = { prefix: item[0], content: item[1] };
          items.push(obj);
        }
        question.items = items;
      } else if (question.type === "简答题") {
        question.questionType = 4;
      } else if (
        question.type === "排序题" &&
        typeof question.items == "string"
      ) {
        question.questionType = 5;
        var items = [];
        for (let i = 0; i < question.items.split("<sep1>").length; i++) {
          let item = question.items.split("<sep1>")[i].split("<sep2>");
          let obj = { prefix: item[0], content: item[1] };
          items.push(obj);
        }
        question.items = items;
      }
      return question;
    },
    submitForm() {
      this.$refs.exam.validate((valid) => {
        if (valid) {
          if (this.exam.modules.length === 0) {
            this.$notify.error({
              title: "错误",
              message: "试卷至少需要由一个模块组成！",
            });
          }
          var v = this.checkModules();
          if (!v) {
            this.$notify.error({
              title: "错误",
              message: "请检查是否存在空模块或者未命名模块！",
            });
          }
          var modules = [];
          for (let i = 0; i < this.exam.modules.length; i++) {
            var myModule = this.createModule(this.exam.modules[i], i);
            modules.push(myModule);
          }
          var myClass = "";
          for (let i = 0; i < this.exam.examClass.length; i++) {
            myClass += this.exam.examClass[i];
            if (i != this.exam.examClass.length - 1) {
              myClass += "-";
            }
          }
          if (!this.isEdit) {
            // 试卷上传
            this.apis.exam
              .createExam(
                sessionStorage.getItem("teacherUsername"),
                this.exam.title,
                this.exam.tip,
                this.exam.dateMap[0],
                this.exam.dateMap[1],
                myClass,
                this.exam.subject,
                this.exam.duration,
                this.totalScore,
                this.questionCnt,
                modules
              )
              .then((res) => {
                // console.log(res);
                if (res.status === 200) {
                  this.$notify({
                    title: "成功",
                    message: "试卷创建成功！",
                    type: "success",
                  });
                  this.$router.push({ name: "examList" });
                }
              });
          } else {
            this.apis.exam
              .editExam(
                this.eid,
                sessionStorage.getItem("teacherUsername"),
                this.exam.title,
                this.exam.tip,
                this.exam.dateMap[0],
                this.exam.dateMap[1],
                myClass,
                this.exam.subject,
                this.exam.duration,
                this.totalScore,
                this.questionCnt,
                modules
              )
              .then((res) => {
                // console.log(res);
                if (res.status === 200) {
                  this.$notify({
                    title: "成功",
                    message: "试卷修改成功！",
                    type: "success",
                  });
                  this.$router.push({ name: "examList" });
                }
              });
          }
        }
      });
    },
    createModule(myModule, id) {
      // console.log(myModule);
      var ans = {};
      ans.mid = "" + id;
      ans.title = myModule.title;
      var questionsId = "";
      for (let i = 0; i < myModule.questionList.length; i++) {
        var question = myModule.questionList[i];
        this.totalScore += question.score;
        this.questionCnt += 1;
        questionsId += question.qid;
        if (i != myModule.questionList.length - 1) {
          questionsId += "-";
        }
      }
      ans.questionsId = questionsId;
      return ans;
    },
    checkModules() {
      var modules = this.exam.modules;
      for (let i = 0; i < modules.length; i++) {
        if (
          modules[i].title.trim() === `` ||
          modules[i].questionList.length == 0
        ) {
          return false;
        }
      }
      return true;
    },
    previewQuestion(row) {
      this.questionVisible = true;
      this.question = row;
      if (this.question.type === "单选题") {
        this.question.questionType = 1;
        var items = [];
        for (let i = 0; i < this.question.items.split("<sep1>").length; i++) {
          let item = this.question.items.split("<sep1>")[i].split("<sep2>");
          let obj = { prefix: item[0], content: item[1] };
          items.push(obj);
        }
        this.question.items = items;
      } else if (this.question.type === "多选题") {
        this.question.questionType = 2;
        var items = [];
        for (let i = 0; i < this.question.items.split("<sep1>").length; i++) {
          let item = this.question.items.split("<sep1>")[i].split("<sep2>");
          let obj = { prefix: item[0], content: item[1] };
          items.push(obj);
        }
        this.question.items = items;
      } else if (this.question.type === "判断题") {
        this.question.questionType = 3;
        var items = [];
        for (let i = 0; i < this.question.items.split("<sep1>").length; i++) {
          let item = this.question.items.split("<sep1>")[i].split("<sep2>");
          let obj = { prefix: item[0], content: item[1] };
          items.push(obj);
        }
        this.question.items = items;
      } else if (this.question.type === "简答题") {
        this.question.questionType = 4;
      } else {
        this.question.questionType = 5;
        var items = [];
        for (let i = 0; i < this.question.items.split("<sep1>").length; i++) {
          let item = this.question.items.split("<sep1>")[i].split("<sep2>");
          let obj = { prefix: item[0], content: item[1] };
          items.push(obj);
        }
        this.question.items = items;
      }
      this.questionPage.questionVisible = true;
    },
    handleSelectionChange(val) {
      this.questionPage.multipleSlection = val;
      // console.log(this.questionPage.multipleSlection);
    },
    questionTypeFormatter(row, column) {
      if (row.questionType === 1) {
        return `单选题`;
      } else if (row.questionType === 2) {
        return `多选题`;
      } else if (row.questionType === 3) {
        return `判断题`;
      } else if (row.questionType === 4) {
        return `简答题`;
      } else if (row.questionType === 5) {
        return `排序题`;
      }
    },
    addModule() {
      this.exam.modules.push({
        title: "",
        questionList: [],
      });
    },
    addQuestion(idx) {
      this.modIdx = idx;
      this.questionPage.showQuestionList = true;
    },
    confirmQuestionSelect() {
      var that = this;
      this.questionPage.multipleSlection.forEach((q) => {
        that.exam.modules[that.modIdx].questionList.push(q);
      });
      this.$refs.questionList.clearSelection();
      this.questionPage.showQuestionList = false;
    },
    deleteModule(idx) {
      this.exam.modules.splice(idx, 1);
    },
    deleteQuestion(idx, questionIdx) {
      this.exam.modules[idx].questionList.splice(questionIdx, 1);
    },
  },
  computed: {
    questionData() {
      var ans = [];
      var arr = this.questionPage.questionList;
      for (let i = 0; i < arr.length; i++) {
        var question = arr[i];
        var v = true;
        if (
          this.questionPage.queryParam.teacherUsername !== `` &&
          question.teacherUsername.search(
            this.questionPage.queryParam.teacherUsername
          ) === -1
        ) {
          v = false;
        }
        if (
          this.questionPage.queryParam.difficult != "" &&
          question.difficult != this.questionPage.queryParam.difficult
        ) {
          v = false;
        }
        if (
          this.questionPage.queryParam.score != "" &&
          question.score != this.questionPage.queryParam.score
        ) {
          v = false;
        }
        if (
          this.questionPage.queryParam.type !== `` &&
          question.type !== this.questionPage.queryParam.type
        ) {
          v = false;
        }
        if (v) {
          ans.push(question);
        }
      }
      return ans;
    },
    sliceQuestionData() {
      var re = [];
      var arr = this.questionData;
      var start =
        (this.questionPage.queryParam.pageIndex - 1) *
        this.questionPage.queryParam.pageSize;
      var end =
        (this.questionPage.queryParam.pageIndex - 1) *
          this.questionPage.queryParam.pageSize +
        this.questionPage.queryParam.pageSize;
      var re = arr.slice(start, end);
      return re;
    },
    total() {
      return this.questionData.length;
    },
  },
};
</script>

<style scoped>
#create {
  width: 100%;
  min-height: 50vh;
  box-sizing: border-box;
  padding: 20px;
}
</style>
