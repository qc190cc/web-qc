import { setMutations, setGetters } from '@/utils/function.js';

const state = {
    device: 'desktop'
}
const getters = {};
const mutations = {};
Object.assign(getters, setGetters(state));
Object.assign(mutations, setMutations(state));
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
