import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // vue-router 懒加载 -> GoodsList
    // 打包名字chunkname -> GoodsList.[hash].js
    component: () => import(/* webpackChunkName: "goodsList" */ '../views/GoodsList.vue')
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // vue-router 懒加载 -> GoodsList
    // 打包名字chunkname -> GoodsList.[hash].js
    component: () => import(/* webpackChunkName: "goodsDetail" */ '../views/GoodsDetail.vue')
  },
  {
    path: '/buy',
    name: 'buy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // vue-router 懒加载 -> GoodsList
    // 打包名字chunkname -> GoodsList.[hash].js
    component: () => import(/* webpackChunkName: "buy" */ '../views/Buy.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // vue-router 懒加载 -> GoodsList
    // 打包名字chunkname -> GoodsList.[hash].js
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // vue-router 懒加载 -> GoodsList
    // 打包名字chunkname -> GoodsList.[hash].js
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
