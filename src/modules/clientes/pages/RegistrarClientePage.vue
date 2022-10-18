<template>
  <q-page class="">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <router-link :to="{name:'clientes'}" style="text-decoration: none;">
        <q-btn fab icon="arrow_back" color="accent" />
      </router-link>

    </q-page-sticky>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <h3>Registro Cliente </h3>
        <q-separator />

      </div>
      <div class="q-pa-sm" style="max-width: 400px;">

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">

          <q-input ref="focus" filled v-model.trim.lazy="form.documento" label="Documento *" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa un documento']" />

          <q-input filled v-model.trim.lazy="form.nombre" label="Nombre *" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa un nombre']" />

          <q-input filled v-model="form.telefono" label="Telefono *" lazy-rules :rules="[
            val => val !== null && val.length > 0 || 'Por favor ingresa un telefono',
          ]" />


          <div>
            <q-btn label="Registrar Cliente" type="submit" color="primary" />
            <q-btn ref="clickReset" label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>

      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useClientes from '../composables/useClientes'

export default defineComponent({
  name: 'CreatePage',
  setup() {
    const $q = useQuasar()
    const router = useRouter();
    const clickReset = ref('');
    const { registrarCliente } = useClientes()
    const focus = ref()

    const form = ref({
      documento: '',
      nombre: '',
      telefono: '',

    })



    const onReset = () => {
      form.value.documento = ''
      form.value.nombre = ''
      form.value.telefono = ''
      focus.value.focus();

    }

    return {
      focus,
      form,
      clickReset,
      onReset,
      onSubmit: async () => {
        const resp = await registrarCliente(form.value);

        if (resp) {
          $q.notify({
            color: 'success',
            icon: 'done',
            message: 'Cliente registrada correctamente'
          })
          clickReset.value.click()

        } else {
          return $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Ocurrió un problema al registrar el cliente'
          })
        }




      },

    }

  }
})
</script>
