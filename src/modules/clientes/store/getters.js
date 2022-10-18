export const currentAllClientes = (state) => (term = "") => {

  // return state.clientes || '';
  if (term.length === 0) return state.clientes;
  return state.clientes.filter((entry) =>
    entry.nombre.toLowerCase().includes(term.toLowerCase()) || entry.documento.toLowerCase().includes(term.toLowerCase()) || entry.telefono.toLowerCase().includes(term.toLowerCase())
  );
}



// export const currentIsLoading = (state) => {
//   return state.isLoading || false;
// }


