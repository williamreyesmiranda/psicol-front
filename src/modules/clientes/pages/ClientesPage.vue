<template>
  <q-page class="q-mt-sm q-mb-xl">
    <div class="q-pa-md q-gutter-xl col-6 justify-center">
      <q-btn color="primary" icon="person_add_alt" label="Registrar Cliente" @click="registrarCliente" />
      <div style="max-width: 400px;">
        <q-input outlined standout="bg-teal text-white" v-model="keyword"
          label="Buscar por telefono, documento o nombre" />
      </div>

    </div>
    <div class="row q-mt-xl justify-center q-col-gutter-sm">
      <div class="col-10">
        <q-table title="Clientes" :rows="tickets" :columns="columns" row-key="name" :loading="isLoading"
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
        <div class="text-h6">Editar Cliente</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form ref="focus" @submit.prevent="onUpdate" class="q-gutter-sm">

          <q-input filled v-model.trim.lazy="valUpdate.documento" label="Documento *" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa un documento']" />

          <q-input filled v-model.trim.lazy="valUpdate.nombre" label="Nombre *" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa un nombre']" />

          <q-input filled v-model="valUpdate.telefono" label="Telefono *" lazy-rules :rules="[
            val => val !== null && val.length > 0 || 'Por favor ingresa un telefono',
          ]" />

          <div>
            <q-btn label="Actualizar Cliente" type="submit" color="primary" />
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
import useClientes from '../composables/useClientes'
import { useRouter } from 'vue-router';
import useGeneral from '../../../composables/useGeneral'
import { useQuasar } from 'quasar';


const columns = [

  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'documento', align: 'center', label: 'Documento', field: 'documento', sortable: true },
  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'telefono', align: 'center', label: 'Telefono', field: 'telefono', sortable: true },
  { name: 'actions', label: 'Acciones', field: '', align: 'center' },
]

export default defineComponent({
  name: 'IndexPage',

  setup(props) {
    const { verClientes, clientes, eliminarCliente, actualizarCliente } = useClientes()
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


    const verifyDelete = async (cliente) => {
      console.log(cliente);
      $q.dialog({
        title: 'Eliminar',
        message: `¿Desea eliminar el cliente ${cliente.nombre} de la lista?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        const resp = await eliminarCliente(cliente.id);
        if (resp) {
          $q.notify({
            color: 'success',
            icon: 'done',
            message: 'Cliente eliminado correctamente'
          })
          verClientes();

        } else {
          return $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Ocurrió un problema al intentar eliminar el cliente'
          })
        }
      })
    }

    const editRow = (cliente) => {
      valUpdate.value = { ...cliente };
      modal.value = true;
    }

    const onUpdate = async () => {

      const resp = await actualizarCliente(valUpdate.value);
      if (resp) {
        $q.notify({
          color: 'success',
          icon: 'done',
          message: 'Cliente actualizada correctamente'
        })
        verClientes();

      } else {
        return $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Ocurrió un problema al intentar actualizar el cliente'
        })
      }

      modal.value = false;
    }


    watch(() => clientes.value(),
      () => {
        tickets.value = clientes.value();
      }
    )

    watch(
      () => keyword.value,
      () => {
        tickets.value = clientes.value(keyword.value);
      }
    )

    verClientes()

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
      registrarCliente: () => {
        router.push({ name: 'registrarCliente' })
      },

    }
  }
})

</script>
<style lang="scss" scoped>

</style>
