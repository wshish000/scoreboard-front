<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
	import echarts from 'echarts'
    import echartsTheme from "../../components/echarts/theme/westeros.json";
  import {getAverage} from "@/api/score"


  export default {
        data(){
            return {
				id:"lineChart",
                myChart:null,
              week:[],
              averageScore:[],
            }
        },
        mounted(){
          this.getAverageScore();
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
          getAverageScore(){
            getAverage().then(res => {
              this.week = res.data.week;
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
				let data = {
					title: {
						text: '平均分走势'
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
						data:['平均分',]
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
						{
							name:'平均分',
							type:'line',
							stack: '分数',
							areaStyle: {normal: {}},
							data:this.averageScore
						},
						// {
						// 	name:'储蓄',
						// 	type:'line',
						// 	stack: '总量',
						// 	label: {
						// 		normal: {
						// 			show: true,
						// 			position: 'top'
						// 		}
						// 	},
						// 	areaStyle: {normal: {}},
						// 	data:[820, 932, 901, 934, 1290, 1330, 1320]
						// }
					]
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
