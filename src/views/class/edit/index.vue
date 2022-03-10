<template>
  <div id="edit">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="修改班级名称" prop="className">
        <el-input v-model="ruleForm.className"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 查询框 -->
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="账号：">
        <el-input v-model="queryParam.userName"></el-input>
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
      <el-table-column prop="userName" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            @onConfirm="kick(row)"
            title="确定要移出该学生吗？"
          >
            <el-button size="mini" slot="reference" type="danger"
              >移出</el-button
            >
          </el-popconfirm>
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
  name: "edit",
  components: {
    Pagination,
  },
  data() {
    var validateClassName = (rule, value, callback) => {
      if (value === ``) {
        callback("班级名称不能为空");
      } else if (value.trim() === ``) {
        callback(`班级名称至少要包含一个非空字符`);
      } else {
        callback();
      }
    };
    return {
      id: 0,
      arr: [],
      ruleForm: {
        className: "",
      },
      rules: {
        className: [{ validator: validateClassName, trigger: "blur" }],
      },
      queryParam: {
        userName: "",
        name: "",
        email: "",
        role: 1,
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
    };
  },
  created() {
    var myClass = this.$route.params.myClass;
    this.ruleForm.className = myClass.className;
    this.id = myClass.id;
    this.listLoading = true;

    this.apis.Class.getClassStudents(this.id).then((res) => {
      let res_data = res.data.result;

      for (let i = 0; i < res_data.length; i++) {
        var pushList = new Object();
        pushList.userName = res_data[i].username;
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
          this.queryParam.userName !== "" &&
          singleUser.userName.search(this.queryParam.userName) === -1
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apis.Class.editClass(this.id, this.ruleForm.className).then(
            (res) => {
              if (res.data.status === 200) {
                if (res.data.status === 200) {
                  this.$notify({
                    title: "成功",
                    message: "班级名称修改成功！",
                    type: "success",
                  });
                }
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    change({ page, limit }) {
      this.queryParam.pageIndex = page;
      this.queryParam.pageSize = limit;
    },
    kick(row) {
      this.apis.Class.kickStudent(this.id, row.userName).then((res) => {
        if (res.status === 200) {
          var index = this.arr.indexOf(row);
          this.arr.splice(index, 1);
        }
      });
    },
    search() {},
  },
};
</script>

<style scoped>
#edit {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 20px;
}
</style>