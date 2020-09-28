// goods小仓库
import { getGoods,getTotal, getinfo } from "@/request/goods"
export default {
    namespaced: true,
    state: {
        goodslist: [],
        page:1,//这个初始值默认显示第一页
        size:10,  
        total:0,  //总条数
      
    },
    getters: {
        goodslist: state => state.goodslist,
        page:state=>state.page,
        size:state=>state.size,
        total: state => state.total,
       
    },
    mutations: {
        SET_LIST(state, data) {
            state.goodslist = data         
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
        async get_goods_list({ commit,state,dispatch }) {
            let res = await getGoods(state.size,state.page);
            res.forEach(val => {
                val.specsattr = val.specsattr ? val.specsattr.split(",") : []
                })
            commit("SET_LIST",res)
            dispatch("get_goods_total")
           if(!res){
            res=[]
           }  
        //    console.log(res);
           
        },
        
        set_page({ commit,dispatch }, data){
            commit('SET_PAGE',data)
            // 页面变化，还是大小发生变化，也都要重新请求列表渲染
            dispatch('get_goods_list')
        },
        set_size({ commit, dispatch},data){
            commit('SET_SIZE', data)
            dispatch('get_goods_list')
        },
        async get_goods_total({commit}){   
            let res =await getTotal(); //得到总数，给仓库保存
            commit("SET_TOTAL",res)
            // dispatch('get_goods_total')
       },
    },
}
