import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * vuex 作用：
 * 1、vuex 就是在 vue 中创建全局变量的一个东西
 * 2、我们可以通过一些方法，来改变这些全局变量的值
 */
/**
 * Store:
 *   就算new Vuex.Store({})里面的对象，用到的vuex所有的核心概念都是在store里面的
 *   在 vue 的组件中，我们可以直接通过 this.$store = Store对象。
 * state:
 *   vuex 中的数据源，所有通过 vuex 声明的全局变量都会在 state 里面
 *   this.$store.state = state{}
 * getter:
 *   相当于 vue 中的计算属性，可以用于监听，计算 state 中的数据变化
 * mutation:
 *   vuex 中去操作数据的方法 （vuex 中不推荐直接去为state进行赋值，如this.$store.state.xxx = xxx）
 *   推荐我们使用 mutation 来修改 state 的值。因为这样它会是一个 有迹可循 的操作方式（只能是同步执行的）
 * action:
 *   帮助 mutation 进行异步操作
 * module:
 *   将 store分为多个模块，每个模块都是一个module
 */
export default new Vuex.Store({
  state: {
    // 购物车数据源
    shoppingDatas: [],
    isIphoneX: false,
    username: undefined
  },
  mutations: {
    /**
     * 添加商品到购物车数据源
     * 组件调用此方法使用commit
     */
    addShoppingData (state, goods) {
      const isExit = state.shoppingDatas.some(item => {
        if (item.id === goods.id) {
          item.number++
          return true
        }
      })
      if (!isExit) {
      /**
       * 为商品新增属性
       * isCheck: 表示商品是否选中
       * number: 商品数量
       * 通过Vue.set 的方法可以把新添加的属性变为响应式的数据
       */
        Vue.set(goods, 'isCheck', false)
        Vue.set(goods, 'number', 1)
        state.shoppingDatas.push(goods)
      }
    },
    /**
     *更改指定的商品数量
     */
    changeShoppingDataNum (state, data) {
    /**
     * data:{
     * index: 指定的商品的下标
     * number: 商品的数量
     * }
     */
      state.shoppingDatas[data.index].number = data.number
    },
    setisIphoneX (state, isIphoneX) {
      state.isIphoneX = isIphoneX
    },
    setUsername (state, username) {
      state.username = username
    }
  },
  actions: {
  },
  modules: {
  }
})
