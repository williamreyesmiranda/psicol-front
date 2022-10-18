<template>
  <q-page class="">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <router-link :to="{name:'boletas'}" style="text-decoration: none;">
        <q-btn fab icon="arrow_back" color="accent" />
      </router-link>

    </q-page-sticky>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <h3>Registro Boleta </h3>
        <q-separator />

      </div>
      <div class="q-pa-sm" style="max-width: 400px;">

        <q-form ref="focus" @submit="onSubmit" @reset="onReset" class="q-gutter-sm">

          <q-input filled v-model.trim.lazy="form.codigo" label="Código *" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa un código']" />

          <q-input filled v-model.trim.lazy="form.descripcion" label="Descripción *" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingresa una descripcion']" />

          <q-input filled type="number" v-model="form.precio" label="Precio *" lazy-rules :rules="[
            val => val !== null && val !== '' || 'Por favor ingresa un precio',
          ]" />

          <q-input filled type="number" v-model="form.stock" label="stock *" lazy-rules :rules="[
            val => val !== null && val !== '' || 'Por favor ingresa un stock',
            val => val > 0 && val < 4000 || 'Ingresa un stock real'
          ]" />


          <div>
            <q-btn label="Registrar Boleta" type="submit" color="primary" />
            <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
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
import useBoletas from '../composables/useBoletas'

export default defineComponent({
  name: 'CreatePage',
  setup() {
    const $q = useQuasar()
    const router = useRouter();
    const { registrarBoleta } = useBoletas()
    const focus = ref()

    const form = ref({
      codigo: '',
      descripcion: '',
      precio: '',
      stock: '',

    })



    const onReset = () => {
      form.value.codigo = ''
      form.value.descripcion = ''
      form.value.precio = ''
      form.value.stock = ''
      focus.value.focus();

    }

    return {
      focus,
      form,
      onReset,
      onSubmit: async () => {
        form.value.precio = parseInt(form.value.precio)
        form.value.stock = parseInt(form.value.stock)
        const resp = await registrarBoleta(form.value);

        if (resp) {
          $q.notify({
            color: 'success',
            icon: 'done',
            message: 'Boleta registrada correctamente'
          })
          onReset();

        } else {
          return $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Ocurrió un problema al registrarla boleta'
          })
        }




      },

    }

  }
})
</script>
