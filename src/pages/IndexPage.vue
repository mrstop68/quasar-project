<template>
  <ProjectLayout
    :driverStatus="rightDrawer"
    :listId="ListID"
    :ListLength="ListLength"
    :randomNumber="random"
    :selectedTask="selectedTask"
    @data="newTask = $event"
  />

  <div class="q-pa-md">
    <q-table
      title="TITLE"
      class="my-sticky-header-table"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
      :rows-per-page-options="[10, 25, 50, 100, 0]"
      :filter="filter"
    >
      <template>
        <q-inner-loading showing color="primary"> </q-inner-loading>
      </template>
      <!-- <template #loading> //loading ekranında yuvarlak dönme animasyonu aktif olur
        <q-inner-loading showing color="primary"> </q-inner-loading>
      </template> -->
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" @click="editpage(props.row.id)" class="buttonId">
            {{ props.row.id }}
          </q-td>
          <q-td key="title">
            {{ props.row.title }}
          </q-td>
          <q-td key="tags">
            {{ props.row.tags }}
          </q-td>
          <q-td key="enddate">
            {{ props.row.enddate }}
          </q-td>
          <q-td key="state">
            <!-- {{ props.row.state }} -->
            <q-checkbox
              left-label
              v-model="state"
              :val="`${props.row.id}`"
              label="complete"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              @click="StateComplate(props.row.id)"
            />
          </q-td>
          <q-td key="description">
            {{ props.row.description }}
          </q-td>
          <q-td key="id">
            <q-btn
              padding="none"
              color="green"
              icon="edit"
              @click="edit(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { useTaskList } from '../stores/tasklist';
import { defineComponent, ref } from 'vue';
import ProjectLayout from 'src/components/ProjectLayout.vue';
const task = useTaskList();
// console.log(task.task1);
const taskList = task.task1;
export default defineComponent({
  name: 'IndexPage',
  components: { ProjectLayout },

  data() {
    const $q = useQuasar();
    return {
      newTask: '',
      rightDrawer: ref(false),
      ListID: 0,
      state: ref([]),
      initialPagination: {
        rowsPerPage: 20,
      },
      filter: ref(''),
      $q,
      random: ref(0),
      taskList,
      rows: taskList,
      selectedTask: '',
      columns: [
        {
          label: 'id',
          name: 'ID',
          field: 'id',
          align: 'left',
        },
        {
          label: 'Title',
          name: 'title',
          field: 'title',
          align: 'left',
        },
        {
          label: 'Tags',
          name: 'tags',
          field: 'tags',
          align: 'left',
        },

        {
          label: 'EndDate',
          name: 'enddate',
          field: 'enddate',
          align: 'left',
          sortable: true,
        },
        {
          label: 'State',
          name: 'state',
          field: 'state',
          align: 'left',
          sortable: true,
        },
        {
          label: 'Description',
          name: 'description',
          field: 'description',
          align: 'left',
        },
        {
          label: 'Edit',
          name: 'edit',
          field: 'edit',
          align: 'left',
        },
      ],
    };
  },
  created() {
    this.ListLength = this.rows.length;
  },
  methods: {
    edit(id) {
      this.random = Math.random();
      // console.log(task.task1[id - 1]);
      this.rightDrawer = true;
      this.ListID = id;

      this.selectedTask = task.task1[id - 1];
    },
    StateComplate(id) {
      console.log(id);
    },
    editpage(id) {
      this.$router.push({
        name: 'editlist',
        params: {
          id: id,
        },
      });
    },
  },
  watch: {
    async newTask() {
      const ISsaveList = this.rows.push(this.newTask[0]);
      ISsaveList
        ? this.$q.notify({
            type: 'positive',
            message: 'Kayıt Eklendi',
            position: 'top',
            timeout: 1000,
            progress: true,
          })
        : this.$q.notify({
            type: 'danger',
            message: 'Tekrar Deneyiniz',
            position: 'top',
            timeout: 1000,
            progress: true,
          });
    },
  },
});
</script>
<style lang="sass">
.buttonId
  cursor: pointer
</style>
