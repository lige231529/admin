// menu 小仓库的数据，保存在这里，导入获取数据的方法
import { getMenu } from "@/request/menu"
export default {
    namespaced: true,//命名空间！！！！这才会实现真正的模块独立
    state: {
        menulist: []
    },
    getters: {
        // 小模块中的state数据获取时麻烦，所以放在getters里，读取方便
        menulist: state => state.menulist

    },
    mutations: {
        SET_LIST(state, data) {
            state.menulist = data
        }
    },
    actions: {
        // 请求数据,getMenu是真正的axios请求
        async get_menu_list({ commit }) {
            let res = await getMenu()
            // 异步等到数据请求，然后调用mutations中的同步函数，把参数传过去，修改menulist
            commit("SET_LIST", res)
        }
    },

}
