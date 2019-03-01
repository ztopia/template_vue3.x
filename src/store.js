import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import testModules from './store/test'

export default new Vuex.Store({
  modules:{
    test:testModules //$store.state.test.show
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
