export default {
    state:{
        show:'this is testings'
    },
    getters:{//$store.getters.not_show， 类似computed
        not_show(state){//这里的state对应着上面这个state
            return !state.show;
        }
    },
    mutations:{//mutations里的操作必须是同步的,  $store.commit('switch_dialog')
        switch_dialog(state){//这里的state对应着上面这个state
            state.show = state.show?false:true;
            //你还可以在这里执行其他的操作改变state
        }
    },
    actions:{//$store.dispatch('switch_dialog'),异步操作
        switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('switch_dialog');
            //你还可以在这里触发其他的mutations方法
        },
    }
}