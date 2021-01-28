import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        me: []
      },
      mutations: {
          SET_ME: (state, mearray )=>{
              state.me = mearray
              localStorage.setItem("itsMe", mearray);
          },
          CLEAR: state => {
            state.me = [];
            localStorage.removeItem("itsMe");
          },
          LOAD: state => {
            state.me = localStorage.getItem("itsMe");
          }
      },
      actions: {
      },
      getters: {
        me (state) {
          return state.me
        }
      }
})