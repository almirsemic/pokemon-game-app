import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router';
import VueToastr from "vue-toastr";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToastr);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
