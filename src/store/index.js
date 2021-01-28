import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        token: ''
      },
      mutations: {
          SET_token: (state, token )=>{
              state.token = token
              localStorage.setItem("itstoken", token);
          },
          CLEAR: state => {
            state.token = [];
            localStorage.removeItem("itstoken");
          },
          LOAD: state => {
            state.token = localStorage.getItem("itstoken");
          }
      },
      actions: {
      },
      getters: {
        token (state) {
          return state.token
        }
      }
})