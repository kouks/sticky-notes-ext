import Comms from '@/common/comms/Client'

Comms.init('background')

// Comms.on('test', payload => console.log(payload))

// setTimeout(() => {
//   Comms.send('background/test', { test: 'test' })
// }, 3000)
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  console.log(tabs)
})
