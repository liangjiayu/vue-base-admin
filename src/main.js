import Vue from 'vue';

import './styles/index.scss'; //global css
import CONFIG from './configs/index';

// plugins
import './plugins/element';
import './plugins/storage';

import App from './App.vue';
import router from './router/index';
import store from './store/index';
import request from './utils/request';
import { showLoading, showToast, validator } from './utils/utils';

import './permission';

Vue.prototype.JY = {
  request,
  showLoading,
  showToast,
  validator,
};

Vue.prototype.CONFIG = CONFIG;
Vue.prototype._log = console.log;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
