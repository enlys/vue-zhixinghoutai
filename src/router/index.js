import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      needLogin: true //需要加校检判断的路由
   },
   redirect:"/system",
      children:[
        {
          path: '/system',
          name: 'system',
          component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/classification',
          name: 'classification',
          component: () => import(/* webpackChunkName: "about" */ '../views/tabs/classification.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/article',
          name: 'article',
          component: () => import(/* webpackChunkName: "about" */ '../views/tabs/article.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/addarticle',
          name: 'addarticle',
          component: () => import(/* webpackChunkName: "about" */ '../views/write/addarticle.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/videolist',
          name: 'videolist',
          component: () => import(/* webpackChunkName: "about" */ '../views/tabs/videolist.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/addvideo',
          name: 'addvideo',
          component: () => import(/* webpackChunkName: "about" */ '../views/write/addvideo.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/itemvideo/:id',
          name: 'itemvideo',
          component: ()=>import('../views/tabs/itemvideo.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/articleitem/:id',
          name: 'articleitem',
          component: ()=>import('../views/tabs/articleitem.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/postlist',
          name: 'postlist',
          component: ()=>import('../views/tabs/postlist.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
        {
          path: '/userlist',
          name: 'userlist',
          component: ()=>import('../views/tabs/userlist.vue'),
          meta: {
             needLogin: true //需要加校检判断的路由
          },
        },
      ]
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/login.vue'),
   
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
