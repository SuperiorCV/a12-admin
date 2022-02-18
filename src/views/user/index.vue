<template>
    <div id="user">
        <!-- 查询框 -->
        <el-form :model="queryParam" ref="queryForm" :inline="true">
            <el-form-item label="账号：">
                <el-input v-model="queryParam.accountNo"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称：">
                <el-input v-model="queryParam.userName"></el-input>
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
            :data="userData"
            v-loading
            border
            fit
            highlight-current-row
            style="width: 100%"
        >
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="accountNo" label="账号"></el-table-column>
            <el-table-column prop="trueName" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="userName" label="用户昵称"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column label="操作" align="center">
        <template>
          <!-- <router-link
            :to="{ path: '/class/edit', query: { id: row.id } }"
            class="link-left"
          > -->
            <el-button size="mini" type="success">邀请加入班级</el-button>
          <!-- </router-link> -->
          <!-- <el-button size="mini" type="danger" class="link-left"
            >解散</el-button
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
      @pagination="search"
    />
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
    components: {
    Pagination,
  },
    name: 'user',
    data() {
    return {
      queryParam: {
        accountNo: "",
        userName: "",
        email: "",
        role: 1,
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
      userData: [],
      total: 0,
    };
    },
    created() {
        this.listLoading = true;
    this.userData = [
      {
        id: 1,
        accountNo: "301901",
        trueName: "泰达米尔",
        sex: "男",
        userName: "蛮族之王",
        email: "1234@dasd",
      },
      {
        id: 2,
        accountNo: "301902",
        trueName: "沃里克",
        sex: "男",
        userName: "祖安怒兽",
        email: "12345@dasd",
      },
      {
        id: 3,
        accountNo: "301903",
        trueName: "艾希",
        sex: "女",
        userName: "寒冰射手",
        email: "123456@dasd",
      },
      {
        id: 4,
        accountNo: "301904",
        trueName: "卡萨丁",
        sex: "不详",
        userName: "虚空行者",
        email: "1234567@dasd",
      },
      {
        id: 5,
        accountNo: "301905",
        trueName: "亚索",
        sex: "男",
        userName: "疾风剑豪",
        email: "12345678@dasd",
      },
      {
        id: 6,
        accountNo: "301906",
        trueName: "金克斯",
        sex: "女",
        userName: "暴走萝莉",
        email: "123456789@dasd",
      },
    ];
    this.total = 6;
    this.queryParam.pageIndex = 1;
    this.listLoading = false;
    },
    methods: {
    search() {
      this.listLoading = true;
      this.userData = [
        {
        id: 1,
        accountNo: "301901",
        trueName: "泰达米尔",
        sex: "男",
        userName: "蛮族之王",
        email: "1234@dasd",
      },
      {
        id: 2,
        accountNo: "301902",
        trueName: "沃里克",
        sex: "男",
        userName: "祖安怒兽",
        email: "12345@dasd",
      },
      {
        id: 3,
        accountNo: "301903",
        trueName: "艾希",
        sex: "女",
        userName: "寒冰射手",
        email: "123456@dasd",
      },
      {
        id: 4,
        accountNo: "301904",
        trueName: "卡萨丁",
        sex: "不详",
        userName: "虚空行者",
        email: "1234567@dasd",
      },
      {
        id: 5,
        accountNo: "301905",
        trueName: "亚索",
        sex: "男",
        userName: "疾风剑豪",
        email: "12345678@dasd",
      },
      ];
      this.total = 5;
      this.queryParam.pageIndex = 1;
      this.listLoading = false;
    },
  },
}
</script>

<style scoped>
#user{
    width: 100%;
    min-height: 50vh;
    box-sizing: border-box;
  padding: 20px;
    /* background: pink; */
}
</style>