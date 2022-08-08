import Vue from 'vue'
import Vuex from 'vuex'

import state from './states.js'
import getters from './getters.js'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})