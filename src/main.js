import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free/css/all.css';
import Toasted from 'vue-toasted';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.use(Toasted);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
