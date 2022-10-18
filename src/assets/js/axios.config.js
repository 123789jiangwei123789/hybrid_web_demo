// axios配置
// const axios = require('axios') //获取axios对象
import Vue from 'vue'
import axios from 'axios'

// 设置 axios 请求baseUrl
axios.defaults.baseUrl = 'http://api.imooc.hybrid.lgdsunday.club'
/**
 * 设置拦截器，interceptors响应处理
 * 所有使用axios 发送的请求，在请求发送出去之前，都会进入到这个方法
 * 在这里为所有的请求添加上token
 */
axios.interceptors.request.use(config => {
  // config对象
  if (config.params) {
    config.params.token = '980b2780-fc16-11eb-b146-3f60c901b51b'
  } else {
    config.params = {
      token: '980b2780-fc16-11eb-b146-3f60c901b51b'
    }
  }
  // config对象需要返回才能生效
  return config
})
/**
 * 设置拦截器，interceptors响应处理
 * 所有使用 axios 的请求响应，都会优先回调到拦截器中
 * 在正确的返回情况下，数据会优先进入第一个回调的方法
 * 在请求错误的情况下，错误会进入第二个回调的方法
 */
axios.interceptors.response.use(response => {
  // 统一处理数据，使组件中的请求只获取到需要的业务数据，
  // 而不需要去关注返回的状态码等与业务无关的数据
  return response.data.data
}, error => {
  // 处理错误的响应
  return Promise.reject(error)
})

// 绑定到vue的原型中：直接在组件中this.$http -> axios
Vue.prototype.$http = axios
