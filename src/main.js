import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './styles/index.scss'; //global css

import App from './App.vue';
import router from './router/index';
import store from './store/index';
import { requestPost } from './api/request';
// import '../mock';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$requestPost = requestPost;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
