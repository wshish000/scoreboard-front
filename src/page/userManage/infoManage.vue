<template>
  <div class="fillcontain">
    <search-item @showDialog="showAddMemberDialog" @searchList="getMemberList" @onBatchDelMember="onBatchDelMember"></search-item>
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
          prop="number"
          label="证件号"
          align='center'
          width="140">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align='center'
          width="140">
        </el-table-column>
        <el-table-column
          prop="job"
          label="职务"
          align='center'
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="军衔"
          align='center'
          width="130"
          :formatter="formatterType"
          :filters="fields.level.filter.list"
          :filter-method="filterType">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          align='center'
          width="130"
          sortable>
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.age }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="height"
          label="身高"
          align='center'
          width="130"
          sortable>
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.height }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="体重"
          align='center'
          width="130"
          sortable>
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.weight }}</span>
          </template>
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
              @click='onEditMember(scope.row)'
            >编辑</el-button>
            <el-button
              type="danger"
              icon='delete'
              size="mini"
              @click='onDeleteMember(scope.row,scope.$index)'
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
      <addMemberDialog  v-if="addMemberDialog.show" :isShow="addMemberDialog.show" :dialogRow="addMemberDialog.dialogRow"  @getMemberList="getMemberList"  @closeDialog="hideAddMemberDialog"></addMemberDialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import * as mutils from '@/utils/mUtils'
  import SearchItem from "./components/searchItem";
  import AddMemberDialog from "./components/addMemberDialog";
  import Pagination from "@/components/pagination";
  import {getMember, removeMember, batchremoveMember} from "@/api/info";

  export default {
    data(){
      return {
        tableData: [],
        tableHeight:0,
        loading:true,
        idFlag:false,
        isShow:false, // 是否显示用户modal,默认为false
        editid:'',
        rowIds:[],
        sortnum:0,
        format_type_list: {
          0: '列兵',
          1: '上等兵',
          2: '下士',
          3: '中士',
          4: '上士',
          5: '少尉',
          6: '中尉',
          7: '上尉',
          8: '少校'
        },
        addMemberDialog:{
          show:false,
          dialogRow:{}
        },
        memberData:{
          page:1,
          limit:20,
          name:''
        },
        pageTotal:0,
        // 用于列表筛选
        fields: {
          level:{
            filter: {
              list: [{
                text: '列兵',
                value: 0
              },{
                text: '上等兵',
                value: 1
              }, {
                text: '下士',
                value: 2
              }, {
                text: '中士',
                value: 3
              }, {
                text: '上士',
                value: 4
              }, {
                text: '少尉',
                value: 5
              }, {
                text: '中尉',
                value: 6
              }, {
                text: '上尉',
                value: 7
              }, {
                text: '少校',
                value: 8
              }],
              multiple: true
            }
          },
        },

      }
    },
    components:{
      SearchItem,
      AddMemberDialog,
      Pagination
    },
    computed:{
      ...mapGetters(['search'])
    },
    mounted() {
      this.getMemberList();
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
      getMemberList(){
        const para = Object.assign({},this.memberData,this.search);
        getMember(para).then(res => {
          this.loading = false;
          this.pageTotal = res.data.total
          this.tableData = res.data.memberList
        })
      },
      // 显示人员弹框
      showAddMemberDialog(val){
        this.$store.commit('SET_DIALOG_TITLE', val)
        this.addMemberDialog.show = true;
      },
      hideAddMemberDialog(){
        this.addMemberDialog.show = false;
      },
      // 上下分页
      handleCurrentChange(val){
        this.memberData.page = val;
        this.getMemberList()
      },
      // 每页显示多少条
      handleSizeChange(val){
        this.memberData.limit = val;
        this.getMemberList()
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
      onEditMember(row){
        this.addMemberDialog.dialogRow = {...row};
        this.showAddMemberDialog();
      },
      // 删除数据
      onDeleteMember(row){
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const para = { id: row.id }
            removeMember(para).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getMemberList()
            })
          })
          .catch(() => {})
      },
      onBatchDelMember(){
        this.$confirm('确认批量删除记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const ids = this.rowIds.map(item => item.id).toString()
            const para = { ids: ids }
            batchremoveMember(para).then(res => {
              this.$message({
                message: '批量删除成功',
                type: 'success'
              })
              this.getMemberList()
            })
          })
          .catch(() => {})
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


