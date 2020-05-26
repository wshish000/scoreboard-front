<template>
  <div class="fillcontain">
    <el-table
      :data="tableData"
      style="width: 100%" align='center'>
      <el-table-column
        prop="ID"
        label="序号"
        align='center'
        width="100">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="week"
        label="周"
        align='center'
        width="140"
        sortable>
        <template slot-scope="scope">
          <span style="color:#CC0033">{{ scope.row.week }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="situp"
        label="仰卧起坐"
        align='center'
        width="140"
        sortable>
        <template slot-scope="scope">
          <span style="color:#CC0033">{{ scope.row.situp }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pullup"
        label="引体向上"
        align='center'
        width="140"
        sortable>
        <template slot-scope="scope">
          <span style="color:#00d053;">{{ scope.row.pullup }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="longRun"
        label="3000米"
        align='center'
        width="140"
        sortable>
        <template slot-scope="scope">
          <span style="color:#f56767">{{ Math.floor(scope.row.longrun/60) }}分{{ scope.row.longrun%60 }}秒</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="retrace"
        label="30米*2"
        align='center'
        width="140"
        sortable>
        <template slot-scope="scope">
          {{scope.row.retrace}}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数"
        align='center'
        width="140"
        sortable>
        <template slot-scope="scope">
          {{scope.row.score}}
        </template>
      </el-table-column>

      <el-table-column
        prop="remark"
        label="备注"
        align='center'
      >
        <template slot-scope="scope">
          <span style="color:#3366CC">{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import data from './chinaTabs.json';
  import {getPersonalData} from "@/api/score";

  export default {
    data(){
      return {
        tableData:[],
        tableHeight:0,
      }
    },
    // props:{
    //   toggleData:[String]
    // },
    mounted(){
      this.setTableHeight();
      window.onresize = () => {
        this.setTableHeight();
      };
      this.showTableData();

    },
    methods:{
      setTableHeight(){
        this.$nextTick(() => {
          this.tableHeight =  document.body.clientHeight - 280
        })
      },
      showTableData(){
        getPersonalData().then(res => {
          this.tableData = res.data.personalData;
        });
      }
    },
    watch: {
      // 监听属性的变化，可以接收参数;
      // toggleData(v) {
      //   this.showTableData(v);
      // },
    }
  }
</script>

<style lang="less">

</style>
