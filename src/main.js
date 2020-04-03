import Vue from 'vue'
import HighchartsVue from 'highcharts-vue';
import VueMeta from 'vue-meta';
import App from './App.vue'
import Loader from './components/Loader';
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import dateFilter from './filters/date.filters';
import currencyFilter from './filters/currency.filter';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Vuelidate)
Vue.use(HighchartsVue)
Vue.use(VueMeta)

Vue.config.productionTip = false
Vue.filter('myDate', dateFilter);
Vue.filter('myCurrencyFilter', currencyFilter);

Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyCdFUV8XzkmhjuA4kBBoTSeOfJIxOvZ3ZE",
  authDomain: "vue-spafinance.firebaseapp.com",
  databaseURL: "https://vue-spafinance.firebaseio.com",
  projectId: "vue-spafinance",
  storageBucket: "vue-spafinance.appspot.com",
  messagingSenderId: "203186752119",
  appId: "1:203186752119:web:e814c2be358029dd955472"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

