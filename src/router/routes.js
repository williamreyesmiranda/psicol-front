import Boletas from '../modules/boletas/router/index'
import Clientes from '../modules/clientes/router/index'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/boletas',
    ...Boletas
  },
  {
    path: '/clientes',
    ...Clientes
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
