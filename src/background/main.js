import Comms from '@/common/comms/Server'

Comms.init('background')
Comms.listen('test', (payload) => {
  console.log(payload)
})
