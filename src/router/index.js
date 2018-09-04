import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login/Login'
import Index from '@/pages/Index/Index'
import Create from '@/pages/Create/Create'
import Register from '@/pages/Register/Register'
import Icon from '@/pages/Icon/Icon'
import Myartical from '@/pages/Myartical/Myartical'
import Edit from '@/pages/Edit/Edit'
import Artical from '@/pages/Artical/Artical'
import Otherspace from '@/pages/Otherspace/Otherspace'
import Main from '@/pages/Main/Main'

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
      path: '/register',
      component: Register
    },
    {
      path: '/icon',
      component: Icon
    },
    {
      path: '/main',
      component: Main
    },
    {
      path: '/create',
      component: Create
    },
    {
      path: '/myartical',
      component: Myartical
    },
    {
      path: '/edit',
      component: Edit
    },
    {
      path: '/artical',
      component: Artical
    },
    {
      path: '/otherspace',
      component: Otherspace
    }
  ]
})
