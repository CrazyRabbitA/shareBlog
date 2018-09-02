import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: '',
  isLogin: false,
  informId: '',
  iconUrl: '',
  dearName:'',

}
const getters = {}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  ifLogin (state, status) {
    state.isLogin = status
  },
  getId (state, id) {
    state.informId = id
  },
  saveUrl (state, url) {
    state.iconUrl = url
  },
  setDearName(state,dearName){
    state.dearName=dearName
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
