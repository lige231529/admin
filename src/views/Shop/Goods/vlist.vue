<template>
  <div class="table-bg">
      <el-table :data="goodslist" border row-key="id">
          <el-table-column  label="ID" align="center" prop="id" width="40"></el-table-column>
          <el-table-column  label="一级分类名" align="center" prop="firstcatename"></el-table-column>
          <el-table-column  label="二级分类名" align="center" prop="secondcatename"></el-table-column>
          <el-table-column  label="商品名称" align="center" prop="goodsname"></el-table-column>
         <el-table-column label="商品图片" width="140px">
            <template slot-scope="scope">
               <img :src="scope.row.img | pixImg" alt="" style="width:80px" v-if="scope.row.img">
               <span v-else style="width:80px">暂无图片</span>
            </template>
        </el-table-column>
        <el-table-column label="规格名" align="center">            
              <template slot-scope="scope">
                    <el-tag v-for="(item,index) in specslist" :key="index" v-if="item.id==scope.row.specsid" type="success">
                      {{ item.specsname }}
                    </el-tag>                
              </template>
          </el-table-column>
          <el-table-column label="规格值" align="center">
              <template slot-scope="scope">
                  <!-- {{typeof scope.row.specsattr}} -->
                  <!-- {{ scope.row.specsattr.split(',')}} -->
                  <el-tag v-for="(item,index) in scope.row.specsattr" :key="index"  type="success">{{item}}</el-tag>
              </template>
          </el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column label="是否热卖">
              <template slot-scope="scope">
                   <el-switch v-model="scope.row.ishot" :active-value="1" :inactive-value="2"></el-switch>
              </template>
          </el-table-column>
          <el-table-column label="是否新品">
              <template slot-scope="scope">
                   <el-switch v-model="scope.row.isnew" :active-value="1" :inactive-value="2"></el-switch>
              </template>
          </el-table-column>
          
          <el-table-column label="状态">
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
       <el-pagination
      background
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      
  </div>
</template>

<script>
import {mapGetters,mapActions,mapMutations} from "vuex"
import {delGoods} from "@/request/goods"

export default {
  components: {},
  data() {
    return {
    };
  },
 computed:{
    //   读取小仓库数据，渲染列表
      ...mapGetters({
          goodslist:"goods/goodslist",
          specslist:"specs/specslist",
          size:"goods/size",
          page:"goods/page",
          total:"goods/total"
      })       
  },
  methods: {
      ...mapMutations({
          SET_PAGE:"goods/SET_PAGE"
      }),
    ...mapActions({
        get_goods_list:"goods/get_goods_list",
        get_specs_list:"specs/get_specs_list",
        set_size: "goods/set_size",
        set_page: "goods/set_page",
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
                let res = await delGoods(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_goods_list(); // 重新获取列表！
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(()=>{})
        }
  },
 
  created() {},

  mounted() {
    //   列表不为空，才能请求数据，去渲染，否则遍历的是Null,会报错
      if(!this.goodslist.length){
          this.get_goods_list()
      }    
      if(!this.specslist.length){
          this.get_specs_list()
      }   
  },
};
</script>

<style scoped>

</style>
