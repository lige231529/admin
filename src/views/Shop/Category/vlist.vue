<template>
  <div class="table-bg">
      <el-table :data="catelist" border row-key="id" :tree-props="{children:'children'}">
          <el-table-column  label="ID" align="center" prop="id"></el-table-column>
          <el-table-column  label="分类名称" align="center"  prop="catename"></el-table-column>
        <el-table-column label="分类图片" width="140px">
            <template slot-scope="scope">
               <img :src="scope.row.img | pixImg" alt="" style="width:80px" v-if="scope.row.img">
               <span v-else style="width:80px">暂无图片</span>
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
import {delCate} from "@/request/cate"

export default {
  components: {},
  data() {
    return {
    };
  },

  methods: {
    ...mapActions({
        get_cate_list:"cate/get_cate_list"
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
                let res = await delCate(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_cate_list(); // 重新获取列表！
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(()=>{})
        }
  },
  computed:{
    //   读取小仓库数据，渲染列表
      ...mapGetters({
          catelist:"cate/catelist"
      })

         
  },
  created() {},

  mounted() {
    //   列表不为空，才能请求数据，去渲染，否则遍历的是Null,会报错
      if(!this.catelist.length){
          this.get_cate_list()
      }    
  },
};
</script>

<style scoped>

</style>
