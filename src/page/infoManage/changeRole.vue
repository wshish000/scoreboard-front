<template>
  <div class="fillcontain" ref="fillcontain">
    <div class="info_container" ref="info_container">
      <el-row class="info_row row" :gutter="10">
        <el-col :span="8" :offset="8">
          <div class="area">
            <div class="pwdarea">
              <p class="title">权限管理</p>
              <el-form class="form"  :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px">
                <el-form-item label="姓名" prop="name">
                  <el-input type="" v-model="pwdForm.name" auto-complete="off" size="mini" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                  <el-select v-model="pwdForm.role" placeholder="请输入角色">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
<!--                  <el-input type="password" v-model="pwdForm.newpassword" auto-complete="off" size="mini" placeholder="请输入新密码"></el-input>-->
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
                  <el-button @click="resetForm('pwdForm')">重置</el-button>
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
  import { changeRole } from "@/api/info";

  export default {
    data(){
      // 附带callback(),是在明确通过验证的情况下去掉输入框上的loading

      // validateField:对部分表单字段进行校验的方法

      return {
        options: [{
          value: '1',
          label: '普通战士'
        }, {
          value: '2',
          label: '成绩录入员'
        }, {
          value: '3',
          label: '核查员'
        }, {
          value: '4',
          label: '超级管理员'
        }],
        value: '',
        pwdForm:{
          name:'',
          role:'1',
        },
        pwdRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
        },
      };


    },
    created(){

    },
    mounted() {
      // mutils.setContentHeight(this,this.$refs.fillcontain,170);
    },
    methods: {
      showMessage(type,message){
        this.$message({
          type: type,
          message: message
        });
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(formName == 'pwdForm'){
              let formData = this[formName];
              const para = Object.assign({}, formData);
              changeRole(para).then(res => this.showMessage('success','修改权限成功'));
            }
            //保存修改的相关信息
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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


