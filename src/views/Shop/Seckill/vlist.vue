<template>
  <el-table :data="secklist" border row-key="id">
    <el-table-column prop="title" label="活动名称" align="center"></el-table-column>
    <el-table-column prop="begintime" label="开始时间" align="center">
      <template slot-scope="scope">
       {{scope.row.begintime | getTime}}
      </template>
    </el-table-column>
    <el-table-column prop="endtime" label="结束时间" align="center">
      <template slot-scope="scope">
       {{scope.row.endtime | getTime}}
      </template>
    </el-table-column>
    <el-table-column prop="goodsid" label="商品名称" align="center">
      <template slot-scope="scope">
        <el-tag v-for="(item,index) in goodslist" :key="index"
        v-if="scope.row.goodsid==item.id"
        >
        {{item.goodsname}}
        </el-tag>
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
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {getSeck,editSeck,delSeck} from "@/request/seck"


export default {
  components: {},
  data() {
    return {
        secklist:[]
    };
  },
  computed:{
      ...mapGetters({
          goodslist:"goods/goodslist",
         
      })
  },
  methods: {
      ...mapActions({
          get_goods_list:"goods/get_goods_list",
         
      }),
      async get_list(){
            let res = await getSeck()
            this.secklist = res
      },
      edit(val){
        //   console.log(val);
          this.$emit("edit",val)      
      },  
   async del(id){
       this.$confirm("确认删除吗?",'提示',{
           confirmButtonText: '确定',
        cancelButtonText: '取消', 
        type: 'warning' 
       }).then(async ()=>{
           let res  =await delSeck(id);
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
    // 页面一进入获取，渲染
    this.get_list()
      if(!this.goodslist.length){
          this.get_goods_list()
      }

  },
};
</script>

<style scoped>
</style>
