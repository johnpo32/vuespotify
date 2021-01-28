import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/Login'
import Home from '@/components/Home'
import callback from '@/components/callback'

Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'login', component: login },
        { path: '/login', name: 'login2', component: login },
        { path: '/home', name: 'home', component: Home },
        { path: '/callback', name: 'callback', component: callback },
      ]
})