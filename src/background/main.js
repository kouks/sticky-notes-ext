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
Comms.on('save-note', async ({ request, respond }) => {
  let id = await Store.sync.get('id')
  let tab = await Tabs.getActive()

  axios.post(`${config.api.url}/notes`, {
    author: id,
    body: request.body,
    url: tab.url,
    styles: JSON.stringify(request.styles)
  }).then(() => respond(null))
})

/*
 * This listener loads all notes for the domain from the database and tells the
 * content script to render them.
 */
Comms.on('load-notes', async ({ respond }) => {
  let id = await Store.sync.get('id')
  let tab = await Tabs.getActive()
  let url = encodeURIComponent(tab.url)

  axios.get(`${config.api.url}/notes?url=${url}&id=${id}`)
    .then(notes => respond(notes.data))
})

/*
 * This listener removes a note based on provided id.
 */
Comms.on('remove-note', async ({ request, respond }) => {
  axios.delete(`${config.api.url}/notes/${request.id}`)
    .then(() => respond(null))
    .then(() => Comms.send('background/load-notes'))
    .then(notes => Comms.send('content/render-notes', notes))
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
