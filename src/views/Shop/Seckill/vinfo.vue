<template>
  <div>
    <el-dialog
      :title="info.isAdd?'添加':'修改'"
      :visible.sync="info.isShow"
      width="60%"
      @close="cancel"
    >
      <el-form ref="form" :rules="rules" :model="forminfo" label-width="80px">
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="forminfo.title"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select v-model="forminfo.first_cateid" @change="topChange" placeholder="请选择">
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="forminfo.second_cateid" placeholder="请选择" @change="secondChange">
            <el-option
              v-for="item in secondlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsid">
          <el-select v-model="forminfo.goodsid" placeholder="请选择" ref="gname">
            <el-option
              v-for="item in newgoods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {addSeck,editSeck,getSeck} from "@/request/seck"
let defaultItem = {
  title: "", //限时秒杀名称
  begintime: "", //开始时间(时间戳)
  endtime: "", //结束时间
  first_cateid: "", //商品一级分类编号
  second_cateid: "", //商品二级分类编号
  goodsid: "", //商品编号
  status: "", //状态1正常2禁用
  
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      defalut() {
        return {
          isAdd: false,
          isShow: false
        };
      }
    }
  },

  components: {},
  data() {
    return {
      forminfo: { ...defaultItem},
      secondlist: [],
      newgoods: [], //三级数据
      // namelist:[],
      rules: {
        // 验证规则对象
        title: [{ required: true, message: "必填！", trigger: "blur" }],
        first_cateid: [{ required: true, message: "必填！", trigger: "blur" }],
        second_cateid: [{ required: true, message: "必填！", trigger: "blur" }],
        goodsid: [{ required: true, message: "必填！", trigger: "blur" }]
      },
      // value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      time:[]
    };
  },
  computed: {
    ...mapGetters({
      catelist: "cate/catelist",
      goodslist: "goods/goodslist",
      // secklist:"seck/secklist"
    })
  },
  methods: {
    ...mapActions({
      get_cate_list: "cate/get_cate_list",
      get_goods_list: "goods/get_goods_list",
      // get_seck_list: "seck/get_seck_list"
    }),
    topChange(id) {
       this.forminfo.second_cateid=""
       this.secondlist=[]
      this.catelist.forEach(val => {
        if (val.id == id) {
          this.secondlist = val.children;
        }
      });
      
    },
    secondChange(id) {   
        this.newgoods=[]
        this.newgoods = this.goodslist.filter(item => {   
        return item.second_cateid == id;
      });
     
    },
    cancel() {
      this.forminfo = {...resetItem };
      this.time=[]
    },
    setinfo(val){
      this.forminfo ={...val}
      defaultItem ={...val}
      this.time =[new Date(val.begintime*1),new Date(val.endtime*1)]
      // this.topChange(val.first_cateid)//二级分类名回显,由于这个函数里面有置空操作，不能回显了
       this.catelist.forEach(v => {
        if (v.id == val.first_cateid) {
          this.secondlist = v.children;
        }
      });
      this.secondChange(val.second_cateid)  //商品名称回显   
    },
    reset() {   
      if(this.info.isAdd){
        this.cancel()
      }else{
        this.setinfo({...defaultItem}) 
      }
    },
    onSubmit() {
      if(!this.time.length){
        this.$message.warning("请选择活动时间")
        return;
      }
      this.forminfo.begintime = this.time[0].getTime();
      this.forminfo.endtime = this.time[1].getTime();

      this.$refs.form.validate(async valid => {
        if (valid) {
          let res;
          // console.log(this.forminfo);
          
          if (this.info.isAdd) {
            res = await addSeck(this.forminfo);
          } else {
            res = await editSeck(this.forminfo);
           
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示成功的信息
            this.info.isShow = false; //关闭弹框
            this.$parent.update();  //重新渲染列表
            // this.get_seck_list(); //重新渲染列表
            this.cancel(); //清空
          }else{
              this.$message.error(res.msg)
          }
        }
      });
    }
  },
  created() {},
  mounted() {
    if (!this.catelist.length) {
      this.get_cate_list();
    }
    if (!this.goodslist.length) {
      this.get_goods_list();
    }
  }
};
</script>

<style scoped>
</style>
