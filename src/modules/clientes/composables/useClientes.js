import { computed } from "vue";
import { useStore } from "vuex";




const useClientes = () => {
  const store = useStore();


  const verClientes = async () => {
    await store.commit('general/changeLoading', true)
    await store.dispatch('clientes/verClientes')
    await store.commit('general/changeLoading', false)
  }

  const registrarCliente = async (cliente) => {
    const resp = await store.dispatch('clientes/registrarCliente', cliente)
    return resp
  }

  const eliminarCliente = async (id) => {
    const resp = await store.dispatch('clientes/eliminarCliente', id);
    return resp;
  }

  const actualizarCliente = async (cliente) => {
    const resp = await store.dispatch('clientes/actualizarCliente', cliente);
    return resp;
  }


  return {
    verClientes,
    registrarCliente,
    eliminarCliente,
    actualizarCliente,
    clientes: computed(() => store.getters['clientes/currentAllClientes']),
  }
}

export default useClientes
