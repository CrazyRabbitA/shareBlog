import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: null,
  isLogin: false,
  informId: '',
  iconUrl: ''
}
const getters = {}

const mutations = {
  setUser (state, payload) {
    state.user = payload.user
  },
  ifLogin (state, payload) {
    state.isLogin = payload.status
  },
  getId (state, id) {
    state.informId = id
  },
  saveUrl (state, url) {
    state.iconUrl = url
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
