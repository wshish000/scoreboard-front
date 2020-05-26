<template>
  <div class="fillcontain">
    <search-item @showDialog="showAddScoreDialog" @searchList="getScoreList" @onBatchDelScore="onBatchDelScore" @onDownloadScore="onDownloadScore"></search-item>
    <div class="table_container">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        align='center'
        @select="selectTable"
        @select-all="selectAll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="idFlag"
          prop="id"
          label="id"
          align='center'
          width="180">
        </el-table-column>
        <el-table-column
          type="selection"
          align='center'
          width="60">
        </el-table-column>
        <el-table-column
          prop="week"
          label="周"
          align='center'
          width="60"
          sortable>
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.week }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align='center'
          width="80">
        </el-table-column>
        <el-table-column
          prop="situp"
          label="仰卧起坐"
          align='center'
          width="130"
          sortable>
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.situp }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pullup"
          label="引体向上"
          align='center'
          width="130"
          sortable>
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.pullup }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="longrun"
          label="3000米"
          align='center'
          width="130"
          sortable>
          <template slot-scope="scope">
            <span style="color:#f56767">{{ Math.floor(scope.row.longrun/60) }}分{{ scope.row.longrun%60 }}秒</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="retrace"
          label="30米*2"
          align='center'
          width="130"
          sortable>
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.retrace }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          label="成绩"
          align='center'
          width="130"
          sortable>
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align='center'
          width="80">
        </el-table-column>
        <el-table-column
          prop="operation"
          align='center'
          label="操作"
          width="180">
          <template slot-scope='scope'>
            <el-button
              type="warning"
              icon='edit'
              size="mini"
              @click='onEditScore(scope.row)'
            >编辑</el-button>
            <el-button
              type="danger"
              icon='delete'
              size="mini"
              @click='onDeleteScore(scope.row,scope.$index)'
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
      <addScoreDialog  v-if="addScoreDialog.show" :isShow="addScoreDialog.show" :dialogRow="addScoreDialog.dialogRow"  @getScoreList="getScoreList"  @closeDialog="hideAddScoreDialog"></addScoreDialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import * as mutils from '@/utils/mUtils'
  import SearchItem from "./components/searchItem";
  import AddScoreDialog from "./components/addScoreDialog";
  import Pagination from "@/components/pagination";
  import {getScore, removeScore, batchremoveScore} from "@/api/score";

  export default {
    data(){
      return {
        tableData: [],
        tableHeight:0,
        loading:true,
        idFlag:false,
        isShow:false,
        editid:'',
        rowIds:[],
        sortnum:0,
        addScoreDialog:{
          show:false,
          dialogRow:{}
        },
        scoreData:{
          page:1,
          limit:20,
          name:'',
          week:''
        },
        pageTotal:0,

      }
    },
    components:{
      SearchItem,
      AddScoreDialog,
      Pagination
    },
    computed:{
      ...mapGetters(['scoreSearch'])
    },
    mounted() {
      this.getScoreList();
    },
    methods: {

      handleSelectionChange(val) {
        this.rowIds = val;
      },

      setTableHeight(){
        this.$nextTick(() => {
          this.tableHeight =  document.body.clientHeight - 300
        })
      },
      // 获取人员列表数据
      getScoreList(){
        const para = Object.assign({},this.scoreData,this.scoreSearch);
        getScore(para).then(res => {
          this.loading = false;
          this.pageTotal = res.data.total
          this.tableData = res.data.scoreList
        })
      },
      // 显示人员弹框
      showAddScoreDialog(val){
        this.$store.commit('SET_DIALOG_TITLE', val)
        this.addScoreDialog.show = true;
      },
      hideAddScoreDialog(){
        this.addScoreDialog.show = false;
      },
      // 上下分页
      handleCurrentChange(val){
        this.scoreData.page = val;
        this.getScoreList()
      },
      // 每页显示多少条
      handleSizeChange(val){
        this.scoreData.limit = val;
        this.getScoreList()
      },
      /**
       * 格式化状态
       */
      formatterType(item) {
        const type = parseInt(item.level);
        return this.format_type_list[type];
      },
      filterType(value, item) {
        const type = parseInt(item.level);
        return this.format_type_list[value] == this.format_type_list[type];
      },
      // 编辑操作方法
      onEditScore(row){
        this.addScoreDialog.dialogRow = {...row};
        this.showAddScoreDialog();
      },
      // 删除数据
      onDeleteScore(row){
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const para = { id: row.id }
            removeScore(para).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getScoreList()
            })
          })
          .catch(() => {})
      },
      onBatchDelScore(){
        this.$confirm('确认批量删除记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const ids = this.rowIds.map(item => item.id).toString()
            const para = { ids: ids }
            batchremoveScore(para).then(res => {
              this.$message({
                message: '批量删除成功',
                type: 'success'
              })
              this.getScoreList()
            })
          })
          .catch(() => {})
      },
      onDownloadScore(){
        this.$confirm('确认导出excel文件吗？', '提示', {
          type: 'warning'
        }).then(() => {
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['周', '姓名', '仰卧起坐', '引体向上', '3000米', '3000米/分钟', '3000米/秒钟', '30米*2', '成绩', '备注']
            const filterVal = ['week', 'name', 'situp', 'pullup', 'longrun', 'longrun_min', 'longrun_sec', 'retrace', 'score', 'remark']
            const list = this.tableData
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: '成绩导出',
              autoWidth: true
            })
          })
        })
        .catch(() => {})
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      },
      // 当用户手动勾选数据行的 Checkbox 时触发的事件
      selectTable(val, row){
        this.setSearchBtn(val);
      },
      // 用户全选checkbox时触发该事件
      selectAll(val){
        val.forEach((item) => {
          this.rowIds.push(item.id);
        });
        this.setSearchBtn(val);
      },
      setSearchBtn(val){
        let isFlag = true;
        if(val.length > 0){
          isFlag = false;
        }else{
          isFlag = true;
        }
        this.$store.commit('SET_SEARCHBTN_DISABLED',isFlag);
      }
    },
  }
</script>

<style lang="less" scoped>
  .table_container{
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }
  .el-dialog--small{
    width: 600px !important;
  }
  .pagination{
    text-align: left;
    margin-top: 10px;
  }

</style>


