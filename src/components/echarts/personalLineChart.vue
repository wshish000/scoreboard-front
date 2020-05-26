<template>
  <div :id="id" class="orderArea"></div>
</template>

<script>
  import echarts from 'echarts'
  import echartsTheme from "../../components/echarts/theme/westeros.json";
  import {getPersonalScore, getAverage} from "@/api/score"


  export default {
    data(){
      return {
        id:"personalLineChart",
        myChart:null,
        week:[],
        score:[],
        averageScore:[],
      }
    },
    mounted(){
      this.getPersonal();
      // this.loadChart();
    },
    beforeDestroy() {
      if (!this.myChart) {
        return
      }
      this.myChart.dispose();
      this.myChart = null;
    },
    methods: {
      getPersonal(){
        getPersonalScore().then(res => {
          this.week = res.data.week;
          this.score = res.data.score;
          this.getAverage();
          console.log("successfully")
        })
      },
      getAverage(){
        getAverage().then(res => {
          this.averageScore = res.data.averageScore;
          this.loadChart();
          console.log("successfully")
        })
      },
      loadChart(){
        this.$nextTick(() => {
          echarts.registerTheme('westeros', echartsTheme)
          this.myChart = echarts.init(document.getElementById(this.id), 'westeros');
          this.myChart.setOption(this.initOption());
        })
      },
      initOption(){
        let option = {
          title: {
            text: '分数柱状图'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['分数', '平均分']
          },
          xAxis : [
            {
              type : 'category',
              data : this.week,
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'平均分',
              type:'line',
              stack: '',
              areaStyle: {normal: {}},
              data:this.averageScore
            },
            {
              name:'分数',
              type:'bar',
              data:this.score,
            },
          ]
        };
        return option;
      },
    },
    watch: {
      // id:()=>{
      //     this.initOption()
      // }
    }
  }
</script>

<style lang="less">

</style>
