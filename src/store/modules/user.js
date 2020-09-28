// 获取菜单列表
import { getUser, getTotal, Login } from "@/request/user"
import {Message} from 'element-ui'
import router from "@/router"
// 要使用的用户信息，要从
let userinfo = localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')):{}

export default {
    namespaced: true,
    state: {
       userlist:[],  // 角色列表
       page:1,//这个初始值默认显示第一页
       size:2,  
       total:0,  //总条数
       userinfo: userinfo,
    },
    getters: {
        // 想要在页面中使用它，处理一下，方便获取
        userlist: state => state.userlist,
        page:state=>state.page,
        size:state=>state.size,
        total: state => state.total,
        menus:state=>state.userinfo.menus,

        menus_url: state => state.userinfo.menus_url,
        username: state => state.userinfo.username
    },
    mutations: {
        // 数据会发生变化，写修改函数
        SET_LIST(state,data){
            state.userlist = data;
        },
       SET_PAGE(state,data){
           state.page = data
       },
       SET_SIZE(state,data){
           state.size = data
       },
       
        SET_TOTAL(state, data) {
            state.total = data;
        },
        SET_USERINFO(state,data){
            //  localStorage.setItem('cs',123)
            // 存到本地存储中，实现数据持久化
            localStorage.setItem("userinfo",JSON.stringify(data))
            // 存在vuex中，方便其它组件直接获取数据
            state.userinfo = data
        },
        // 退出登录
        QUIT(state){
            localStorage.removeItem('userinfo');
            state.userinfo = {};
            router.push("/login")    
        }
    },
    actions: {
        // 请求菜单列表的数据，每次获取列表都要请求一次总条数（增删都要）
        async get_user_list({commit,state,dispatch}){
            let res = await getUser(state.page,state.size);  
            commit('SET_LIST',res)
            // actions中自己调用自己的
            dispatch('get_user_total')
        },
        // 获取管理员总人数
        async get_user_total({commit}){
                let res =await getTotal(); //得到总数，给仓库保存
                commit( "SET_TOTAL",res)
        },
        set_page({ commit,dispatch }, data){
            commit('SET_PAGE',data)
            // 页面变化，还是大小发生变化，也都要重新请求列表渲染
            dispatch('get_user_list')
        },
        set_size({ commit, dispatch},data){
            commit('SET_SIZE', data)
            dispatch('get_user_list')
        },

        async login({commit},data){
            
            let res = await Login(data)
            
            
            if(res.code==200){ //如果登录成功
                
                commit("SET_USERINFO",res.list)  //res.list 是用户信息
                Message.success("登录成功")
                router.push("/")
            }else{
                Message.error("用户名或密码错误")
            }
        },
        // 退出登录后，清空打开的标签
        quit({commit}){
            commit('tagview/DEL_ALL',null,{root:true})
            commit('QUIT')
        }
    }
};