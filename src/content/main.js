import Vue from 'vue'
import App from './App'
import Comms from '@/common/comms/Client'

Comms.listen('content')

/**
 * We boot up the content script vue instance that handles all dom management.
 */
const component = new Vue({
  components: { App },
  render: h => h('app')
}).$mount()

document.querySelector('body').appendChild(component.$el)

/**
 * Send message to background about that we want to get all notes for the
 * domain.
 */
Comms.send('background/load-notes')
  .then(notes => Comms.send('content/render-notes', notes))
