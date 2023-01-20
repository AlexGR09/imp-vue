import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    clearToken (state) {
      state.token = null
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    clearToken ({commit}) {
      commit('clearToken')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.token != null
    }
  }
})
