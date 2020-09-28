<template>
  <div>
    <!-- el-dialog 对话框   visible.sync控制是否显示   -->
    <el-dialog :title="info.isAdd?'添加':'修改'" :visible.sync="info.isShow" width="30%" @close="cancel">
      <!-- model表单的数据对象 -->
      <el-form ref="form" :model="forminfo" label-width="80px" :rules="rules">
        <!-- el-form-item label属性代表标签文本 -->
        <el-form-item label="上级分类">
          <el-select v-model="forminfo.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="分类名称" prop="catename">
            <el-input v-model="forminfo.catename" placeholder="请输入分类名"></el-input>
        </el-form-item>
        <el-form-item>
        <!-- 1 action图片单独先传的时候，上传的地址
             2 auto-upload 自动上传
             3 list-type="picture-card"  显示形式
             4  :on-remove=""
             5 :on-exceed=""
             6 :file-list=""
             7 :on-preview="see"
             8 :append-to-body="true"
             9  :on-change="change" 文件状态改变时
             10 :on-romove="remove"
         -->
          <el-upload
            action=""
            :auto-upload="false"
            list-type="picture-card"
            :limit="1"
            :on-preview="see"
            :append-to-body="true"
            :on-change="change"
            :file-list="filelist"
           >
           <i slot="default" class="el-icon-plus"></i>
         
          </el-upload>
          <!-- 图片放大预览 -->
          <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 弹框的打开，及打开添加，还是打开编辑，由Index中的添加按钮和编辑按钮决定，所以要父传子数据
import { addCate, editCate, delCate } from "@/request/cate";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  catename: "",
  img:"",
  status: 1 // 状态1正常2禁用
};
let resetItem = { ...defaultItem }; //自始至终都是空的，用清空
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: false,
          isShow: false
        };
      }
    }
  },
  components: {},
  data() {
    return {
       
      forminfo: { ...defaultItem },
       rules:{  // 验证规则对象
                catename:[{required:true,message:"必填！",trigger:'blur'}],
            },
       dialogImageUrl:"",
       dialogVisible: false,
       filelist: []   //[{name:"",url:""}]

    };
  },
  computed: {
    // 第三步：读取数据，渲染
    ...mapGetters({
      catelist: "cate/catelist"
    })
  },
  mounted() {
    // 第二步：调用获取数据方法
    if (!this.catelist.length) {
      this.get_cate_list();
    }
  },
  methods: {
    // 点击文件列表中已上传的文件时的钩子（点击+放大预览时触发）
    see(file){
      // console.log(file);
      this.dialogVisible = true,  //打开预览弹框
      this.dialogImageUrl = file.url//js生成的预览地址
      
    },
    change(file,fileList){
      // console.log(file); 单个文件对象
      // console.log(fileList); 多个文件对象组成的数组
      this.forminfo.img = file.raw  //原生文件的信息  
    },
    remove(file,fileList){
      this.forminfo.img=""
    },
    // 第一步：得到获取数据方法
    ...mapActions({
      get_cate_list: "cate/get_cate_list"
    }),
      // 在list页面点击编辑的时候，触发index组件的自定义事件，
    //  这个自定义事件中，
    // 通过组件的ref属性，调用弹框组件的数据回显事件
    setinfo(val){
      if(val.img){
        this.filelist  =[{
          name:val.catename,
          url:this.$host+val.img
        }]
      }
      // 修改时，如果是顶级分类不用提交children字段，
     val.children ? delete val.children:''
      
      defaultItem={...val}
      this.forminfo = {...val}
    },
    async submit() {
      // 表单的验证函数
      this.$refs.form.validate(async valid=>{
         if(valid){
           let res;
           let fd = new FormData()
           for(let k in this.forminfo){
             fd.append(k,this.forminfo[k])
           }
           if(this.info.isAdd){
             res=await addCate(fd)
           }else{
             res =await editCate(fd)
           }
           if(res.code==200){
             this.$message.success(res.msg) //提示成功的信息
             this.info.isShow=false; //关闭弹框
             this.get_cate_list();//重新渲染列表
             this.cancel() //清空

           }else{
             this.$message.error(res.msg)
           }
      }
      })
    },
    cancel(){
      this.forminfo = {...resetItem}
      this.filelist=[]
    },
    reset(){
      if(this.info.isAdd){
        this.cancel()
      }else{
        this.setinfo({...defaultItem})
      }
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
