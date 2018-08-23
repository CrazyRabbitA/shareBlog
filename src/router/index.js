import Vue from 'vue'
import Router from 'vue-router'

import Elementui from '../pages/Elementui.vue'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path:'#/ui',
      components:{
        Elementui,
      }
    }
  ]
})
