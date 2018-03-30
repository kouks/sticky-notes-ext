import New from '@/popup/components/New'
import Home from '@/popup/components/Home'
import Login from '@/popup/components/Login'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/new',
    component: New
  }
]
