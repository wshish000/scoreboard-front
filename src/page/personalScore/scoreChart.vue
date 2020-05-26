<template>
  <section class="data_section" ref="data_section">
    <el-row :gutter="10" class="row_list">
      <el-col :span="8">
        <div class="row_left row_base">
          <el-col :span="12">
            <div class="pay saleBgcolor data_list rflex">
              <div class="leftItem cflex wflex">
                <p class="investor">总成绩最高</p>
                <p class="number">{{highest_score}}<span class="perTitle">分</span></p>
                <p class="cardText">{{highest_score_name}}</p>
              </div>
              <div class="rightItem">
                <icon-svg icon-class="iconfukuan" />
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="pay taxBgcolor data_list rflex">
              <div class="leftItem cflex wflex">
                <p class="investor">总成绩最低</p>
                <p class="number">{{lowest_score}}<span class="perTitle">分</span></p>
                <p class="cardText">{{lowest_score_name}}</p>
              </div>
              <div class="rightItem">
                <icon-svg icon-class="iconpay3" />
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="row_right row_base">
          <el-col :span="6">
            <div class="extenedBgcolor data_list rflex">
              <div class="leftItem cflex wflex">
                <p class="investor">引体向上第一</p>
                <p class="number">{{pull_up}}<span class="perTitle">次</span></p>
                <p class="cardText">{{pull_up_name}}</p>
              </div>
              <div class="rightItem">
                <icon-svg icon-class="iconpay2" />
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="likeBgcolor data_list rflex">
              <div class="leftItem cflex wflex">
                <p class="investor">仰卧起坐第一</p>
                <p class="number">{{sit_up}}<span class="perTitle">次</span></p>
                <p class="cardText">{{sit_up_name}}</p>
              </div>
              <div class="rightItem">
                <icon-svg icon-class="iconpay1" />
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="linkBgColor data_list rflex">
              <div class="leftItem cflex wflex">
                <p class="investor">30米X2第一</p>
                <p class="number">{{retrace}}<span class="perTitle">秒</span></p>
                <p class="cardText">{{retrace_name}}</p>
              </div>
              <div class="rightItem">
                <icon-svg icon-class="iconpay" />
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="keleBgColor data_list rflex">
              <div class="leftItem cflex wflex">
                <p class="investor">3000米第一</p>
                <p class="number">{{long_run.long_run_min}}<span class="perTitle">分</span>{{long_run.long_run_sec}}<span class="perTitle">秒</span></p>
                <p class="cardText">{{long_run_name}}</p>
              </div>
              <div class="rightItem">
                <icon-svg icon-class="iconfufei0" />
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="row_list order_list">
      <el-col :span="12">
        <personal-line-chart></personal-line-chart>
      </el-col>
      <el-col :span="12">
        <personal-score-chart></personal-score-chart>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="row_list order_list">
      <el-col :span="12">
        <radar-chart></radar-chart>
      </el-col>
      <el-col :span="12">
        <personal-category-chart></personal-category-chart>
      </el-col>
    </el-row>

  </section>
</template>

<script>
  import echarts from 'echarts'

  import barChart from '../../components/echarts/barChart' // 用户投资类型 柱状图
  import pieChart from '../../components/echarts/pieChart' // 用户投资类型 饼状图
  import radarChart from '../../components/echarts/radarChart' // 用户投资类型 雷达图
  import personalLineChart from '../../components/echarts/personalLineChart' // 用户投资类型 折线图
  import personalScoreChart from '../../components/echarts/personalScoreChart' // 用户投资类型 折线图
  import personalCategoryChart from '../../components/echarts/personalCategoryChart' // 用户投资类型 折线图



  import {getAnalysisScore} from "@/api/score";

  export default {
    name: "scoreAnalysis",
    data(){
      return {
        highest_score:0,
        lowest_score:0,
        pull_up:0,
        sit_up:0,
        long_run:{},
        retrace:0,
        highest_score_name:"",
        lowest_score_name:"",
        pull_up_name:"",
        sit_up_name:"",
        long_run_name:"",
        retrace_name:"",
      }
    },
    components: {
      barChart,
      pieChart,
      radarChart,
      personalLineChart,
      personalScoreChart,
      personalCategoryChart
    },
    created(){
    },
    mounted(){
      this.getScore();
    },
    methods: {
      getScore(){
        getAnalysisScore().then(res => {
          this.highest_score = res.data.highest_score;
          this.lowest_score = res.data.lowest_score;
          this.sit_up = res.data.sit_up;
          this.pull_up = res.data.pull_up;
          this.long_run = res.data.long_run;
          this.retrace = res.data.retrace;
          this.highest_score_name = res.data.highest_score_name;
          this.lowest_score_name = res.data.lowest_score_name;
          this.sit_up_name = res.data.sit_up_name;
          this.pull_up_name = res.data.pull_up_name;
          this.long_run_name = res.data.long_run_name;
          this.retrace_name = res.data.retrace_name;
          console.log("successfully")
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .data_section{
    margin: 20px;
    border-radius: 2px;
    .row_list{
      margin-bottom: 20px;
      .row_base{
        padding: 10px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 6px;
        height: 120px;
      }
    }
    .order_list{
      .orderArea{
        width: 100%;
        height: 300px;
        background: #fff !important;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 10px;
        padding-top: 40px;
        overflow: hidden;
      }
      .orderbarArea{
        height: 370px;
      }
    }
    .data_list{
      text-align: center;
      font-size: 14px;
      border-radius: 6px;
      padding: 10px;
      color:#fff;
      height: 80px;
      .leftItem{
        align-items: start;
        justify-content: space-between;
        text-align: left;
      }
      .rightItem{
        width:62px;
        display: flex;
        align-items: center;
        justify-content: center;
        .svg-icon{
          font-size: 30px;
        }
      }
      .number{
        font-size: 22px;
        font-weight: bold;
        .perTitle{
          font-size: 13px;
          margin-left: 5px;
        }
      }
    }
    .pay{
      .leftItem{
        justify-content: space-around;
      }
    }

  }

</style>

