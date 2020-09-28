<template>
  <div class="table-bg">
      <!--stripe 是否为斑马纹，默认为false  -->
     <el-table :data="bannerlist" border row-key="id">
         <el-table-column  label="轮播图名称" align="center" prop="title" width="200"></el-table-column>
     
       <el-table-column label="商品图片" width="200px">
            <template slot-scope="scope">
               <img :src="scope.row.img | pixImg" alt="" style="width:80px" v-if="scope.row.img">
               <span v-else style="width:80px">暂无图片</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" width="200px">
              <template slot-scope="scope">
                  <el-button :type="scope.row.status==1?'success':'danger'" size="small"> {{scope.row.status==1?'正常':'禁用'}}</el-button>
              </template>
          </el-table-column> 
           <el-table-column  label="操作" width="150">
              <template slot-scope="scope">
                  <el-button type="primary" @click="edit(scope.row)" size="small" icon="el-icon-edit"></el-button>
                  <el-button type="danger" @click="del(scope.row.id)" size="small" icon="el-icon-delete"></el-button>
              </template>
          </el-table-column>  
      </el-table>
  </div>
</template>

<script>
import {delBanner,getBanner} from "@/request/banner"

export default {
  components: {},
  data() {
    return {
        bannerlist:[]
    };
   
  },
  methods: {
      async get_list(){
            let res = await getBanner()
            this.bannerlist = res
      },
      edit(val){      
         this.$emit("edit",val)
      },
     async del(id){
         this.$confirm("确认删除吗?","提示",{
               confirmButtonText: '确定',
                cancelButtonText: '取消', 
                type: 'warning'
         }).then(async ()=>{
             let res  =await delBanner(id);
             if(res.code==200){
                 this.$message.success(res.msg)
                 this.get_list()
             }else{
                 this.$message.error(res.msg)
             }
         }).catch(()=>{})
      }
  },
  created() {},
  mounted() {
     this.get_list()
  },
};
</script>

<style scoped>

</style>
