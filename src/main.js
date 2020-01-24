import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './styles/index.scss'; //global css
import _Storage from './utils/storage';
import CONFIG from './configs/index';

import App from './App.vue';
import router from './router/index';
import store from './store/index';
import request from './utils/request';
import { showLoading, showToast, validator } from './utils/utils';

import './permission';

Vue.use(ElementUI, {
  size: 'small',
});

Vue.prototype.JY = {
  request,
  showLoading,
  showToast,
  validator,
};

Vue.prototype._Storage = _Storage;
Vue.prototype.CONFIG = CONFIG;
Vue.prototype._log = console.log;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
