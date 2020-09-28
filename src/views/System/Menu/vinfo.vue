<template>
  <div>
    <!-- el-dialog 对话框   visible.sync控制是否显示   -->
    <el-dialog :title="info.isAdd?'添加':'修改'" :visible.sync="info.isShow" width="30%" @close="cancel">
      <!-- model表单的数据对象 -->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <!-- el-form-item label属性代表标签文本 -->
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <!-- el-radio中label的属性代表value -->
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级目录" v-if="form.type==2">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
              v-for="item in menulist"
              v-if="item.type==1"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="form.type==1?'目录名称':'菜单名称'" prop="title">
          <el-input v-model="form.title" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="图标" >
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址" v-if="form.type==2" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
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
import { addMenu, editMenu, delMenu } from "@/request/menu";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  title: "",
  icon: "",
  type: 1, // 1目录2菜单
  url: "",
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
      //   dialogVisible: false
      form: { ...defaultItem },
       rules:{  // 验证规则对象！
                title:[{required:true,message:"必填！",trigger:'blur'}],
                icon:[{required:true,message:"必填！",trigger:'blur'}],
                url:[{required:true,message:"必填！",trigger:'blur'}]
            }
    };
  },
  computed: {
    // 第三步：读取数据，渲染
    ...mapGetters({
      menulist: "menu/menulist"
    })
  },
  mounted() {
    // 第二步：调用获取数据方法
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  methods: {
    // 第一步：得到获取数据方法
    ...mapActions({
      get_menu_list: "menu/get_menu_list"
    }),
      // 在list页面点击编辑的时候，触发index组件的自定义事件，
    //  这个自定义事件中，
    // 通过组件的ref属性，调用弹框组件的数据回显事件
    setinfo(val){
    
      
      defaultItem={...val}
      this.form = {...val}
    },
    async submit() {
      // 表单的验证函数
      this.$refs.form.validate(async valid=>{
         if(valid){
           let res;
           if(this.info.isAdd){
             res=await addMenu(this.form)
           }else{
             res =await editMenu(this.form)
           }
           if(res.code==200){
             this.$message.success(res.msg) //提示成功的信息
             this.info.isShow=false; //关闭弹框
             this.get_menu_list();//重新渲染列表
             this.cancel() //清空

           }else{
             this.$message.error(res.msg)
           }
      }
      })
    },
    cancel(){
      this.form = {...resetItem}
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
