import Vue from 'vue'
import Vuex from 'vuex'
import { modulesFiles } from '@/utils/function.js'
import getters from './getters'
Vue.use(Vuex)

// 引入模块
const modules = modulesFiles(require.context('./modules', true, /\.js$/));
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules,
    getters
})
