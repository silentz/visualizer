import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VModal)

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
