<template>
  <div id="analyze">
    <div id="l-side">
      <h3>{{ exam.title }}</h3>
      <div class="info">
        <p>试卷总分：{{ exam.fullScore }}分</p>
      </div>
      <div class="menu">
        <el-tag
          class="tag"
          :type="questionStatus(item.status, item.questionType)"
          v-for="(item, j) in tags"
          :key="j"
          @click="goAnchor(`#question-${item.id}`)"
          >{{ j + 1 }}</el-tag
        >
      </div>
      <div class="tool">
        <el-button type="primary" plain v-if="edit === true"
          >提交批改</el-button
        >
        <el-button plain @click="toList">返回列表</el-button>
      </div>
    </div>
    <div id="r-main">
      <div id="top-analyze">
        <div class="header">
          <h3>试卷分析总览</h3>
        </div>
        <div class="count-wrapper">
          <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-people">
                  <svg-icon icon-class="star" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">最高分</div>
                  <count-to
                    :start-val="0"
                    :end-val="exam.firstPoint"
                    :duration="2600"
                    class="card-panel-num"
                    v-loading="loading"
                  />
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-message">
                  <svg-icon icon-class="exam" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">最低分</div>
                  <count-to
                    :start-val="0"
                    :end-val="exam.lastPoint"
                    :duration="3000"
                    class="card-panel-num"
                    v-loading="loading"
                  />
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-shopping">
                  <svg-icon icon-class="user" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">平均分</div>
                  <count-to
                    :start-val="0"
                    :end-val="exam.averagePoint"
                    :duration="3600"
                    class="card-panel-num"
                    v-loading="loading"
                  />
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-money">
                  <svg-icon icon-class="chart" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">中位分</div>
                  <count-to
                    :start-val="0"
                    :end-val="exam.centerPoint"
                    :duration="3200"
                    class="card-panel-num"
                    v-loading="loading"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div id="histogram"></div>
      </div>
      <div class="module" v-for="(mod, idx) in exam.modules" :key="idx">
        <div class="header">
          <h3>模块{{ idx + 1 }}：{{ mod.title }}</h3>
        </div>
        <histogram :mid="mod.mid"></histogram>
        <div
          :id="`question-${question.id}`"
          class="card"
          v-for="(question, j) in mod.questionList"
          :key="j"
        >
          <AnalyzeShow
            :edit="edit"
            :idx="IndexCompute(idx, j)"
            :qid="question.id"
            :question="question"
            @updateExam="updateExam"
          ></AnalyzeShow>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AnalyzeShow from "@/components/AnalyzeShow";
import CountTo from "vue-count-to";
import histogram from "./histogram";
export default {
  name: "analyze",
  components: {
    AnalyzeShow,
    CountTo,
    histogram,
  },
  created() {
    var params = this.$route.params;
    if (params != null) {
      this.edit = params.edit;
      this.eid = params.eid;
    }
    this.apis.exam
      .getExamAnalyze(this.eid, sessionStorage.getItem("teacherUsername"))
      .then((res) => {
        if (res.data.status === 200) {
          // console.log(res);
          let data = res.data.result;
          this.exam.firstPoint = data.firstPoint;
          this.exam.lastPoint = data.lastPoint;
          this.exam.averagePoint = data.averagePoint;
          this.exam.centerPoint = data.centerPoint;

          for (var index in data.countMap) {
            this.histogramx.push(index);
            this.histogramy.push(data.countMap[index]);
          }
          // console.log(this.histogramy);
          this.initHistogram();
        }
      });
    this.apis.exam.getAnalyzeQuestions(this.eid).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        var result = res.data.result;
        var sum = 0;
        this.exam.modules = result;
        for (let i = 0; i < result.length; i++) {
          var questionList = this.exam.modules[i].questionList;
          for (let j = 0; j < questionList.length; j++) {
            var question = questionList[j];
            sum += question.score;
          }
        }
        this.exam.fullScore = sum;
      }
    });
  },
  data() {
    return {
      eid: "",
      edit: true,
      loading: false,
      histogramx: [],
      histogramy: [],
      exam: {
        firstPoint: 0,
        lastPoint: 0,
        averagePoint: 0,
        centerPoint: 0,
        modules: [],
        fullScore: 0,
      },
    };
  },
  computed: {
    tags() {
      var tags = [];
      var modules = this.exam.modules;
      for (let i = 0; i < modules.length; i++) {
        var questionList = modules[i].questionList;
        for (let j = 0; j < questionList.length; j++) {
          tags.push(questionList[j]);
        }
      }
      return tags;
    },
  },
  methods: {
    initHistogram() {
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById("histogram"));
      var option;
      option = {
        xAxis: {
          type: "category",
          data: this.histogramx,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.histogramy,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    toList() {
      this.$router.push({ name: "examList" });
    },
    questionStatus(status, type) {
      if (status === -1) {
        return `danger`;
      } else if (status === 0) {
        return `warning`;
      } else if (status === 1 && type != 4) {
        return `success`;
      } else if (status === 1 && type === 1) {
        return ``;
      }
    },
    goAnchor(id) {
      this.$el.querySelector(id).scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "nearest",
      });
    },
    updateExam(n, o) {
      n.status = 2; //对于简答题只能是0和2表示等待审批和已审批完
      var modules = this.exam.modules;
      for (let i = 0; i < modules.length; i++) {
        var questionList = modules[i].questionList;
        var idx = questionList.indexOf(o);
        if (idx !== -1) {
          questionList[idx] = n;
          return;
        }
      }
    },
    IndexCompute(idx, j) {
      var ans = 0;
      for (let i = 0; i < idx; i++) {
        ans += this.exam.modules[i].questionList.length;
      }
      return ans + j + 1;
    },
  },
};
</script>

<style scoped>
#analyze {
  width: 100%;
  background: #eff3f7;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
#top-analyze {
  width: 100%;
}
#histogram {
  width: 100%;
  height: 400px;
}
#l-side {
  position: fixed;
  top: 105px;
  background: #fff;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
}
.info {
  border-bottom: 1px solid #e6e6e6;
}
.menu {
  box-sizing: border-box;
  padding: 10px 0px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.tag {
  margin-bottom: 5px;
  margin-left: 5px;
  cursor: pointer;
}
.tool {
  display: flex;
  padding-top: 8px;
  border-top: 1px solid #e6e6e6;
}
.header {
  display: flex;
  align-items: center;
  height: 64px;
  box-sizing: border-box;
  padding: 10px;
  background: #fafafa;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
}
.card {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}
#r-main {
  width: calc(100% - 320px);
  margin-left: 320px;
  background: #fff;
}
</style>

<style lang="scss" scoped>
#charts {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;

  .chart {
    width: 48%;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 30px;
  }
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #feca57;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #feca57;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.echarts-line {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
.count-wrapper {
  width: 95%;
  margin: 0 auto;
}
</style>