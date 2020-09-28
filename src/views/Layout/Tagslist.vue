<template>
  <div class="tagslist">
    <el-scrollbar class="scroll-bar">
      <el-tag
        v-for="(tag,index) in taglist"
        :key="tag.path"
        closable
        :type="isActive(tag.path) ? 'danger':'info'"
        :disable-transitions="true"
        @close="handleClose(tag.path,index)"
      >
        <router-link :to="tag.path">{{tag.name}}</router-link>
      </el-tag>
    </el-scrollbar>
    <el-dropdown size="small" split-button type="primary" class="right">
      标签操作
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="DEL_OTHER_ALL($route.fullPath)">关闭其他</el-dropdown-item>
        <el-dropdown-item @click.native="DEL_ALL">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      tags: []
    };
  },
  computed: {
    ...mapGetters({
      taglist: "tagview/taglist"
    })
  },
  methods: {
    ...mapMutations({
      SET_TAGS: "tagview/SET_TAGS",
      DEL_TAG: "tagview/DEL_TAG",
      DEL_ALL: "tagview/DEL_ALL",
      DEL_OTHER_ALL: "tagview/DEL_OTHER_ALL"
    }),
    // 激活样式的方法
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 删除某个标签的方法
    handleClose(path, index) {
      //path用来判断是否为激活标签，index用于删除标签（标签数组）
      // 1 分为 删除激活标签+不是激活的标签
      if (!(path === this.$route.fullPath)) {
        //未激活
        this.DEL_TAG({ index });
      } else {
        //激活
        this.DEL_TAG({ index, isActive: true });
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newval) {
        // console.log(newval);  // 当前地址信息,加入标签数组
        this.SET_TAGS(newval);
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.tagslist {
  margin-bottom: 5px;
  box-shadow: 0 0 3px 0px #ccc;
  padding: 3px;
  position: relative;
 background-color: #fff;
}
a {
  text-decoration: none;
  font-size: 12px;
}
.right {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
