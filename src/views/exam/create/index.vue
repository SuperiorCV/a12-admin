<template>
  <div id="create">
    <el-form :model="exam" :rules="rules" ref="exam" label-width="100px">
      <el-form-item label="试卷名称：" prop="title" required="">
        <el-input placeholder="请输入试卷名称" v-model="exam.title" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="注意事项：" prop="tip" required="">
        <el-input
          type="textarea"
          placeholder="请输入试卷名称"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="exam.tip"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item label="考试班级：" prop="examClass" required>
        <el-checkbox-group v-model="exam.examClass">
          <el-checkbox v-for="item in myClass" :label="item.id" :key="item.id">
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "create",
  data() {
    return {
      exam: {
        title: "",
        tip: "",
        examClass: [],
      },
      myClass: [
        {
          id: 1,
          name: "软件工程1班",
        },
        {
          id: 2,
          name: "软件工程2班",
        },
        {
          id: 3,
          name: "软件工程3班",
        },
      ],
      rules:{}
    };
  },
};
</script>

<style scoped>
#create {
  width: 100%;
  min-height: 50vh;
  box-sizing: border-box;
  padding: 20px;
  /* background: yellow; */
}
</style>