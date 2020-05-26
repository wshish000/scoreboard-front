<template>
  <div :id="id" class="orderArea"></div>
</template>

<script>
  import echarts from 'echarts'
  import echartsTheme from "../../components/echarts/theme/westeros.json";
  import {getSeveral} from "@/api/score"

  export default {
    data(){
      return {
        id:"testChart",
        myChart:null,
        week:[],
        sitUpAverage:[],
        pullUpAverage:[],
        retraceAverage:[],
        longRunAverage:[]
      }
    },
    mounted(){
      this.getSeveralScore()
      this.loadChart();
    },
    beforeDestroy() {
      if (!this.myChart) {
        return
      }
      this.myChart.dispose();
      this.myChart = null;
    },
    methods: {
      getSeveralScore(){
        getSeveral().then(res => {
          this.week = res.data.week;
          this.sitUpAverage = res.data.sitUpAverage;
          this.pullUpAverage = res.data.pullUpAverage;
          this.longRunAverage = res.data.longRunAverage;
          this.retraceAverage = res.data.retraceAverage;
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
            text: '各项成绩'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data:['仰卧起坐','引体向上','折返跑','3000米',]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : this.week
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            // {
            //   name:'股票',
            //   type:'line',
            //   stack: '总量',
            //   areaStyle: {normal: {}},
            //   data:[120, 132, 101, 134, 90, 230, 210]
            // },
            {
              name:'仰卧起坐',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:this.sitUpAverage
            },
            {
              name:'引体向上',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:this.pullUpAverage
            },
            {
              name:'折返跑',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:this.retraceAverage
            },
            {
              name:'3000米',
              type:'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {normal: {}},
              data:this.longRunAverage
            }
          ]
        }
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
