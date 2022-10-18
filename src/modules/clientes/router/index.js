export default {
  name: 'clientes/',
  component: () => import(/* webpackChunkName: "home" */'../../../layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      name: 'clientes',
      component: () => import(/* webpackChunkName: "ClientesPage" */'../pages/ClientesPage.vue')
    },
    {
      path: 'registrar',
      name: 'registrarCliente',
      component: () => import(/* webpackChunkName: "RegistrarClientePage" */'../pages/RegistrarClientePage.vue')
    },
  ]
}
