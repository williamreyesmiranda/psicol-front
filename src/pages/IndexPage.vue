<template>
  <q-page>
    <div class="q-mt-sm">
      <h4>Prueba creada por William Reyes Miranda (1124023751)</h4>
      <div>
        Módulos creados con CRUD:

      </div>
      <div class="row">
        <ul>
          <li>Clientes</li>
          <li>Boletas</li>
        </ul>
      </div>
    </div>
  </q-page>
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
