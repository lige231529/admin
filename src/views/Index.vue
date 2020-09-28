<template>
  <div>
<h1>欢迎页面</h1>
<!-- 第三步：创建一个容器 -->
<div id="main" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
// 第一步，安装，第二步引入：引入echarts
import echarts from 'echarts'
export default {
  components: {},
  data() {
    return {

    };
  },
  methods: {

  },
  created() {},
  mounted() {
     var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
            series : [
                {
                    name: '访问来源',
                    type: 'pie',    // 设置图表类型为饼图
                    radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                    data:[          // 数据数组，name 为数据项名称，value 为数据项值
                        {value:235, name:'视频广告'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ]
                }
            ]
        })
  } 
};
</script>

<style scoped>

</style>
