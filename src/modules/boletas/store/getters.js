export const currentAllBoletas = (state) => (term = "") => {

  // return state.boletas || '';
  if (term.length === 0) return state.boletas;
  return state.boletas.filter((entry) =>
    entry.descripcion.toLowerCase().includes(term.toLowerCase()) || entry.codigo.toLowerCase().includes(term.toLowerCase())
  );
}



// export const currentIsLoading = (state) => {
//   return state.isLoading || false;
// }


