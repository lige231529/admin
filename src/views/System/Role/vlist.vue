
<template>
  <div class="table-bg">
      <el-table :data="rolelist" border row-key="id">
          <!-- row-key  行数据的key ,必填项 -->
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
          <el-table-column label="状态">
              <template slot-scope="scope">
                  <el-button :type="scope.row.status==1?'success':'danger'" size="small"> {{scope.row.status==1?'正常':'禁用'}}</el-button>
              </template>
          </el-table-column>
          <el-table-column  label="操作">
              <template slot-scope="scope">
                  <el-button type="primary" @click="edit(scope.row)" size="small" icon="el-icon-edit"></el-button>
                  <el-button type="danger" @click="del(scope.row.id)" size="small" icon="el-icon-delete"></el-button>
              </template>
          </el-table-column>

      </el-table>
      
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import {delRole} from "@/request/role"

export default {
  components: {},
  data() {
    return {
    };
  },

  methods: {
    ...mapActions({
        get_role_list:"role/get_role_list"
    }),
    edit(val){
        this.$emit("edit",{...val})
    },
     async del(id){
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delRole(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_role_list(); // 重新获取列表！
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(()=>{})
        }
  },
  computed:{
    //   读取小仓库数据，渲染列表
      ...mapGetters({
          rolelist:"role/rolelist"
      })

         
  },
  created() {},

  mounted() {
      
    //   列表不为空，才能请求数据，去渲染，否则遍历的是Null,会报错
      if(!this.rolelist.length){
          this.get_role_list()
      }
  },
};
</script>

<style scoped>

</style>

