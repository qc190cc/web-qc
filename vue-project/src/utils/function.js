export const modulesFiles = (files) => {
    return files.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
        const value = files(modulePath)
        if (value.default) {
            modules[moduleName] = value.default
        }
        return modules
    }, {});
}
export const setComponent = (data = {}, modules = []) => {
    if (data.path && modules[data.path]) {
        data.component = modules[data.path];
    }
    if (data.children && data.children.length) {
        data.children.forEach(child => {
            setComponent(child, modules)
        })
    }
}
// set vuex getters
export const setGetters = (state = {}) => {
    const getters = {};
    for (const key in state) {
        getters[key] = (state) => state[key];
    }
    return getters;
}
// set vuex mutations
export const setMutations = (state = {}) => {
    const mutations = {};
    for (const key in state) {
        mutations[`SET_${key.toUpperCase()}`] = (state, data) => { state[key] = data };
    }
    return mutations;
}
