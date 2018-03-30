import Comms from '@/common/comms/Server'

Comms.init('background')

Comms.on('test', payload => console.log(payload))
