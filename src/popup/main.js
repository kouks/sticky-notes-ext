import Vue from 'vue'
import App from './App'
import routes from './routes'
import Router from 'vue-router'

Vue.use(Router)

export default new Vue({
  components: { App },
  render: h => h('app'),
  router: new Router({ routes })
}).$mount('#app')
