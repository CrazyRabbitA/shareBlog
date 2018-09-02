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
Vue.filter('formatTime',function(str){
  var lastDate=new Date(str)
      var newDate=new Date()
      var interval=newDate.getTime()-lastDate.getTime()
      if(interval/1000<30){
        return '刚刚'
      }
      else if(interval/1000<60){
        return parseInt(interval/1000)+'秒前'
      }
      else if(interval/60000<60){
        return parseInt(interval/60000)+'分钟前'
      }
      else if(interval/3600000<24){
        return parseInt(interval/3600000)+'小时前'
      }
      else if(interval/3600000<24){
        return parseInt(interval/3600000)+'小时前'
      }
      else if(interval/86400000<31){
        return parseInt(interval/86400000)+'天前'
      }
      else if(interval/2592000000<12){
        return parseInt(interval/2592000000)+'个月前'
      }
      else{
        return '一年前'
      }
})