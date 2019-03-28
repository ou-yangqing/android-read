import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.axios=axios
Vue.prototype.$alert= MessageBox.alert
Vue.prototype.$message=MessageBox
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
