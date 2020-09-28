<template>
  <el-dialog
    :title="info.isAdd?'添加轮播图':'修改轮播图'"
    :visible.sync="info.isShow"
    width="50%"
    @close="cancel"
  >
    <el-form ref="form" :model="forminfo" label-width="100px" style="100%" :rules="rules">
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入轮播图名称"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" prop="img">
        <!-- :append-to-body="true" -->
        <el-upload
          action
          :auto-upload="false"
          list-type="picture-card"
          :limit="1"
          :file-list="filelist"
          :on-preview="see"
          :on-change="change"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <!-- 图片放大预览 -->
        <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="forminfo.status" :label="1">正常</el-radio>
        <el-radio v-model="forminfo.status" :label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label width="300px">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {addBanner,editBanner} from '@/request/banner';
let defaultItem = {
//   id: "",
  title: "",
  img: "",
  status: 1
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: flase,
          isShow: false
        };
      }
    }
  },
  components: {},
  data() {
    return {
      forminfo: { ...defaultItem },
      dialogVisible: false, //预览图片的对话框默认不显示，点击预览的时候再显示
      dialogImageUrl: "", //预览图片
      filelist: [] ,//上传的文件列表 [{name:"banner1.jpg",url:""}]
      rules:{
          title:[{required: true, message: "必填！", trigger: "blur"}],
          img:[{required: true, message: "必选！", trigger: "blur"}]
      }
    };
  },
  methods: {
    //  图片状态改变时，触发的钩子
    change(file) {
      //  console.log(file);
      this.forminfo.img = file.raw;
    },
    //   图片预览触发的钩子
    see(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
  async onSubmit(){
      this.$refs.form.validate(async valid=>{
          if(valid){
              let res; //这里的res只是用来判断是否添加或编辑成功
              let fd = new FormData();
              for(let k in this.forminfo){
                  fd.append(k,this.forminfo[k])
              }
              if(this.info.isAdd){
                  res = await addBanner(fd)   
              }else{
                  res = await editBanner(fd)
              }
              if(res.code==200){
                //   添加或修改成功后要做四件事
                  this.$message(res.msg) // 1 给用户一个回应
                  this.info.isShow = false;//2 关闭对话           
                  this.$parent.update() //3 重新渲染列表
                  this.cancel()//4 将对话框置空
              }else{
                  this.$message.error(res.msg)
              }
          }
      })
    },
    reset(){
        if(this.info.isAdd){
            this.cancel()
        }else{
            this.forminfo = {...defaultItem}
        }
    },
    cancel() {
        this.forminfo  ={...resetItem}
        this.filelist = []
    },
    setinfo(val){
      // console.log(val);
      this.forminfo = {...val}
    //  forminfo中的图片路径时没处理的，所以显示不出来，要单独处理
    if(val.img){
      this.filelist=[
        {
          name:val.title,
          url:this.$host+val.img
        }
      ]
    }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
</style>
