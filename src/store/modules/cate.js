// cate 小仓库的数据，保存在这里，导入获取数据的方法
import { getCate } from "@/request/cate"
export default {
    namespaced: true,//命名空间！！！！这才会实现真正的模块独立
    state: {
        catelist: [],
      
    },
    getters: {
        // 小模块中的state数据获取时麻烦，所以放在getters里，读取方便
        catelist: state => state.catelist,


    },
    mutations: {
        SET_LIST(state, data) {
            state.catelist = data
        },
       
    },
    actions: {
        // 请求数据,getCate是真正的axios请求
        async get_cate_list({ commit }) {
            let res = await getCate()
            
            // 异步等到数据请求，然后调用mutations中的同步函数，把参数传过去，修改catelist
            commit("SET_LIST", res)
        },
    },

}
