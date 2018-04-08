// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Message, Modal} from 'iview'

Vue.config.productionTip = false;
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

import 'iview/dist/styles/iview.css';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
