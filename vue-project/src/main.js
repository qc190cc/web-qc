import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.css'
import 'amfe-flexible'
import '@/permission' // permission control
Vue.config.productionTip = false
Vue.use({
    install: function() {
        const Methods = {
            mixintest: () => {
                console.log('mixin')
            }
        };
        Vue.mixin({
            methods: Methods
        });
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
