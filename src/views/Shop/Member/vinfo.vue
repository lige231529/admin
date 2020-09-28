<template>
  <el-dialog :title="info.isAdd ?'会员添加':'会员修改'" :visible.sync="info.isShow" width="40%">
    <el-form ref="form" :model="forminfo" :rules="rules" label-width="80px" >
      <el-form-item label="会员昵称"  prop="nickname">
        <el-input v-model="forminfo.nickname" readonly></el-input>
      </el-form-item>  
      <el-form-item label="手机号" prop="phone">
        <el-input readonly v-model="forminfo.phone" ></el-input>
      </el-form-item> 
      <el-form-item label="密码">
        <el-input v-model="forminfo.password"  :placeholder="info.isAdd ? '请输入密码':'留白表示不修改'"></el-input>
      </el-form-item> 
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即{{info.isAdd?'添加':'修改'}}</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {editMember,getMember} from "@/request/member"

let defaultItem = {
  uid: "",
  nickname: "",
  phone: "",
  password: ""
  // status:1
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: show
        };
      }
    }
  },
  components: {},
  data() {
    return {
      forminfo: {...defaultItem},
       rules:{  // 验证规则对象
                nickname:[{required:true,message:"必填！",trigger:'blur'}],
                phone:[{required:true,message:"必填！",trigger:'blur'}],
            }
    };
  },
  methods: {
  
    // 数据回显，将数据付给defaultItem,赋给forminfo
    setinfo(val){
        // console.log(val);
        
        val.password="",//回显的时候密码不显示
        defaultItem={...val},
        this.forminfo = {...val}
    },
    cancel(){
        this.forminfo = {...resetItem}
    },
    reset(){
        this.forminfo  = {...defaultItem}
    },
     onSubmit() {
      this.$refs.form.validate(async (valid) => {
          if (valid) {
              let res =await editMember(this.forminfo)
            //   console.log(res);
              
              
            alert('submit!');
            if(res.code==200){
                  this.$message.success(res.msg);
                  this.info.isShow =false;
                  this.$emit.updata() //触发自己的自定义事件，通知父组件index
                //   11111111取消

              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
</style>
