import { computed } from "vue";
import { useStore } from "vuex";




const useGeneral = () => {
  const store = useStore();


  return {
    isLoading: computed(() => store.getters['general/currentIsLoading']),
  }
}

export default useGeneral
