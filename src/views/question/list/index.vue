<template>
  <div id="list">
    <!-- 查询框 -->
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="上传教师：">
        <el-input v-model="queryParam.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="难度：">
        <el-input v-model="queryParam.difficult"></el-input>
      </el-form-item>
      <el-form-item label="分数：">
        <el-input v-model="queryParam.score"></el-input>
      </el-form-item>
      <el-form-item label="题型：">
        <el-select
          v-model="queryParam.type"
          placeholder="请选择"
          clearable
          style="width: 90px"
          class="filter-item"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表单 -->
    <el-table
      :data="sliceQuestionData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="qid" label="ID"></el-table-column>
      <el-table-column prop="type" label="题型"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
      <el-table-column prop="difficult" label="难度" width="250px">
        <template slot-scope="{ row }">
          <div class="rate-wrapper">
            <el-rate v-model="row.difficult" disabled> </el-rate
            ><span style="color: #ff9900">{{ row.difficult }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="teacherUsername" label="教师"></el-table-column>
      <el-table-column prop="name" label="教师昵称"></el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="previewQuestion(row)">预览</el-button>
          <el-button size="mini" @click="editQuestion(row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" class="link-left"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码下标 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="change"
    />
    <el-dialog
      :visible.sync="questionVisible"
      style="width: 100%; height: 100%"
    >
      <QuestionShow :question="question" />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import QuestionShow from "@/components/QuestionShow";
export default {
  name: "list",
  components: {
    QuestionShow,
    Pagination,
  },
  data() {
    return {
      questionVisible: false,
      question: {},
      arr: [],
      queryParam: {
        teacherName: "",
        score: "",
        type: "",
        difficult: "",
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
      typeOptions: ["单选题", "多选题", "判断题", "简答题", "排序题"],
    };
  },
  created() {
    this.listLoading = true;
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
        this.arr.push(pushList);
      }
    });
    this.queryParam.pageIndex = 1;
    this.listLoading = false;
  },
  computed: {
    questionData() {
      var ans = [];
      var arr = this.arr;
      for (let i = 0; i < this.arr.length; i++) {
        var question = arr[i];
        var v = true;
        if (
          this.queryParam.teacherUsername !== `` &&
          question.teacherUsername.search(this.queryParam.teacherName) === -1
        ) {
          v = false;
        }
        if (
          this.queryParam.difficult != "" &&
          question.difficult != this.queryParam.difficult
        ) {
          v = false;
        }
        if (
          this.queryParam.score != "" &&
          question.score != this.queryParam.score
        ) {
          v = false;
        }
        if (
          this.queryParam.type !== `` &&
          question.type !== this.queryParam.type
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
      var start = (this.queryParam.pageIndex - 1) * this.queryParam.pageSize;
      var end =
        (this.queryParam.pageIndex - 1) * this.queryParam.pageSize +
        this.queryParam.pageSize;
      var re = arr.slice(start, end);
      return re;
    },
    total() {
      return this.questionData.length;
    },
  },
  methods: {
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
    },
    change({ page, limit }) {
      this.queryParam.pageIndex = page;
      this.queryParam.pageSize = limit;
    },
    editQuestion(row) {
      if (row.type === "单选题") {
        this.$router.push({ name: "singleChoice", params: { question: row } });
      } else if (row.type === "多选题") {
        this.$router.push({ name: "multiChoice", params: { question: row } });
      } else if (row.type === "判断题") {
        this.$router.push({ name: "trueFalse", params: { question: row } });
      } else if (row.type === "简答题") {
        this.$router.push({ name: "shortAnswer", params: { question: row } });
      } else {
        this.$router.push({ name: "sort", params: { question: row } });
      }
    },
  },
};
</script>

<style scoped>
#list {
  width: 100%;
  min-height: 50vh;
  box-sizing: border-box;
  padding: 20px;
  /* background: red; */
}
.rate-wrapper {
  display: flex;
  align-items: center;
  width: 200px;
}
</style>