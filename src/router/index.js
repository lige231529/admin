import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"

Vue.use(Router)

// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let router =  new Router({
  routes: [
    {
      path: '/login',
      component:()=>import("@/views/Login"),
      meta:{title:"登录"}
    },
    {
      path: '/',
      component:()=>import("@/views/Layout"),
      meta:{title:"布局页面"},
      redirect:"/index",
      children:[
        // 如果原生做面包屑的话，这些嵌套路由，要监听$route的变化
        {
          path: '/index',
          component:()=>import("@/views/Index"),
          meta:{title:"后台页面"},
        },
        {
          path: '/menu',
          component: () => import("@/views/System/Menu"),
          meta: { title: "菜单管理" }
        },
        {
          path: '/role',
          component: () => import("@/views/System/Role"),
          meta: { title: "角色管理" }
        },
        {
          path: '/user',
          component: () => import("@/views/System/User"),
          meta: { title: "管理员管理" }
        },
        {
          path:"/banner",
          component:()=>import("@/views/Shop/Banner"),
          meta:{title:"轮播图管理"}
        },
        {
          path:"/category",
          component:()=>import("@/views/Shop/Category"),
          meta:{title:"分类管理"}
        },
        {
          path:"/goods",
          component:()=>import("@/views/Shop/Goods"),
          meta:{title:"商品管理"}
        },
        {
          path:"/member",
          component:()=>import("@/views/Shop/Member"),
          meta:{title:"会员管理"}
        },
        {
          path:"/seckill",
          component:()=>import("@/views/Shop/Seckill"),
          meta:{title:"秒杀管理"}
        },
        {
          path:"/specs",
          component:()=>import("@/views/Shop/Specs"),
          meta:{title:"规格管理"}
        },

      ]
    },

  ]
})
router.beforeEach((to,from,next)=>{
  // 除了登录页面以外，所有的页面都要登录拦截
  document.title = to.meta.title; //设置标题
  if(to.path=="/login"){ 
    next()
  }else{
    if(localStorage.getItem("userinfo")){ //登录了
      let whiteList = store.getters["user/menus_url"];//地址池
      whiteList.push("/index")
      if(whiteList.includes(to.path)){     //权限访问
        next()
      }
    }else{ 
      next("/login")
    }
  }
  // 
  next();
})
export default router;