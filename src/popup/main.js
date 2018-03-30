import Vue from 'vue'
import App from './App'
import routes from './routes'
import Router from 'vue-router'
import Comms from '@/common/comms/Client'

Comms.listen('popup')

// Load custom vue filters.
require('./filters')

// Load the vue router.
Vue.use(Router)

export default new Vue({
  components: { App },
  render: h => h('app'),
  router: new Router({ routes })
}).$mount('#app')
