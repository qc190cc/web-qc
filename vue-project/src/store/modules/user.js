import user from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';
import { setMutations, setGetters } from '@/utils/function.js';

const state = {
    token: getToken(),
    name: '',
    avatar: ''
}
const getters = {};
const mutations = {};
Object.assign(getters, setGetters(state));
Object.assign(mutations, setMutations(state));

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            user.login({ username: username.trim(), password }).then(response => {
                const { data } = response;
                commit('SET_TOKEN', data.token);
                setToken(data.token);
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            user.logout(state.token).then(() => {
                commit('SET_TOKEN', '');
                removeToken();
                resetRouter();
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

