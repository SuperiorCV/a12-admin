<template>
  <div id="list">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="试卷名称：">
        <el-input v-model="queryParam.examTitle" clearable></el-input>
      </el-form-item>
      <el-form-item label="考题数量：">
        <el-input v-model="queryParam.questionCnt" clearable></el-input>
      </el-form-item>
      <el-form-item label="试卷总分：">
        <el-input v-model="queryParam.totalScore" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="sliceExamData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="Id"
        width="90px"
        :formatter="Formatter"
      />
      <el-table-column prop="title" label="试卷名称"></el-table-column>
      <el-table-column
        prop="totalScore"
        label="试卷总分"
        show-overflow-tooltip
      />
      <el-table-column prop="questionCnt" label="考题数量" />
      <el-table-column label="操作" align="center" width="290px">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="editQuestion(row)">编辑</el-button>
          <el-button size="mini" @click="analyze(row)">分析</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="deleteQuestion(row)"
            class="link-left"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="change"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: "list",
  components: { Pagination },
  created() {
    this.listLoading = true;
    this.apis.exam
      .getExamList(sessionStorage.getItem("teacherUsername"))
      .then((res) => {
        if (res.status === 200) {
          var data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            var obj = {};
            obj.id = data[i].eid;
            obj.title = data[i].title;
            obj.totalScore = data[i].totalScore;
            obj.questionCnt = data[i].questionCnt;
            this.arr.push(obj);
          }
          this.listLoading = false;
        }
      });
  },
  data() {
    return {
      queryParam: {
        examTitle: "",
        pageIndex: 1,
        pageSize: 10,
        questionCnt: "",
        totalScore: "",
      },
      arr: [],
      listLoading: false,
    };
  },
  computed: {
    examData() {
      var ans = [];
      var arr = this.arr;
      for (let i = 0; i < arr.length; i++) {
        var exam = arr[i];
        var v = true;
        if (
          this.queryParam.examTitle !== "" &&
          exam.title.search(this.queryParam.examTitle) === -1
        ) {
          v = false;
        }
        if (
          this.queryParam.totalScore !== "" &&
          exam.totalScore != this.queryParam.totalScore
        ) {
          v = false;
        }
        if (
          this.queryParam.questionCnt !== "" &&
          exam.questionCnt != this.queryParam.questionCnt
        ) {
          v = false;
        }
        if (v) {
          ans.push(exam);
        }
      }
      // console.log(ans);
      return ans;
    },
    total() {
      return this.examData.length;
    },
    sliceExamData() {
      var re = [];
      var arr = this.examData;
      var start = (this.queryParam.pageIndex - 1) * this.queryParam.pageSize;
      var end =
        (this.queryParam.pageIndex - 1) * this.queryParam.pageSize +
        this.queryParam.pageSize;
      var re = arr.slice(start, end);
      return re;
    },
  },
  methods: {
    Formatter(row) {
      return row.id.substring(1, 8);
    },
    change({ page, limit }) {
      this.queryParam.pageIndex = page;
      this.queryParam.pageSize = limit;
    },
    editQuestion(row) {
      this.$router.push({ name: "examCreate", params: { eid: row.id } });
    },
    analyze(row) {
      this.$router.push({ name: "analyze", params: { eid: row.id } });
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
}
</style>
