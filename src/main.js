import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'

import Vum from './vum.js'

// demos
import Index from './demos/Index'
import Login from './demos/Login'
import Register from './demos/Register'
import Foundpassword from './demos/Foundpassword'
import Selfcenter from './demos/Selfcenter'
import Reservation from './demos/Reservation'
import Settingtel from './demos/Settingtel'
import Feedback from './demos/Feedback'
import Comment from './demos/Comment'

import Allcommentitem from './demos/Allcommentitem'
import Articlein from './demos/Articlein'
import Articleknow from './demos/Articleknow'
import ProductDetails from './demos/ProductDetails'

import Home from './demos/Home'
import Information from './demos/Information'
import Me from './demos/Me'

Vue.config.debug = true

Vue.use(Router)
Vue.use(Vum)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {keepAlive: true}
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {keepAlive: true}
    },
    {
      path: '/me',
      name: 'me',
      component:Me,
      meta: {keepAlive: false}
    },
    {
      path: '/information',
      name: 'information',
      component: Information,
      meta: {keepAlive: true}
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title:"登录",keepAlive: false}
    },
    {
      path: '/register',
      name: 'register',
      
      component: Register,
      meta: {title:"注册",keepAlive: false}
    },
    {
      path: '/foundpassword',
      name: 'foundpassword',
     
      component: Foundpassword,
      meta: { title:"找回密码",keepAlive: false}
    },
    {
      path: '/selfcenter',
      name: 'selfcenter',
      
      component: Selfcenter,
      meta: {title:"个人中心",keepAlive: false}
    },
    {
      path: '/settingtel',
      name: 'settingtel',
      
      component: Settingtel,
      meta: {title:"设置手机号",keepAlive: false}
    },
    {
      path: '/reservation',
      name: 'reservation',
    
      component: Reservation,
      meta: {  title:"预约服务",keepAlive: false}
    },
    {
      path: '/feedback',
      name: 'feedback',
      
      component: Feedback,
      meta: {title:"意见反馈",keepAlive: false}
    },
    {
      path: '/comment',
      name: 'comment',
    
      component: Comment,
      meta: {  title:"文章详情",keepAlive: false}
    },
    {
      path: '/allcommentitem',
      name: 'allcommentitem',
     
      component: Allcommentitem,
      meta: { title:"全部评论",keepAlive: false}
    },
    {
      path: '/articlein',
      name: 'articlein',
      component: Articlein,
      meta: { title:"保险知识",keepAlive: true}
    },
    {
      path: '/articleknow',
      name: 'articleknow',
      component: Articleknow,
      meta: {title:"肝病基本知识",keepAlive: true}
    },
    {
      path: '/productDetails',
      name: 'productDetails',
      
      component: ProductDetails,
      meta: {title:"产品详情",keepAlive: false}
    }

  ]
})

new Vue({
  router
}).$mount('#app')

Vum.router(router)

FastClick.attach(document.body)
