import { setMutations, setGetters } from '@/utils/function.js';

const state = {
    count: 1,
    count2: 2
};
const getters = {};
const mutations = {};
Object.assign(getters, setGetters(state));
Object.assign(mutations, setMutations(state));
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
