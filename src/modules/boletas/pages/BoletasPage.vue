<template>
  <q-page class="q-mt-sm q-mb-xl">
    <div class="q-pa-md q-gutter-xl col-6 justify-center">
      <q-btn color="primary" icon="app_registration" label="Registrar Boleta" @click="registrarBoleta" />
      <div style="max-width: 400px;">
        <q-input outlined standout="bg-teal text-white" v-model="keyword" label="Buscar por código o descripción" />
      </div>

    </div>
    <div class="row q-mt-xl justify-center q-col-gutter-sm">
      <div class="col-10">
        <q-table title="Pacientes" :rows="tickets" :columns="columns" row-key="name" :loading="isLoading"
          :dense="$q.screen.lt.md" :pagination="initialPagination">
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="grey" @click="editRow(props.row)" icon="edit"></q-btn>
              <q-btn dense round flat color="grey" @click="verifyDelete(props.row)" icon="delete"></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>

  <q-dialog v-model="modal" transition-show="scale" transition-hide="scale">
    <q-card class="" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Editar Boleta</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form ref="focus" @submit.prevent="onUpdate" class="q-gutter-sm">

          <q-input filled v-model.trim.lazy="valUpdate.codigo" label="Código *" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa un código']" />

          <q-input filled v-model.trim.lazy="valUpdate.descripcion" label="Descripción *" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa una descripcion']" />

          <q-input filled type="number" v-model="valUpdate.precio" label="Precio *" lazy-rules :rules="[
            val => val !== null && val !== '' || 'Por favor ingresa un precio',
          ]" />

          <q-input filled type="number" v-model="valUpdate.stock" label="stock *" lazy-rules :rules="[
            val => val !== null && val !== '' || 'Por favor ingresa un stock',
            val => val > 0 && val < 4000 || 'Ingresa un stock real'
          ]" />

          <div>
            <q-btn label="Actualizar Paciente" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Cancelar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, watch, ref } from 'vue'
import useBoletas from '../composables/useBoletas'
import { useRouter } from 'vue-router';
import useGeneral from '../../../composables/useGeneral'
import { useQuasar } from 'quasar';


const columns = [

  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'codigo', align: 'center', label: 'Codigo', field: 'codigo', sortable: true },
  { name: 'descripcion', align: 'center', label: 'Descripcion', field: 'descripcion', sortable: true },
  { name: 'precio', align: 'center', label: 'Precio', field: 'precio', sortable: true },
  { name: 'stock', align: 'center', label: 'Stock', field: 'stock', sortable: true },
  { name: 'actions', label: 'Acciones', field: '', align: 'center' },
]

export default defineComponent({
  name: 'IndexPage',

  setup(props) {
    const { verBoletas, boletas, eliminarBoleta, actualizarBoleta } = useBoletas()
    const router = useRouter()
    const { isLoading } = useGeneral()
    const $q = useQuasar()
    const tickets = ref([]);
    const keyword = ref('');
    const modal = ref(false);
    const valUpdate = ref({});
    const initialPagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 15
    })


    const verifyDelete = async (boleta) => {
      console.log(boleta);
      $q.dialog({
        title: 'Eliminar',
        message: `¿Desea eliminar la boleta con código ${boleta.codigo} de la lista?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        const resp = await eliminarBoleta(boleta.id);
        if (resp) {
          $q.notify({
            color: 'success',
            icon: 'done',
            message: 'Paciente eliminado correctamente'
          })
          verBoletas();

        } else {
          return $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Ocurrió un problema al intentar eliminar el paciente'
          })
        }
      })
    }

    const editRow = (boleta) => {
      valUpdate.value = { ...boleta };
      modal.value = true;
    }

    const onUpdate = async () => {
      console.log('por aca');

      valUpdate.value.precio = parseInt(valUpdate.value.precio)
      valUpdate.value.stock = parseInt(valUpdate.value.stock)

      const resp = await actualizarBoleta(valUpdate.value);
      if (resp) {
        $q.notify({
          color: 'success',
          icon: 'done',
          message: 'Boleta actualizada correctamente'
        })
        verBoletas();

      } else {
        return $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Ocurrió un problema al intentar actualizar la boleta '
        })
      }

      modal.value = false;
    }


    watch(() => boletas.value(),
      () => {
        tickets.value = boletas.value();
      }
    )

    watch(
      () => keyword.value,
      () => {
        tickets.value = boletas.value(keyword.value);
      }
    )

    verBoletas()

    return {
      initialPagination,
      isLoading,
      columns,
      tickets,
      keyword,
      modal,
      valUpdate,
      editRow,
      verifyDelete,
      onUpdate,
      registrarBoleta: () => {
        router.push({ name: 'registrarBoleta' })
      },

    }
  }
})

</script>
<style lang="scss" scoped>

</style>
