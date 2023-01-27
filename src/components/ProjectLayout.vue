<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <div class="q-pa-sm q-pl-md row items-right">
        <div class="cursor-pointer non-selectable">
          <router-link to="/" class="routerLink">Listele</router-link>
        </div>
      </div>
      <q-space />
      <div class="q-gutter-sm row items-center no-wrap">
        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
        <q-btn round color="primary" icon="add" @click="medium = true" />
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
    <q-scroll-area class="fit fixedBar">
      <q-list padding class="menu-list fixedBar">
        <router-link to="" class="routerLink">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="pages" />
            </q-item-section>
            <q-item-section> Link 1 </q-item-section>
          </q-item>
        </router-link>
        <router-link to="" class="routerLink">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="pages" />
            </q-item-section>

            <q-item-section> Link 2 </q-item-section>
          </q-item>
        </router-link>
        <router-link to="" class="routerLink">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="pages" />
            </q-item-section>
            <q-item-section> Link 3 </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-scroll-area>
    <!-- drawer content -->
  </q-drawer>

  <q-drawer
    v-model="rightDrawerOpen"
    side="right"
    overlay
    behavior="mobile"
    elevated
  >
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px">
        <q-input v-model="title" label="Title" />
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
        <q-input v-model="tags" label="Tags" multiple />
      </div>
    </div>
    <!-- drawer content -->
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>

  <q-footer elevated class="bg-grey-8 text-white">
    <q-toolbar>
      <q-toolbar-title>
        <div>Title</div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
  <q-dialog v-model="medium">
    <q-card style="width: 800px; max-width: 90vw">
      <q-card-section class="row items-center q-pb-none">
        ADD NEW<q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

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
          <q-select
            filled
            v-model="multiple"
            multiple
            :options="options"
            label="Tags"
          />
          <q-checkbox
            left-label
            v-model="statusForm"
            label="Complate"
            checked-icon="task_alt"
            unchecked-icon="highlight_off"
          />
          <div>
            <q-btn
              label="Save"
              type="submit"
              color="primary"
              @click.prevent="onSubmit"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  props: [
    'driverStatus',
    'listId',
    'randomNumber',
    'selectedTask',
    'ListLength',
  ],
  data() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      listNum: 0,
      medium: ref(false),
      statusForm: ref(false),
      title: '',
      tags: '',
      date: ref('2023/01/27'),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      multiple: ref(null),
      options: ['NODEJS', 'Javascript', 'PHP', 'PYTHON', 'JAVA'],
    };
  },
  created() {
    this.listNum = this.ListLength + 1;
  },
  watch: {
    randomNumber(neww, oldd) {
      this.rightDrawerOpen = true;
      //   console.log(this.driverStatus);
      //   console.log(this.listId);
      //   console.log(this.selectedTask);
      this.title = this.selectedTask.title;
      this.tags = this.selectedTask.tags;
      this.date = this.selectedTask.enddate;
    },
    // rightDrawerOpen(firts, second) {
    //   if (firts == false) {
    //     this.rightDrawerOpen = false;
    //   }
    // },
  },
  methods: {
    onSubmit() {
      this.medium = false;
      const newTask = [
        {
          id: this.listNum++,
          title: this.title,
          tags: this.multiple,
          enddate: this.date,
          state: this.statusForm,
        },
      ];
      //   console.log(newTask);
      this.$emit('data', newTask);
    },
  },
};
</script>
<style lang="sass">
.q-page-container
    padding-top: 0!important
.q-menu
  border-radius: 0
.menu-list .q-item
  border-radius: 0 32px 32px 0
.routerLink
  text-decoration: none
  color: inherit
  margin-top:8px
.q-item
  min-height: 28px
q-tooltip
  top: 10px!important
.q-drawer
  position: fixed
</style>
