<template>
  <div id="user">
    <el-dialog :visible.sync="classVisible" style="width: 100%; height: 100%">
      <div id="container">
        <h3>请选择邀请加入的班级：</h3>
        <div class="classList">
          <div
            class="item"
            v-for="(item,i) in myClass"
            :key="item.id"
            @click="join(i)"
          >
            <span
              ><svg
                t="1646896989135"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2088"
                width="30"
                height="30"
              >
                <path
                  d="M515.2256 510.1568m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z"
                  fill="#FFE3DB"
                  p-id="2089"
                ></path>
                <path
                  d="M788.48 270.1312H241.9712c-15.4624 0-28.0064 12.544-28.0064 28.0064s12.544 28.0064 28.0064 28.0064h20.4288v293.2736c0 38.656 31.3344 69.9904 69.9904 69.9904h74.1888l-79.8208 76.8512a27.98592 27.98592 0 0 0-0.768 39.5776 28.04736 28.04736 0 0 0 20.1728 8.6016c7.0144 0 13.9776-2.6112 19.4048-7.8336l121.7024-117.1968h62.0544l118.3232 116.9408a28.08832 28.08832 0 0 0 39.6288-0.2048 28.08832 28.08832 0 0 0-0.2048-39.6288l-78.0288-77.1072h64.9728c38.656 0 69.9904-31.3344 69.9904-69.9904V326.144H788.48c15.4624 0 28.0064-12.544 28.0064-28.0064s-12.4928-28.0064-28.0064-28.0064z m-236.544 152.6272c0 15.4624-12.544 28.0064-28.0064 28.0064H376.832c-15.4624 0-28.0064-12.544-28.0064-28.0064s12.544-28.0064 28.0064-28.0064h147.0976c15.4624 0 28.0064 12.544 28.0064 28.0064z m94.5664 152.6272H376.832c-15.4624 0-28.0064-12.544-28.0064-28.0064s12.544-28.0064 28.0064-28.0064h269.6704c15.4624 0 28.0064 12.544 28.0064 28.0064s-12.544 28.0064-28.0064 28.0064z"
                  fill="#F23D4F"
                  p-id="2090"
                ></path>
                <path
                  d="M213.9648 298.1376c0 15.4624 12.544 28.0064 28.0064 28.0064h20.4288v293.2736c0 38.656 31.3344 69.9904 69.9904 69.9904h74.1888l-74.5984 71.8336c0.7168 0 1.4336 0.0512 2.1504 0.0512 29.9008 0 59.136-2.9184 87.3984-8.4992l65.792-63.3856h62.0544l11.1104 10.9568c95.9488-55.808 169.4208-146.0224 203.52-253.7472V326.144h20.6336c0.1536-5.2224 0.3072-10.4448 0.3072-15.7184 0-13.568-0.6144-27.0336-1.792-40.2944H241.9712c-15.4624 0-28.0064 12.544-28.0064 28.0064zM376.832 394.752h147.0976c15.4624 0 28.0064 12.544 28.0064 28.0064 0 15.4624-12.544 28.0064-28.0064 28.0064H376.832c-15.4624 0-28.0064-12.544-28.0064-28.0064 0-15.4624 12.544-28.0064 28.0064-28.0064z m0 124.6208h269.6704c15.4624 0 28.0064 12.544 28.0064 28.0064s-12.544 28.0064-28.0064 28.0064H376.832c-15.4624 0-28.0064-12.544-28.0064-28.0064s12.544-28.0064 28.0064-28.0064z"
                  fill="#FC4956"
                  p-id="2091"
                ></path>
                <path
                  d="M213.9648 298.1376c0 15.4624 12.544 28.0064 28.0064 28.0064h20.4288v272.0256c36.1984-4.1472 71.168-12.544 104.2432-24.7296a27.96544 27.96544 0 0 1-17.8176-26.0608c0-15.4624 12.544-28.0064 28.0064-28.0064h92.928c84.48-59.392 147.6608-147.0464 175.7696-249.2416H241.9712c-15.4624 0-28.0064 12.544-28.0064 28.0064zM376.832 394.752h147.0976c15.4624 0 28.0064 12.544 28.0064 28.0064 0 15.4624-12.544 28.0064-28.0064 28.0064H376.832c-15.4624 0-28.0064-12.544-28.0064-28.0064 0-15.4624 12.544-28.0064 28.0064-28.0064z"
                  fill="#FF5C64"
                  p-id="2092"
                ></path>
                <path
                  d="M213.9648 298.1376c0 15.4624 12.544 28.0064 28.0064 28.0064h20.4288v84.3264c74.8032-29.44 139.776-78.2848 188.8256-140.3392H241.9712c-15.4624 0-28.0064 12.544-28.0064 28.0064z"
                  fill="#FF716E"
                  p-id="2093"
                ></path></svg
              >{{ item.className }}</span
            >
            <span>人数：{{ item.num }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
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
        <el-button type="primary">查询</el-button>
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
        <template slot-scope="{ row }">
          <el-button size="mini" type="success" @click="invite(row)"
            >邀请加入班级</el-button
          >
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
      student: {},
      classVisible: false,
      myClass: [],
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
      // console.log(res_data);

      for (let i = 0; i < res_data.length; i++) {
        var pushList = new Object();
        pushList.username = res_data[i].username;
        pushList.name = res_data[i].name;
        pushList.sex = res_data[i].sex;
        pushList.email = res_data[i].email;

        this.arr.push(pushList);
      }
    });
    this.queryParam.pageIndex = 1;
    this.listLoading = false;

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
    invite(row) {
      this.classVisible = true;
      this.student = row;
    },
    join(i) {
      this.apis.Class.invite(
        this.myClass[i].id,
        this.student.username,
        sessionStorage.getItem("teacherUsername")
      ).then((res) => {
        if (res.data.status === 200) {
          this.$notify({
            title: "成功",
            message: "邀请加入班级成功！",
            type: "success",
          });
          this.classVisible=false;
          this.myClass[i].num+=1;
        }
      });
    },
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
#container {
  width: 100%;
  min-height: 400px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: rgba(247, 248, 250, 1);
  /* background: pink; */
}
.classList {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #333;
  font-weight: 500;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0px 1px 2px rgba(33 40 53 / 10%), 0px 2px 8px rgba(33 40 53 / 8%);
  transition: 0.3s;
  height: 60px;
}
.item:hover {
  background: #f4f4f4;
}
span {
  margin-left: 20px;
  display: flex;
  align-items: center;
}
svg {
  margin-right: 8px;
}
</style>