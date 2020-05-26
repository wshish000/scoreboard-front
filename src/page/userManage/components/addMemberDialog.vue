<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="addMemberDialog.title"
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
        <el-form-item prop='number' label="证件号:">
          <el-input type="text" v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item prop='name' label="姓名:">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop='job' label="职务:">
          <el-input type="text" v-model="form.job"></el-input>
        </el-form-item>
        <el-form-item prop='level' label="军衔:" >
          <el-select v-model="form.level" placeholder="军衔">
            <el-option
              v-for="item in levelType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop='age'  label="年龄:">
          <el-input v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item prop='height'  label="身高:">
          <el-input v-model.number="form.height"></el-input>
        </el-form-item>
        <el-form-item prop='weight'  label="体重:">
          <el-input v-model.number="form.weight"></el-input>
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
  import { addMember,updateMember } from "@/api/info";
  import AreaJson from "@/assets/datas/area.json" //以后需要输入籍贯时使用

  export default {
    name:'addMemberDialogs',
    data(){
      let validateData = (rule, value, callback) => {
        if(value === ''){
          let text;
          if(rule.field == "age"){
            text='年龄';
          }else if(rule.field == "height"){
            text='身高';
          }else if(rule.field == 'weight'){
            text='体重';
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
        areaData:[],
        isVisible: this.isShow,
        form:{
          number:'',
          name:'',
          job:'',
          level: '',
          age: '',
          height:'',
          weight:''
        },
        levelType:[
          {label:'列兵',value:'0'},
          {label:'上等兵',value:'1'},
          {label:'下士',value:'2'},
          {label:'中士',value:'3'},
          {label:'上士',value:'4'},
          {label:'少尉',value:'5'},
          {label:'中尉',value:'6'},
          {label:'上尉',value:'7'},
          {label:'少校',value:'8'}
        ],
        form_rules: {
          number:[
            { required: true, message: '证件号不能为空', trigger: 'change' }
          ],
          name   : [
            {required: true, message : '姓名不能为空！',trigger : 'blur'}
          ],
          job:[
            { required: true, message: '职务不能为空', trigger: 'change' }
          ],
          level:[
            { required: true, message: '请选择军衔', trigger: 'change' }
          ],
          age   : [
            { required: true, validator:validateData,trigger: 'blur'}
          ],
          height   : [
            { required: true, validator:validateData,trigger: 'blur'}
          ],
          weight   : [
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
      ...mapGetters(['addMemberDialog']),
    },
    created(){
      this.areaData = AreaJson
    },
    mounted(){
      if(this.addMemberDialog.type === 'edit'){
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
            if(this.addMemberDialog.type === 'edit'){
              updateMember(para).then(res => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$refs['form'].resetFields()
                this.isVisible = false
                this.$emit('getMemberList');
              })
            }else{
              // add
              addMember(para).then(res => {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.$refs['form'].resetFields()
                this.isVisible = false
                this.$emit('getMemberList');
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
