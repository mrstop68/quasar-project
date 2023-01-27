<template>
  <ProjectLayout />
  <q-card-section class="q-pt-none">
    <q-form class="q-gutter-md">
      <q-input autofocus v-model="title" label="Title" />
      <q-input filled v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input v-model="description" label="Description" />
      <div>
        <q-btn
          label="Update"
          type="submit"
          color="primary"
          @click.prevent="editSubmit"
        />
      </div>
    </q-form>
  </q-card-section>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">ID: {{ $route.params.id }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <p>
          Seçilen id ye göre verileri anasayfada local storage a kaydettikten
          sonra, bu sayfada veriler alınıp ilgili inputlara gönderilir.
        </p>
        <p>veya componentler arası veri transferi ile de gönderilebilir</p>
        <p>
          Normal bir projede id ye göre veri tabanından veriler çekilir veya API
          ye istek atılarak ilgili veri alınıp forma basılır
        </p>
        <p>
          Yapılan değişiklerden sonra yeni oluşan objeyi id numarasına göre
          anasayfada tekrar liste dizisine basma işlemi yapıllır.
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import ProjectLayout from 'src/components/ProjectLayout.vue';

export default defineComponent({
  name: 'EditPage',
  components: { ProjectLayout },

  data() {
    const $q = useQuasar();
    return {
      $q,
      alert: ref(false),
    };
  },
  created() {
    console.log('ee');
  },
  methods: {
    editSubmit() {
      this.alert = true;
    },
  },
});
</script>
<style lang="sass">
.routerLink
  text-decoration: none
  color: inherit
  margin-top:8px
</style>
