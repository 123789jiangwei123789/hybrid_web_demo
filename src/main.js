import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@js/htmlFontSize.js'
import '@js/axios.config.js'
import '@js/filters.js'
import '@js/isIphoneX.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
