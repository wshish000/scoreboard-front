<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="addScoreDialog.title"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
    @close="closeDialog">
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="form_rules"
        :label-width="dialog.formLabelWidth"
        style="margin:10px;width:auto;">
        <el-form-item prop='week' label="第几周:">
          <el-input v-model.number="form.week"></el-input>
        </el-form-item>
        <el-form-item prop='name' label="姓名:">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop='situp' label="仰卧起坐:">
          <el-input v-model.number="form.situp"></el-input>
        </el-form-item>
        <el-form-item prop='pullup'  label="引起向上:">
          <el-input v-model.number="form.pullup"></el-input>
        </el-form-item>
        <el-form-item prop='longrun_min'  label="3000米/分钟:">
          <el-input v-model.number="form.longrun_min" placeholder="分"></el-input>
        </el-form-item>
        <el-form-item prop="longrun_sec" label="3000米/秒钟:">
          <el-input v-model.number="form.longrun_sec" placeholder="秒"></el-input>
        </el-form-item>
        <el-form-item prop='retrace'  label="30米*2:">
          <el-input type="number" v-model.number="form.retrace"></el-input>
        </el-form-item>
        <el-form-item prop='remark' label="备注:">
          <el-input type="text" v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item  class="text_right">
          <el-button @click="isVisible = false">取 消</el-button>
          <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
        </el-form-item>

      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { addScore,updateScore } from "@/api/score";

  export default {
    name:'addScoreDialogs',
    data(){
      let validateData = (rule, value, callback) => {
        if(value === ''){
          let text;
          if(rule.field == "week"){
            text='周';
          }else if(rule.field == "situp"){
            text='仰卧起坐';
          }else if(rule.field == 'pullup'){
            text='引起向上';
          }else if(rule.field == 'longrun_min'){
            text='分';
          }else if(rule.field == 'longrun_sec'){
            text='秒';
          }else if(rule.field == 'retrace'){
            text='30米*2';
          }
          callback(new Error(text+'不能为空~'));
        }else{
          let numReg = /^[0-9]+.?[0-9]*$/;
          if(!numReg.test(value)){
            callback(new Error('请输入正数值'));
          }else{
            callback();
          }
        }
      };
      return {
        isVisible: this.isShow,
        form:{
          week:'',
          name:'',
          situp:'',
          pullup: '',
          longrun_min: '',
          longrun_sec:'',
          longrun: '',
          retrace:'',
          remark:''
        },
        form_rules: {
          name   : [
            {required: true, message : '姓名不能为空！',trigger : 'blur'}
          ],
          situp   : [
            { required: true, validator:validateData,trigger: 'blur'}
          ],
          pullup   : [
            { required: true, validator:validateData,trigger: 'blur'}
          ],
          longrun_min   : [
            { required: true, validator:validateData,trigger: 'blur'}
          ],
          longrun_sec   : [
            { required: true, validator:validateData,trigger: 'blur'}
          ],
          retrace   : [
            { required: true, validator:validateData,trigger: 'blur'}
          ]
        },
        //详情弹框信息
        dialog: {
          width:'400px',
          formLabelWidth:'120px'
        }
      }
    },
    props:{
      isShow:Boolean,
      dialogRow:Object
    },
    computed:{
      ...mapGetters(['addScoreDialog']),
    },
    created(){
      // this.form.longrun_min = Math.floor(parseInt(this.form.longrun)/60)
    },
    mounted(){
      if(this.addScoreDialog.type === 'edit'){
        this.form = this.dialogRow;

      }else{
        this.$nextTick(() => {
          this.$refs['form'].resetFields()
        })
      }
    },
    methods:{
      closeDialog(){
        this.$emit('closeDialog');
      },
      //表单提交
      onSubmit(form){
        this.$refs[form].validate((valid) => {
          if (valid) {//表单数据验证完成之后，提交数据;
            let formData = this[form];
            const para = Object.assign({}, formData);
            // edit
            if(this.addScoreDialog.type === 'edit'){
              updateScore(para).then(res => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$refs['form'].resetFields()
                this.isVisible = false
                this.$emit('getScoreList');
              })
            }else{
              // add
              addScore(para).then(res => {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.$refs['form'].resetFields()
                this.isVisible = false
                this.$emit('getScoreList');
              })
            }
          }
        })
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
