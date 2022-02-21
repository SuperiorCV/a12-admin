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
      <el-form-item label="考试时间：" prop="dateMap" required>
        <el-date-picker
          v-model="exam.dateMap"
          type="datetimerange"
          value-format="yyyy-MM-dd hh:mm:ss"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="考试时长：" prop="duration" required="">
        <el-input-number
          v-model="exam.duration"
          :min="1"
          :max="1000"
        ></el-input-number
        ><span>&nbsp;分钟</span>
      </el-form-item>
      <el-form-item
        :key="idx"
        :label="`模块${idx + 1}`"
        required
        v-for="(mod, idx) in exam.modules"
      >
        <el-input v-model="mod.title" placeholder="请输入模块名称"> </el-input>
        <el-button
          type="warning"
          class="link-left"
          icon="el-icon-circle-plus-outline"
          size="small"
          style="margin-top: 10px"
          @click="addQuestion(idx)"
          >添加题目</el-button
        >
        <el-button
          type="danger"
          class="link-left"
          icon="el-icon-delete
"
          size="medium"
          style="margin-top: 10px"
          >删除模块</el-button
        >
        <el-card v-if="mod.questionList.length>0" style="margin-top:20px">
            <el-form-item :key="questionIdx" v-for="(question,questionIdx) in mod.questionList" :label="`[${question.score}分] 题目${questionIdx+1}：`" style="margin-bottom:15px">
                <el-row>
                    <el-col :span="23">
                        
                    </el-col>
                    <el-col :span="1">
                        <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
                    </el-col>
                </el-row>

            </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
        <el-button>重置</el-button>
        <el-button type="success" @click="addModule">添加模块</el-button>
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
        dateMap: [],
        duration: 1,
        modules: [],
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
      rules: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    addModule() {
      this.exam.modules.push({
        title: "",
        questionList:[]
      });
    },
    addQuestion(idx){
        this.exam.modules[idx].questionList.push({
            score: 2
        })
    }
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