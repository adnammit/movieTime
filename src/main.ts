import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
// import 'babel-polyfill'
import moment from 'moment';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.filter('formatYear', (value: Date) => {
    const date = moment(String(value));
    if (date.isValid()) {
        return date.year();
    }
    return '';
});