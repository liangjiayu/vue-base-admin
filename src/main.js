import Vue from 'vue';

import './styles/index.scss'; //global css
import CONFIG from './configs/index';

// plugins
import './plugins/element';
import './plugins/storage';
import './plugins/axios';

import App from './App.vue';
import router from './router/index';
import store from './store/index';

import './permission';

Vue.prototype.CONFIG = CONFIG;
Vue.prototype._log = console.log;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
