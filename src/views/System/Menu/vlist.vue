<template>
  <div class="table-bg">
      <el-table :data="menulist" border row-key="id" :tree-props="{children:'children'}">
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="title" label="菜单名称" align="center"></el-table-column>
          <el-table-column prop="url" label="菜单地址" align="center"></el-table-column>
          <el-table-column  label="图标" align="center">
              <template slot-scope="scope">
                  <!-- 图标绑定是class名称（动态绑定） -->
                 <i :class="scope.row.icon"></i>
              </template>
          </el-table-column>
          <el-table-column label="类型">
              <template slot-scope="scope">
                  
                  <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
                  <el-tag type="warning"  v-else>菜单</el-tag>
              </template>
          </el-table-column>
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
import {delMenu} from "@/request/menu"

export default {
  components: {},
  data() {
    return {
    };
  },

  methods: {
    ...mapActions({
        get_menu_list:"menu/get_menu_list"
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
                let res = await delMenu(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_menu_list(); // 重新获取列表！
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(()=>{})
        }
  },
  computed:{
    //   读取小仓库数据，渲染列表
      ...mapGetters({
          menulist:"menu/menulist"
      })

         
  },
  created() {},

  mounted() {
    //   列表不为空，才能请求数据，去渲染，否则遍历的是Null,会报错
      if(!this.menulist.length){
          this.get_menu_list()
      }    
  },
};
</script>

<style scoped>

</style>
