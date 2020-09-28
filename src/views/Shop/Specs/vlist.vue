
<template>
  <div class="table-bg">
    <el-table :data="specslist" border row-key="id">
      <!-- row-key  行数据的key ,必填项 -->
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="specsname" label="规格" align="center"></el-table-column>
      <el-table-column prop="specsname"   label="规格值" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
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
          <el-button type="danger" @click="del(scope.row.id)" size="small" icon="el-icon-delete"></el-button>
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import { delSpecs } from "@/request/specs";

export default {
  components: {},
  data() {
    return {};
  },
 computed: {
    //   读取小仓库数据，渲染列表
    ...mapGetters({
      specslist: "specs/specslist",
      size: "specs/size",
      page: "specs/page",
      total: "specs/total"
    })
  },
  methods: {
    ...mapMutations({
      SET_PAGE: "specs/SET_PAGE"
    }),
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
      set_size: "specs/set_size",
      set_page: "specs/set_page"
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
          let res = await delSpecs(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_specs_list(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
 
  created() {},

  mounted() {
    //   列表不为空，才能请求数据，去渲染，否则遍历的是Null,会报错
    if (!this.specslist.length) {
      this.get_specs_list();
    }
    // console.log(this.total);
  
    
    
  },

};
</script>

<style scoped>
</style>

