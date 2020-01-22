import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
