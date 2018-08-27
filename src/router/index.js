import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/Index/template.vue'
import Login from '@/pages/Login/Login'
import Index from '@/pages/Index/Index'
// import Detail from '@/pages/Detail/template.vue'
// import Edit from '@/pages/Edit/template.vue'
import Create from '@/pages/Create/Create'
import Register from '@/pages/Register/register'
import Icon from '@/pages/Icon/Icon'
// import User from '@/pages/User/template.vue'
// import My from '@/pages/My/template.vue'
// import App from '../App'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/register',
      component: Register
    },
    {
      path:'/icon',
      component:Icon,

    },
    {
      path:'/create',
      component:Create,
    }
 
  ]
})
