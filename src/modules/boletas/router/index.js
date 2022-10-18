export default {
  name: 'boletas/',
  component: () => import(/* webpackChunkName: "home" */'../../../layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      name: 'boletas',
      component: () => import(/* webpackChunkName: "BoletasPage" */'../pages/BoletasPage.vue')
    },
    {
      path: 'registrar',
      name: 'registrarBoleta',
      component: () => import(/* webpackChunkName: "RegistrarBoletaPage" */'../pages/RegistrarBoletaPage.vue')
    },
  ]
}
