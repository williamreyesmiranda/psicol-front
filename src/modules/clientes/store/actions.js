import { api } from 'boot/axios'

export const verClientes = async ({ commit }) => {
  const { data } = await api.get('clientes/verClientes');
  commit('setClientes', data);
}

export const registrarCliente = async ({ }, cliente) => {
  try {
    console.log(cliente);
    const { data } = await api.post('clientes/registrarCliente', cliente);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const eliminarCliente = async ({ }, id) => {
  try {
    const { data } = await api.delete(`clientes/eliminarCliente/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export const actualizarCliente = async ({ }, cliente) => {
  try {
    const { data } = await api.put('clientes/actualizarCliente', cliente);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

