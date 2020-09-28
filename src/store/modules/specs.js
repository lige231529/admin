// specs小仓库
import { getSpecs,getTotal,  } from "@/request/specs"
export default {
    namespaced: true,
    state: {
        specslist: [],
        page:1,//这个初始值默认显示第一页
        size:2,  
        total:0,  //总条数
    },
    getters: {
        specslist: state => state.specslist,
        page:state=>state.page,
        size:state=>state.size,
        total: state => state.total,
    },
    mutations: {
        SET_LIST(state, data) {
            state.specslist = data         
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
    },
    actions: {
        // 请求数据,getMenu是真正的axios请求
        async get_specs_list({ commit,state,dispatch }) {
            let res = await getSpecs(state.size,state.page);
            commit("SET_LIST",res)
            dispatch("get_specs_total")
           
            
           if(!res){
            res=[]
           }  
 
        },
        
        set_page({ commit,dispatch }, data){
            commit('SET_PAGE',data)
            // 页面变化，还是大小发生变化，也都要重新请求列表渲染
            dispatch('get_specs_list')
        },
        set_size({ commit, dispatch},data){
            commit('SET_SIZE', data)
            dispatch('get_specs_list')
        },
        async get_specs_total({commit,dispatch}){   
            let res =await getTotal(); //得到总数，给仓库保存
            commit("SET_TOTAL",res)
       },
    },
}
