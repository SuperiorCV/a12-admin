<template>
  <div id="list">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="班级名：">
        <el-input v-model="queryParam.className"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="sliceClassData"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="className" label="班级名称"></el-table-column>
      <el-table-column prop="password" label="班级口令"></el-table-column>
      <el-table-column prop="num" label="班级人数"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="editClass(row)">编辑</el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            @onConfirm="dismiss(row)"
            title="确定要解散该班级吗？"
          >
            <el-button
              size="mini"
              type="danger"
              class="link-left"
              slot="reference"
              >解散</el-button
            >
          </el-popconfirm>
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
  components: {
    Pagination,
  },
  name: "list",
  data() {
    return {
      arr: [],
      queryParam: {
        className: "",
        pageIndex: 1,
        pageSize: 10,
      },
      listLoading: true,
      // pages: 30,
    };
  },
  created() {
    this.listLoading = true;
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

        this.arr.push(pushList);
      }
      this.listLoading = false;
    });
    this.queryParam.pageIndex = 1;
    
  },
  computed: {
    classData() {
      var ans = [];
      var arr = this.arr;
      for (let i = 0; i < this.arr.length; i++) {
        var singleClass = arr[i];
        var v = true;
        if (
          this.queryParam.className !== "" &&
          singleClass.className.search(this.queryParam.className) === -1
        ) {
          v = false;
        }
        if (v) {
          ans.push(singleClass);
        }
      }
      return ans;
    },
    sliceClassData() {
      var re = [];
      var arr = this.classData;
      var start = (this.queryParam.pageIndex - 1) * this.queryParam.pageSize;
      var end =
        (this.queryParam.pageIndex - 1) * this.queryParam.pageSize +
        this.queryParam.pageSize;
      var re = arr.slice(start, end);
      return re;
    },
    total() {
      return this.classData.length;
    },
  },
  methods: {
    editClass(row) {
      this.$router.push({ name: "classEdit", params: { myClass: row } });
    },
    change({ page, limit }) {
      this.queryParam.pageIndex = page;
      this.queryParam.pageSize = limit;
    },
    dismiss(row) {
      this.apis.Class.dismissClass(row.id).then((res) => {
        console.log(res);
        if (res.status === 200) {
          var index = this.arr.indexOf(row);
          this.arr.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style scoped>
#list {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 20px;
}
</style>