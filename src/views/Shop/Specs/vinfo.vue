<template>
  <!-- 弹框 -->
  <el-dialog
    :title="info.isAdd ? '添加规格':'修改规格'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="规格名" prop="specsname">
        <el-input v-model="forminfo.specsname" placeholder="请输入规格名"></el-input>
      </el-form-item>
      <el-form-item >
         <el-button type="primary" @click="addAttr">添加规格</el-button>
      </el-form-item>
      
      <el-form-item label="规格值">
        <label v-for="(item,index) in list" :key="index">
         
          <el-input v-model="item.value"  placeholder="请输入规格值"  style="display:inline-block;width:160px;margin-bottom:10px;"></el-input>
          
          <!-- <el-button type="primary" v-if="index==0" @click="addAttr">添加规格</el-button> -->
          <el-button type="danger" @click="delAttr(index)">删除规格</el-button>
        </label>
      </el-form-item>
      <el-form-item label="规格状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addSpecs, editSpecs } from "@/request/specs";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  specsname: "",
  attrs: "", //提交的类型为字符串，形如: 值1,值2,值3
  status: 1 // 状态1正常2禁用
};
let resetItem = { ...defaultItem };

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false
        };
      }
    }
  },
  components: {},
  data() {
    return {
      forminfo: { ...defaultItem },
      list:[{value:""}],  //所有规格组成的数组
      rules: {
        // 验证规则对象
        specsname: [{ required: true, message: "必填！", trigger: "blur" }]
      },

    };
  },
  computed: {
    ...mapGetters({
      specslist: "specs/specslist"
    })
  },
  created() {},
  mounted() {
    if (!this.specslist.length) {
      this.get_specs_list();
    }
  },
  methods: {
    addAttr(){
        this.list.push({value:""})
    },
    delAttr(idx){
      this.list.splice(idx,1)
    },
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
      get_specs_list: "specs/get_specs_list"
    }),
    submit() {
      // 每个规格栏中不能为空，为空时，提示
      if(!this.list.every(val=>val.value)){
        this.$message.warning("规格值不能为空")
        return;//为空时，直接阻止提交
      }
      // 填完时，把各规格值提取出来
      this.forminfo.attrs = this.list.map(val=>val.value)
      this.forminfo.attrs=this.forminfo.attrs.join(",")
      console.log(this.forminfo.attrs);
      
      // 表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await addSpecs(this.forminfo);
          } else {
            res = await editSpecs(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_specs_list(); // 重新获取规格列表！
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    // X号，全部置空
    cancel() {
      this.forminfo = { ...resetItem };
      this.list  = [{value:""}]
    },
    // 重置
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.forminfo = { ...resetItem };
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    // 点击编辑时，数据回显
    setinfo(val) {
      // console.log(val);
    this.list = val.attrs.map(v=>({value:v})) 
      defaultItem = { ...val };
      this.forminfo = { ...val };
    }
  }
};
</script>

<style scoped>
</style>
