<template>
  hola
</template>

<script>
import { defineComponent } from 'vue'

const columns = [

  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'codigo', align: 'center', label: 'Codigo', field: 'codigo', sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripcion', field: 'descripcion', sortable: true },
  { name: 'actions', label: 'Acciones', field: '', align: 'center' },
]

export default defineComponent({
  name: 'IndexPage',

  setup(props) {



    return {
      columns
    }
  }
})
</script>
