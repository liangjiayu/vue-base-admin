import Vue from 'vue';

// plugins
import './plugins/element';
import './plugins/storage';
import './plugins/axios';

// global components
import './components/index';
//global css
import './styles/index.scss';
// global auth
import './permission';

import App from './App.vue';
import router from './router/index';
import store from './store/index';

Vue.prototype._log = console.log;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
