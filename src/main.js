// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import AV from 'leancloud-storage'
import store from './store'
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  methods: {
    initCloud () {
      var APP_ID = 'lIOSaHbGMrwivUfk7oA71mbq-gzGzoHsz'
      var APP_KEY = 'TVwM6ShEIdXnfhJYr7mN8Rmv'
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      })
  
    }
  },
  created () {
    this.initCloud()
    console.dir(this.$store)
  }
})
