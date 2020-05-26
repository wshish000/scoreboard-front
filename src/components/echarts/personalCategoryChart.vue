<template>
  <div :id="id" class="orderArea"></div>
</template>

<script>
  import echarts from 'echarts';
  import '../../../node_modules/echarts/theme/vintage.js';
  import echartsTheme from "../../components/echarts/theme/westeros.json";
  import {getCategoryScore} from "@/api/score"

  export default {
    data(){
      return {
        id:"personalCategoryChart",
        myChart:null,
        week:[],
        sitUpScore:[],
        pullUpScore:[],
        retraceScore:[],
        longRunScore:[]
      }
    },
    mounted(){
      this.getCategory()
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
      getCategory(){
        getCategoryScore().then(res => {
          this.week = res.data.week;
          this.sitUpScore = res.data.sitUpScore;
          this.pullUpScore = res.data.pullUpScore;
          this.longRunScore = res.data.longRunScore;
          this.retraceScore = res.data.retraceScore;
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
        let data = {
          title: {
            text: '成绩分布'
          },
          grid: {
            top: '3%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          angleAxis: {},
          radiusAxis: {
            type: 'category',
            data: this.week,
            z: 10
          },
          polar: {},
          series: [{
            type: 'bar',
            data: this.sitUpScore,
            coordinateSystem: 'polar',
            name: '仰卧起坐',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.pullUpScore,
            coordinateSystem: 'polar',
            name: '引体向上',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.longRunScore,
            coordinateSystem: 'polar',
            name: '3000米',
            stack: 'a'
          },{
            type: 'bar',
            data: this.retraceScore,
            coordinateSystem: 'polar',
            name: '30米*2',
            stack: 'a'
          }],
          legend: {
            show: true,
            orient:"vertical",
            left: 'left',
            bottom: '5%',
            data: ['仰卧起坐', '引体向上', '3000米','30米*2'],
          }
        };
        return data;
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
