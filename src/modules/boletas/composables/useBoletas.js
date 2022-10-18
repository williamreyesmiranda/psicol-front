import { computed } from "vue";
import { useStore } from "vuex";




const useBoletas = () => {
  const store = useStore();


  const verBoletas = async () => {
    await store.commit('general/changeLoading', true)
    await store.dispatch('boletas/verBoletas')
    await store.commit('general/changeLoading', false)
  }

  const registrarBoleta = async (boleta) => {
    const resp = await store.dispatch('boletas/registrarBoleta', boleta)
    return resp
  }

  const eliminarBoleta = async (id) => {
    const resp = await store.dispatch('boletas/eliminarBoleta', id);
    return resp;
  }

  const actualizarBoleta = async (boleta) => {
    const resp = await store.dispatch('boletas/actualizarBoleta', boleta);
    return resp;
  }


  return {
    verBoletas,
    registrarBoleta,
    eliminarBoleta,
    actualizarBoleta,
    boletas: computed(() => store.getters['boletas/currentAllBoletas']),
  }
}

export default useBoletas
