import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: '',
  password:'',
  isLogin: false,
  informId: '',
  iconUrl: '',
  dearName:'',

}
const getters = {}

const mutations = {
  setUser (state, payload) {
    state.user = payload.user
    state.password=payload.password
  },
  ifLogin (state, payload) {
    state.isLogin = payload.status
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
