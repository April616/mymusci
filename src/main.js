import Vue from 'vue'
import App from './App.vue'
import axios from '@/myaxios/axios.js'
Vue.config.productionTip = false
Vue.prototype.$http=axios//将axios挂载到vue的prototype.$http上面 现在所有的实例中都可以直接用axios而不需要引用啦
new Vue({
  render: h => h(App),
}).$mount('#app')
