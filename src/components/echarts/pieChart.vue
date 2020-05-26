<template>
    <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
	import echarts from 'echarts'
  import echartsTheme from "../../components/echarts/theme/westeros.json";
	import {getLastWeek} from "@/api/score"

    export default {
      data(){
        return {
          id:'ordertype',
          myChart:null,
          a:0,
          b:0,
          c:0,
          d:0
        }
      },
		  props: ['type'],

      created() {
      },
      mounted(){
        this.getLastWeekData();
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
      getLastWeekData(){
        getLastWeek().then(res => {
          this.a = res.data.a;
          this.b = res.data.b;
          this.c = res.data.c;
          this.d = res.data.d;
          this.loadChart();
          console.log("successfully")
        })
      },
      loadChart(){
        this.$nextTick(() => {
          echarts.registerTheme('westeros', echartsTheme);
          this.myChart = echarts.init(document.getElementById(this.id),'westeros');
          this.myChart.setOption(this.initOption(this.type));
        })
      },
      initOption(type){
				let text,legend_data,series_data;
				if(type == "ordertype"){
					text = "上周成绩分布";
					legend_data = ['优秀','良好','及格','不及格'];
					series_data = [
						{value:this.a, name:'优秀'},
						{value:this.b, name:'良好'},
						{value:this.c, name:'及格'},
						{value:this.d, name:'不及格'}
					]
				}else{
					text = "用户投资区域";
					legend_data = ['华东区','华南区','华中区','华北区','西南区','东北区','台港澳'];
					series_data = [
						{value:335, name:'华东区'},
						{value:310, name:'华南区'},
						{value:234, name:'华中区'},
						{value:835, name:'华北区'},
						{value:1548, name:'西南区'},
						{value:335, name:'东北区'},
						{value:454, name:'台港澳'}
					]
				}
				let data = {
          title : {
						text: text,
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: legend_data
					},
					series : [
						{
							name: '成绩分布',
							type: 'pie',
							radius : '50%',
              center: ['50%', '60%'],
							data:series_data,
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
				return data;
			},
        },
        watch: {
            type:(v)=>{
                this.initOption(v)
            }
        }
    }
</script>

<style lang="less">

</style>
