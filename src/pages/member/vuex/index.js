//使用vuex 
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Address from  'js/addressService.js'
//创建store实例
const store = new Vuex.Store({
    state:{//类似data 不可以直接修改
        lists: null
    },
    mutations:{//仅仅同步 不异步，更改状态的唯一方法
        init(state,lists){//第一个参数一定是state
            state.lists = lists 
        },
        add(state,instance){
            state.lists.push(instance)
        },
        remove(state,id){
            let lists = state.lists
            let index = lists.findIndex(item=>{
                return item.id === id
            })
            lists.splice(index,1)
        },
        update(state,instance){
            let lists = state.lists
            let index = lists.findIndex(item=>{
                return item.id === instance.id
            })
            lists[index]=instance
        },
        setDefault(state,id){
            let lists = state.lists
            lists.forEach(item => {
                if(item.id===id){
                    item.isDefault  = true
                }
            });
        }
    },
    actions:{//异步
        getLists({commit}){//解构
           Address.list().then(res=>{
               commit('init',res.data.lists)
           }) 
        },
        addAction({commit},instance){
            Address.add(instance).then(res=>{
                instance.id = parseInt(Math.random()*10000) 
                commit('add',instance)
            })
        },
        removeAction({commit},id){
            Address.remove(id).then(res=>{
                commit('remove',id)
            })
        },
        updateAction({commit},instance){
            Address.update(instance).then(res=>{
                commit('update',instance)
            })
        },
        setDefaultAction({commit},id){
            Address.setDefault(id).then(res=>{
                commit('setDefault',id)
            })
        }
    }
})
export default store 