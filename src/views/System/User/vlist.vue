<template>
  <div class="table-bg">
    <el-table :data="userlist" border row-key="id">
      <!-- row-key  行数据的key ,必填项 -->
      <el-table-column prop="uid" label="ID" align="center" width="320px"></el-table-column>
      <el-table-column prop="username" label="管理员姓名" align="center"></el-table-column>
      <el-table-column prop="rolename" label="管理员角色" align="center"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status==1?'success':'danger'"
            size="small"
          >{{scope.row.status==1?'正常':'禁用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)" size="small" icon="el-icon-edit"></el-button>
          <el-button type="danger" @click="del(scope.row.uid)" size="small" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
      
    </el-table>
      <!-- 分页器 -->
        <el-pagination
          background
          @size-change="set_size"
          @current-change="set_page"
          :current-page="page"
          :page-sizes="[2,3,4]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
     
  </div>
</template>

<script>
import { mapGetters, mapActions,mutations, mapMutations} from "vuex";
import { delUser } from "@/request/user";

export default {
  components: {},
  data() {
    return {};
  },

  methods: {
      ...mapMutations({
          SET_SIZE:"user/SET_SIZE",
          SET_PAGE:"user/SET_PAGE",

      }),
    ...mapActions({
      get_user_list: "user/get_user_list",
      set_size: "user/set_size",
      set_page: "user/set_page"
    }),
    edit(val) {
      this.$emit("edit", { ...val });
    },
    async del(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await delUser(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 如果当前页只有一条数据且不是第一页
            if(this.userlist.length==1 && this.page!=1){      
                this.SET_PAGE(this.page-1)
            }
            this.get_user_list(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
    // 获取数据总条数，去请求层写请求

    // 当size发生变化时
    // handleSizeChange(val) {
    //     console.log(val);
        
    // },
    // 当page发生变化时
    // handleCurrentChange(val) {
    //     console.log(val);
        
    // }
  },
  computed: {
    //   读取小仓库数据，渲染列表
    ...mapGetters({
      userlist: "user/userlist",
      size: "user/size",
      page: "user/page",
      total:"user/total"
    })
  },
  created() {},

  mounted() {
    //   列表不为空，才能请求数据，去渲染，否则遍历的是Null,会报错
    if (!this.userlist.length) {
      this.get_user_list();
    }
  }
};
</script>

<style scoped>
</style>
