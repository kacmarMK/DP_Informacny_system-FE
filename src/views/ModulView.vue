<template>
  <MainContent>
    <Spinner v-if="loading"/>
    <div v-else>
      <Breadcrumb :heading="$t('views.modul_view.heading')" :third="$t('views.modul_view.link')"/>
    </div>
  </MainContent>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MainContent from '../components/MainContent.vue'
import ModulesService from "../services/ModulesService"
import ModulesForm from "../components/ModulesComponents/ModulesForm.vue";
import ResponseData from '../services/ResponseData';
import Breadcrumb from '../components/Breadcrumb.vue'
import Spinner from '../components/Spinner.vue'
import Module from '@/interfaces/Module';
import Dashboard from '@/interfaces/Dashboard';
import DashboardService from '@/services/DashboardService';
import User from '@/interfaces/User';
import Permission from '@/interfaces/Permission';
export default defineComponent({
  name: 'ModulView',
  components: {
    MainContent, 
    ModulesForm, 
    Breadcrumb,
    Spinner
  },
  data: () => ({
    /*    modul: {} as Module,
    error: false as boolean,
    errorMessage: "" as string,
    loading: true as boolean,
    permission: {} as Permission*/
  }),
  created(){
  },
  methods: {
  }

})
</script>

<style scoped>

.card {
   border: 1px solid #e6edef;
   transition: all 0.6s ease;
   cursor: pointer;
}

.card:hover .icon-round {
  background-color:  var(--blue-primary-color);
   color: white;
}
.card-header {
  background: transparent;
}

</style>