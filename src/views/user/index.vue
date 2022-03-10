<template>
  <div id="user">
    <!-- 查询框 -->
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="账号：">
        <el-input v-model="queryParam.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称：">
        <el-input v-model="queryParam.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="queryParam.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table
      :data="sliceUserData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-button size="mini" type="success">邀请加入班级</el-button>
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
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  name: "user",
  data() {
    return {
      arr: [],
      queryParam: {
        username: "",
        name: "",
        email: "",
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
    };
  },
  created() {
    this.listLoading = true;
    this.apis.student.getStudentList().then((res) => {
      let res_data = res.data.result;
      console.log(res_data);

      for (let i = 0; i < res_data.length; i++) {
        var pushList = new Object();
        // pushList.id = res_data[i].cid;
        pushList.username = res_data[i].username;
        pushList.name = res_data[i].name;
        pushList.sex = res_data[i].sex;
        pushList.email = res_data[i].email;

        this.arr.push(pushList);
      }
    });
    this.queryParam.pageIndex = 1;
    this.listLoading = false;
  },
  computed: {
    userData() {
      var ans = [];
      var arr = this.arr;
      for (let i = 0; i < this.arr.length; i++) {
        var singleUser = arr[i];
        var v = true;
        if (
          this.queryParam.username !== "" &&
          singleUser.username.search(this.queryParam.username) === -1
        ) {
          v = false;
        } else if (
          this.queryParam.name !== "" &&
          singleUser.name.search(this.queryParam.name) === -1
        ) {
          v = false;
        } else if (
          this.queryParam.email !== "" &&
          singleUser.email.search(this.queryParam.email) === -1
        ) {
          v = false;
        }
        if (v) {
          ans.push(singleUser);
        }
      }
      return ans;
    },
    sliceUserData() {
      var re = [];
      var arr = this.userData;
      var start = (this.queryParam.pageIndex - 1) * this.queryParam.pageSize;
      var end =
        (this.queryParam.pageIndex - 1) * this.queryParam.pageSize +
        this.queryParam.pageSize;
      var re = arr.slice(start, end);
      return re;
    },
    total() {
      return this.userData.length;
    },
  },
  methods: {
    change({ page, limit }) {
      this.queryParam.pageIndex = page;
      this.queryParam.pageSize = limit;
    },
    search() {},
  },
};
</script>

<style scoped>
#user {
  width: 100%;
  min-height: 50vh;
  box-sizing: border-box;
  padding: 20px;
}
</style>