<template>
  <MainContent>
    <Spinner v-if="loading"/>
    <div v-else>
      <Breadcrumb :heading="$t('views.modul_view.heading')" :third="$t('views.modul_view.link')"/>
      <div class="container-fluid">
        <div class="d-flex justify-content-start mt-3">
          <button class="btn btn-primary-blue p-2" data-bs-toggle="modal" data-bs-target="#modulesCreate">
            <i class="fas fa-plus-circle me-1"></i>
            {{$t("buttons.create_modul")}}
          </button>
        </div>
        <ModulesForm @submitData="addModul($event)" id="modulesCreate" :title="$t('buttons.create_modul')"/>
        <div class="row gutters mt-4">
          <div v-for="(item, index) in modul.dashboardEntityList" :key="index" class="col-xxl-2 col-md-4 mb-2">
              <div class="card h-100">
                  <div class="card-header d-flex justify-content-between align-items-center">
                      <i class="fas fa-times text-danger" style="cursor:pointer" @click="remove(item.id, index)"></i>
                      <i class="fas fa-edit text-primary-blue ms-auto" style="cursor:pointer" data-bs-toggle="modal" :data-bs-target="'#modulesEdit' + index" v-if="permission.editModule"></i>
                  </div>
                  <div class="card-body" @click="redirect(item.id)">
                      <div class="d-flex justify-content-center align-item-center flex-column">
                        <div class="icon-round">
                          <i :class="item.icon"></i>
                        </div>
                        <h6 class="text-center">{{item.name}}</h6>
                      </div>
                  </div>
              </div>
              <ModulesForm @submitData="editModul($event)" :id="'modulesEdit' + index" :modul1="item" :title="$t('buttons.edit_modul')" />
          </div>
        </div>
      </div>
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
    modul: {} as Module,
    error: false as boolean,
    errorMessage: "" as string,
    loading: true as boolean,
    permission: {} as Permission
  }),
  created(){
    let id: string = this.$router.currentRoute.value.params.id.toString()
    let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
    if(user.permissionEntity)
      this.permission = user.permissionEntity
    if(id){
      ModulesService.getModuleById(id).then( (response: ResponseData<Module>) => {
        this.modul = response.data
        this.loading = false;
      }).catch( (err) => {
        console.log(err)
      })
    }
  },
  methods: {
    redirect(id: number){ 
      this.$router.push({ name: 'dashboard',  params: {id: id}})
    },
    remove(id: string) {
      DashboardService.deleteById(id).then( () => {
          this.modul.dashboardEntityList = this.modul.dashboardEntityList.filter( d => d.id != id)
      }).catch( (err) => {
        console.log(err)
      })
    },
    addModul(dash: Dashboard){
      this.modul.dashboardEntityList.push(dash)
      this.httpAddModule()
    },
    editModul(dash: Dashboard){
        let updateItem = this.modul.dashboardEntityList.filter(d => d.id == dash.id)[0];
        if(updateItem){
          let index = this.modul.dashboardEntityList.indexOf(updateItem);
          this.modul.dashboardEntityList[index] = dash;
          this.httpAddModule()
        }
    },
    httpAddModule(){
      ModulesService.addModule(this.modul).then( (response: ResponseData<Module>) => {
          this.modul = response.data
      }).catch( (err) => {
        console.log(err)
      })
    }
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