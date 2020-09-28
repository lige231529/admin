<template>
  <!-- 弹框 -->
  <el-dialog
    :title="info.isAdd ? '添加角色':'修改角色'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          default-expand-all
          node-key="id"
          ref="tree"
          :data="menulist"
          show-checkbox
          :props="{children:'children',label:'title'}"
          :check-strictly="checkStrictly"
        >
          <!-- checkStrictly 严格遵循不关联，默认false,关联 -->
        </el-tree>
      </el-form-item>
      <el-form-item label="角色状态">
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
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  rolename: "",
  menus: "",
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
      rules: {
        // 验证规则对象
        rolename: [{ required: true, message: "必填！", trigger: "blur" }]
      },
      checkStrictly: false
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist"
    })
  },
  created() {},
  mounted() {
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list: "role/get_role_list"
    }),
    submit() {
      // 获取树形控件的节点
      let idArr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (idArr.length) {
        this.forminfo.menus = idArr;
      } else {
        this.$message.warning("请选择权限");
        return;
      }
      // 表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await addRole(this.forminfo);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_role_list(); // 重新获取角色列表！
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    // X号，全部置空
    cancel() {
      this.$refs.tree.setCheckedKeys([]);
      this.forminfo = { ...resetItem };
    },
    // 重置
    reset(){
            if(this.info.isAdd){ // 添加时候的重置！
                this.forminfo = {...resetItem}
                this.$refs.tree.setCheckedKeys([])
            }else{ // 修改时候的重置！
                this.setinfo({...defaultItem})
            } 
        },
    setinfo(val) {
      // console.log(val);
      let idArr = val.menus.split(","); //将权限节点回显到树中

      // 由于提交角色的时候，提交了父节点，所以回显时有父节点的子节点都会被选中
      // 所以数据回显的时候先设置一下父子不关联
      if (idArr) {
        this.checkStrictly = true;
        // 等节点加载完再赋值
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idArr);//把得到的节点数组给树
          this.checkStrictly = false; // 提交的时候，再父子关联
        });
      }
      defaultItem = { ...val };
      this.forminfo = { ...val };
    }
  }
};
</script>

<style scoped>
</style>
