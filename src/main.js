import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { store } from './store'
import router from './router'
// materializeCss
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  store, router
}).$mount('#app')
