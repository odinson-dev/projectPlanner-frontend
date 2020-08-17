import Vue from 'vue'
import './plugins/fontawesome'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import AppButton from './components/AppButton'
import axios from 'axios'
import titleMixin from './mixins/titleMixin'

Vue.mixin(titleMixin)

Vue.component('AppButton', AppButton)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    axios.get('/list/get')
      .then(response => {
        store.state.board['columns'] = {}
        store.state.board.columns = response.data.message
      })
      .catch(err => {
        console.log(err)
      })
  },
  render: h => h(App)
}).$mount('#app')
