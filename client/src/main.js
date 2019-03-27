import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import moment from 'moment'
import Swal from 'sweetalert2'
import StarRating from 'vue-star-rating'

Vue.prototype.moment = moment
Vue.component('star-rating', StarRating);


//Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
