<template>
  <div>
    <!-- el-dialog 对话框   visible.sync控制是否显示   -->
    <el-dialog
      :title="info.isAdd?'添加':'修改'"
      :visible.sync="info.isShow"
      width="60%"
      @close="cancel"
    >
      <!-- model表单的数据对象 -->
      <el-form ref="form" :model="forminfo" label-width="80px" :rules="rules" style="width:100%">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 第一个tab切换项 -->
          <el-tab-pane label="基本信息" name="first">
            <el-row>
              <el-col :span="12" :offset="5">
                <el-form-item label="一级分类">
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
                  <el-select v-model="forminfo.second_cateid" placeholder="请选择">
                    <el-option
                      v-for="item in secondlist"
                      :key="item.id"
                      :label="item.catename"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="goodsname">
                  <el-input v-model="forminfo.goodsname" placeholder="请输入分类名"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                  <el-input v-model="forminfo.price" placeholder="请输入商品价格"></el-input>
                </el-form-item>
                <el-form-item label="市场价格" prop="market_price">
                  <el-input v-model="forminfo.market_price" placeholder="请输入市场价格"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                  <!-- :append-to-body="true" -->
                  <el-upload
                    action
                    :auto-upload="false"
                    list-type="picture-card"
                    :limit="1"
                    :on-preview="see"
                    :on-change="change"
                    :file-list="filelist"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                  </el-upload>
                  <!-- 图片放大预览 -->
                  <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item label="商品规格">
                  <el-select v-model="forminfo.specsid" @change="specsChange" placeholder="请选择">
                    <el-option
                      v-for="item in specslist"
                      :key="item.id"
                      :label="item.specsname"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
               <el-form-item label="属性值">
                      <el-select v-model="forminfo.specsattr" multiple placeholder="请选择">
                          <el-option  v-for="item in attrslist" :key="item" :label="item"  :value="item">
                          </el-option>
                      </el-select>
               </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 第二个tab切换项 -->
          <el-tab-pane label="详情描述" name="second">
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否新品">
                  <el-switch v-model="forminfo.isnew" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否热卖">
                  <el-switch v-model="forminfo.ishot" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态">
                  <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="商品描述">
                  <vue-wangeditor id="editor" ref="wangeditor" width="100%" height="400"></vue-wangeditor>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-row>
          <el-col :span="4">
            <el-form-item label width="300px">
              <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label width="300px">
              <el-button type="warning" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- el-form-item label属性代表标签文本 -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import vueWangeditor from "vue-wangeditor";
// 弹框的打开，及打开添加，还是打开编辑，由Index中的添加按钮和编辑按钮决定，所以要父传子数据
import { addGoods, editGoods, delGoods } from "@/request/goods";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  first_cateid: "",
  second_cateid: "",
  goodsname: "",
  price: "",
  market_price: "",
  goodsname: "",
  img: "", //文件
  description: "",
  specsid: "",
  specsattr: [],
  isnew: 0, //1表示新品
  ishot: 0, //1表示热卖
  status: 1 // 状态1正常2禁用
};
let resetItem = { ...defaultItem }; //自始至终都是空的，用清空
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: false,
          isShow: false
        };
      }
    }
  },
  components: { vueWangeditor },
  data() {
    return {
      activeName: "first", //tab切换默认显示第一个
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象
        goodsname: [{ required: true, message: "必填！", trigger: "blur" }]
      },
      dialogImageUrl: "",
      dialogVisible: false,
      filelist: [], //[{name:"",url:""}]  商品名称，商品图片
      secondlist: [], //二级分类
      attrslist: [] //规格值表
    };
  },
  computed: {
    // 第三步：读取数据，渲染
    ...mapGetters({
      specslist: "specs/specslist", //用于商品规格
      catelist: "cate/catelist" //用于一级分类
    })
  },
  mounted() {
    // console.log(this.forminfo);

    // 第二步：调用获取数据方法
    if (!this.specslist.length) {
      this.get_specs_list();
    }
    if (!this.catelist.length) {
      this.get_cate_list();
      // 异步请求，不能立即获得，但是能得到数据，模板更新的时候渲染成功
      // console.log(this.catelist);
    }
  },
  methods: {
    // 分类二级联动
    topChange(id) {
      //  console.log(id);//一级分类的id，找到对应的的children
      this.forminfo.second_cateid = "";
      this.secondlist = [];
      this.catelist.forEach(val => {
        if (val.id==id) {
          this.secondlist = val.children;
        }
      });
      
    },
    // 这个id不用传入，规格change发生变化时，自动传入的
      specsChange(id){  // 规格名发生变化
            this.attrslist = [];
            this.forminfo.specsattr = [];
            this.specslist.forEach(val=>{
                if(val.id==id){
                    this.attrslist = val.attrs;
                }
            })
        },
    // tab切换上面的方法
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 点击文件列表中已上传的文件时的钩子（点击+放大预览时触发）
    see(file) {
      // console.log(file);
      (this.dialogVisible = true), //打开预览弹框
        (this.dialogImageUrl = file.url); //js生成的预览地址
    },
    change(file, fileList) {
      // console.log(file); 单个文件对象
      // console.log(fileList); 多个文件对象组成的数组
      this.forminfo.img = file.raw; //原生文件的信息
    },
    remove(file, fileList) {
      this.forminfo.img = "";
    },
    // 第一步：得到获取数据方法
    ...mapActions({
      get_specs_list: "specs/get_specs_list",
      get_cate_list: "cate/get_cate_list",
      get_goods_list: "goods/get_goods_list"
    }),
    // 在list页面点击编辑的时候，触发index组件的自定义事件，
    //  这个自定义事件中，
    // 通过组件的ref属性，调用弹框组件的数据回显事件
    setinfo(val) {
      if (val.img) {
        this.filelist = [
          {
            name: val.goodsname,
            url: this.$host + val.img
          }
        ];
      }
      // 修改时，如果是顶级分类不用提交children字段，
      val.children ? delete val.children : "";
      this.topChange(val.first_cateid);
      this.specsChange(val.specsid);

      "firstcatename" in val ? delete val.firstcatename : "";
      "secondcatename" in val ? delete val.secondcatename : "";
      this.$nextTick(() => {
        // 传入编辑器内容
        this.$refs.wangeditor.setHtml(val.description);
      });
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async submit() {
      // 表单的验证函数
      this.forminfo.description = this.$refs.wangeditor.getHtml(); //获取编辑器的内容
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res;
          let fd = new FormData();
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          if (this.info.isAdd) {
            res = await addGoods(fd);
          } else {
            res = await editGoods(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示成功的信息
            this.info.isShow = false; //关闭弹框
            this.get_goods_list(); //重新渲染列表
            this.cancel(); //清空
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    cancel() {
      this.forminfo = { ...resetItem };
      this.filelist = [];
      this.$refs.wangeditor.setHtml('')
    },
    reset() {
      if (this.info.isAdd) {
        this.cancel();
      } else {
        this.setinfo({ ...defaultItem });
      }
    }
  },
  created() {}
};
</script>

<style scoped>
</style>
