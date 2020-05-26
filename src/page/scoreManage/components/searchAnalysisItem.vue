<template>
  <div class="search_container searchArea">
    <el-form
      :inline="true"
      :model='search_data'
      :rules="rules"
      ref="search_data"
      class="demo-form-inline search-form">
      <el-form-item label="按姓名查找">
        <el-input v-model="search_data.name" placeholder="姓名"  @keyup.enter.native='onSearchScore("search_data")'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size ="mini" icon="search" @click='onSearchScore("search_data")'>筛选</el-button>
      </el-form-item>
      <el-form-item label="按周查找">
        <el-input v-model="search_data.week" placeholder="周"  @keyup.enter.native='onSearchScore("search_data")'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size ="mini" icon="search" @click='onSearchScore("search_data")'>筛选</el-button>
      </el-form-item>

      <el-form-item class="btnRight">
        <el-button type="primary" size ="mini" icon="view" @click='onBatchDelScore()' :disabled="batchDelBtnDisabled">批量删除</el-button>
        <el-button type="success" size ="mini" icon="view" @click='onDownloadScore()'>导出Elcel</el-button>
        <el-button type="primary" size ="mini" icon="view" @click='onAddScore()'>添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name:'searchItem',
    data(){
      return {
        search_data:{
          startTime:'',
          endTime:'',
          name:'',
          week:''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入第几周', trigger: 'blur' },
          ]
        }
      }
    },
    computed:{
      ...mapGetters(['batchDelBtnDisabled']),

    },
    created(){
    },
    methods:{
      onSearchScore(searchForm){
        this.$refs[searchForm].validate((valid) => {
          if (valid) {
            this.$store.commit('SET_SEARCH',this.search_data);
            this.$emit("searchList");
          }
        })
      },
      onAddScore(){
        this.$emit("showDialog",'add');
      },
      onBatchDelScore(){
        this.$emit("onBatchDelScore");
      },
      onDownloadScore(){
        this.$emit("onDownloadScore");
      }
    }
  }
</script>

<style lang="less" scoped>
  .search_container{
    margin-bottom: 20px;
  }
  .btnRight{
    float: right;
    margin-right: 0px !important;
  }
  .searchArea{
    background:rgba(255,255,255,1);
    border-radius:2px;
    padding: 18px 18px 0;
  }
</style>
