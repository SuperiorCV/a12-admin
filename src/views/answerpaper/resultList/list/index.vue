<template>
  <div id="list">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="试卷名称：">
        <el-input v-model="queryParam.examTitle" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户名称：">
        <el-input v-model="queryParam.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户账号：">
        <el-input v-model="queryParam.username" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="testName" label="试卷名称" show-overflow-tooltip />
      <el-table-column prop="name" label="用户名称" />
      <el-table-column prop="username" label="用户账号" />
      <el-table-column width="120px" label="得分">
        <template slot-scope="{ row }">
          {{ row.score
          }}<el-tag
            style="float: right"
            v-if="row.examState === 2"
            type="danger"
            effect="plain"
            >作弊</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="题目正确率" width="100px" />
      <el-table-column prop="cost" label="耗时(min)" width="160px" />
      <el-table-column prop="time" label="提交时间" width="160px" />
      <el-table-column label="操作" align="center" width="160px">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="screenShot(row)">监控</el-button>
          <el-button size="mini" @click="showQuestion(row)">查看</el-button>
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
  name: "examCorrect",
  components: { Pagination },
  created() {
    this.listLoading = true;
    this.apis.answerpaper
      .search(sessionStorage.getItem("teacherUsername"), 1)
      .then((res) => {
        if (res.data.status === 200) {
          // console.log(res);
          let data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            var pushList = new Object();
            pushList.eid = data[i].eid;
            pushList.testName = data[i].title;
            pushList.name = data[i].studentName;
            pushList.username = data[i].studentUsername;
            pushList.score = data[i].score;
            pushList.rate = data[i].accuracy+"%";
            pushList.time = data[i].submitTime;
            pushList.cost = data[i].duration;
            pushList.examState = data[i].examState;
            this.arr.push(pushList);
          }
          this.listLoading = false;
        }
      });
  },
  data() {
    return {
      arr: [],
      queryParam: {
        id: null,
        examTitle: "",
        username: "",
        name: "",
        pageIndex: 1,
        pageSize: 10,
      },

      listLoading: false,
    };
  },
  computed: {
    tableData() {
      var ans = [];
      var arr = this.arr;
      for (let i = 0; i < arr.length; i++) {
        var singleTable = arr[i];
        var v = true;
        if (
          this.queryParam.examTitle !== "" &&
          singleTable.testName.search(this.queryParam.examTitle) === -1
        ) {
          v = false;
        } else if (
          this.queryParam.name !== "" &&
          singleTable.name.search(this.queryParam.name) === -1
        ) {
          v = false;
        } else if (
          this.queryParam.username !== "" &&
          singleTable.username.search(this.queryParam.username) === -1
        ) {
          v = false;
        }
        if (v) {
          ans.push(singleTable);
        }
      }
      return ans;
    },
    sliceTableData() {
      var re = [];
      var arr = this.tableData;
      var start = (this.queryParam.pageIndex - 1) * this.queryParam.pageSize;
      var end =
        (this.queryParam.pageIndex - 1) * this.queryParam.pageSize +
        this.queryParam.pageSize;
      var re = arr.slice(start, end);
      return re;
    },
    total() {
      return this.tableData.length;
    },
  },
  methods: {
    screenShot(row) {
      this.$router.push({ name: "screenShot", params: { exam: row } });
    },
    change({ page, limit }) {
      this.queryParam.pageIndex = page;
      this.queryParam.pageSize = limit;
    },
    showQuestion(row) {
      this.$router.push({ name: "check", params: { exam: row, edit: false } });
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
