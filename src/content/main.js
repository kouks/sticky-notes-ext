import Comms from '@/common/comms/Client'

Comms.init('content')

Comms.on('test', payload => console.log(payload))
