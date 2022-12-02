import Vue from 'vue'
import App from './App'

window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
