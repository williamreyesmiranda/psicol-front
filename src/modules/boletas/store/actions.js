import { api } from 'boot/axios'

export const verBoletas = async ({ commit }) => {
  const { data } = await api.get('boletas/verBoletas');
  commit('setBoletas', data);
}

export const registrarBoleta = async ({ }, boleta) => {
  try {
    const { data } = await api.post('boletas/registrarBoleta', boleta);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const eliminarBoleta = async ({ }, id) => {
  try {
    const { data } = await api.delete(`boletas/eliminarBoleta/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const actualizarBoleta = async ({ }, boleta) => {
  try {
    const { data } = await api.put('boletas/actualizarBoleta', boleta);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

