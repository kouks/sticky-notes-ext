import Comms from '@/common/comms/Client'

Comms.init('content')
Comms.send('background', 'test', { test: 'test' })
Comms.send('background', 'test', { test: 'test1' })
