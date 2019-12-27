import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import locale from "iview/dist/locale/en-US"
import axios from 'axios'
import RGrid from 'vuejs-rgrid'
import router from './router'
import App from './App.vue'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.use(iView, { locale })

// Our open source datatable for Vue.js (https://github.com/Sarpilhan/RGrid/graphs/contributors)
Vue.use(RGrid)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
