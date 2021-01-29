import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    // auth para varias rutas
    token: '',
    // aUHT propio
    isAuth: false,
    id:""
  },
  mutations: {
    // se guardan las mutaciones
    SET_token: (state, token) => {
      state.token = token
      localStorage.setItem('itstoken', token)
    },
    SET_ID: (state, token) => {
      state.id = token
      localStorage.setItem('isid', token)
    },
    SET_AUTH: (state, bol) => {
      state.isAuth = bol
      localStorage.setItem('itsAuth', bol)
    },
    CLEAR: (state) => {
      state.token = ''
      state.isAuth = false
      state.id = ''
      localStorage.removeItem('itstoken')
      localStorage.removeItem('itsAuth')
      localStorage.removeItem('isid')
    },
    LOAD: (state) => {
      state.token = localStorage.getItem('itstoken')
      state.isAuth = localStorage.getItem('itsAuth')
      state.id = localStorage.getItem('isid')
    },
  },
  actions: {},
  getters: {
    token(state) {
      return state.token
    },
    auth(state) {
      return state.isAuth
    },
    id(state) {
      return state.id
    },
  },
})
