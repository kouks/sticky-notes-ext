import axios from 'axios'
import config from 'config'
import Tabs from '@/background/core/Tabs'
import Comms from '@/common/comms/Client'
import Store from '@/background/core/Store'

Comms.listen('background')

/*
 * Event that is called after note is finished creating. This listener saves the
 * note on the database.
 */
Comms.on('save-note', async ({ request }) => {
  let id = await Store.sync.get('id')
  let tab = await Tabs.getActive()

  axios.post(`${config.api.url}/notes`, {
    author: id,
    body: request.body,
    url: tab.url,
    styles: JSON.stringify(request.styles)
  }).then(() => Comms.send('background/load-notes'))
})

/*
 * This listener loads all notes for the domain from the database and tells the
 * content script to render them.
 */
Comms.on('load-notes', async () => {
  let id = await Store.sync.get('id')
  let tab = await Tabs.getActive()
  let url = encodeURIComponent(tab.url)

  axios.get(`${config.api.url}/notes?url=${url}&id=${id}`)
    .then((notes) => Comms.send('content/render-notes', notes.data))
})

/*
 * Event that is called on extenstion install/update. This listener sets the
 * unique user id on install.
 */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    Store.sync.set('id', Date.now())
  }
})
