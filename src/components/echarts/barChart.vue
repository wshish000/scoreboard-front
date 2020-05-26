<template>
    <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
    import echarts from 'echarts'
    import echartsTheme from "../../components/echarts/theme/westeros.json";
    import {getMaxandMin} from "@/api/score"
    export default {
        name:'barChat',
        data(){
            return {
                 id:'barChart',
                 myChart:null,
              week:[],
              maxData:[],
              minData:[],
            }
        },
        mounted(){
          this.getMaxandMin();
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
          getMaxandMin(){
            getMaxandMin().then(res => {
              this.week = res.data.week;
              this.maxData = res.data.maxData;
              this.minData = res.data.minData;
              this.loadChart();
              console.log("successfully")
            })
          },
            loadChart(){
                this.$nextTick(() => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
                    this.myChart.setOption(this.initOption());
                })
            },
         	initOption(){
                let option = {
                  title: {
                    text: '各周优劣对比'
                  },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高分','最低分']
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
                            name:'最低分',
                            type:'bar',
                            data:this.minData,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name:'最高分',
                            type:'bar',
                            data:this.maxData,
                            markPoint : {
                                data : [
                                  {type : 'max', name: '最大值'},
                                  {type : 'min', name: '最小值'}
                                ]
                            }
                        }
                    ]
                };
				return option;
			},
        },
        watch: {
        }
    }
</script>

<style lang="less">

</style>
