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
            style="float:right;"
            v-if="row.examState === 2"
            type="danger"
             effect="plain"
            >作弊</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="题目正确率" width="100px" />
      <el-table-column prop="cost" label="耗时" width="160px" />
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
      @pagination="search"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: "examCorrect",
  components: { Pagination },
  created() {
    console.log("1");
  },
  data() {
    return {
      queryParam: {
        id: null,
        examTitle: "",
        username: "",
        name: "",
        pageIndex: 1,
        pageSize: 10,
      },

      listLoading: false,
      tableData: [
        {
          id: 1,
          testName: "第一次高数月考",
          name: "langwenchong",
          username: "3019244520",
          score: "2/15",
          rate: "1/6",
          cost: "10秒",
          time: "2020-2-22 19:09:32",
          examState: 0,
        },
        {
          id: 132,
          testName: "操作系统期末考试",
          name: "langwenchong",
          username: "3019244520",
          score: "88/100",
          rate: "26/30",
          cost: "1小时20分10秒",
          time: "2020-2-23 19:23:32",
          examState: 2,
        },
        {
          id: 2,
          testName: "第二次高数月考",
          name: "langwenchong",
          username: "3019244520",
          score: "15/15",
          rate: "6/6",
          cost: "20分10秒",
          time: "2020-3-12 19:09:32",
          examState: 2,
        },
        {
          id: 3,
          testName: "第三次高数月考",
          name: "langwenchong",
          username: "3019244520",
          score: "12/15",
          rate: "5/6",
          cost: "10分10秒",
          time: "2020-3-22 19:09:32",
          examState: 2,
        },
        {
          id: 32,
          testName: "第一次高数月考",
          name: "Guotao",
          username: "3019244999",
          score: "0/15",
          rate: "0/6",
          cost: "1秒",
          time: "2020-2-22 19:09:32",
          examState: 2,
        },
      ],

      total: 10,
    };
  },
  methods: {
    screenShot(row) {
      this.$router.push({ name: "screenShot" });
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
