<template>
  <div class="fillcontain" ref="fillcontain">
    <div class="info_container" ref="info_container">
      <el-row class="info_row row" :gutter="10">
        <el-col :span="8" :offset="8">
          <div class="area">
            <div class="pwdarea">
              <p class="title">个人信息</p>
              <el-form class="form" label-width="100px">
                <el-form-item label="证件号:" prop="number">
                  {{number}}
                </el-form-item>
                <el-form-item label="姓名:" prop="name">
                  {{name}}
                </el-form-item>
                <el-form-item label="职务:" prop="job">
                  {{job}}
                </el-form-item>
                <el-form-item label="军衔:" prop="level">
                  {{level}}
                </el-form-item>
                <el-form-item label="年龄:" prop="age">
                {{age}}
                </el-form-item>
                <el-form-item label="身高:" prop="height">
                {{height}}
                </el-form-item>
                <el-form-item label="体重:" prop="weight">
                {{weight}}
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import * as mutils from '@/utils/mUtils'
  import { getPersonalInfo } from "@/api/info";

  export default {
    data(){
      return {
        number: '',
        name: '',
        job: '',
        level: '',
        age: '',
        height: '',
        weight: '',
      };


    },
    created(){

    },
    mounted() {
      this.getPersonalInfo()
    },
    methods: {
      showMessage(type,message){
        this.$message({
          type: type,
          message: message
        });
      },
      getPersonalInfo(){
        getPersonalInfo().then(res => {
          this.number = res.data.number;
          this.name = res.data.name;
          this.job = res.data.job;
          this.level = res.data.level;
          this.age = res.data.age;
          this.height = res.data.height;
          this.weight = res.data.weight;
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .info_container{
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
    overflow: auto;
  }
  .title{
    text-align:center;
    width:100%;
    height:30px;
    line-height:30px;
    cursor: pointer;
    background-color: #3bc5ff;
    border:1px solid #3bc5ff;
    color: white;
    display: block;
  }
  .info_row{
    .area{
      border:1px solid #dfdfdf;
      height:100%;
      font-size:14px;
      padding:10px;
      .form{
        width:90%;
        margin-top:20px;
      }
    }
  }
</style>


