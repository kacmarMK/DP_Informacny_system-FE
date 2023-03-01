<template lang="">
    <MainContent>
        <Spinner v-if="loading"/>
        <div v-else>
        <Breadcrumb :heading="$t('views.permissions_view.heading')" :second="$t('views.permissions_view.company')" secondPath="/company" :third="$t('views.permissions_view.permissions')"/>
        <div class="container-fluid p-3" v-if="!loading">
           <AlertError :message="$t('views.login_screen.login_invalid')" v-if="error"/>
            <div class="col-12" v-if="isNotEmpty()">
                <div class="card mb-0">
                  <div class="card-header bg-transparent d-flex">
                    <h5>{{$t('views.permissions_view.permissions')}}</h5>
                    <span class="ms-auto"> 
                        <button class="btn btn-primary-blue ms-3" data-bs-toggle="modal" data-bs-target="#AddPermisions">
                          <i class="fas fa-lock me-2"></i>{{$t('views.permissions_view.button')}}
                        </button>
                        <ModalBasicWindow identifier="AddPermisions" :title="$t('views.permissions_view.button')">
                          <NewPermission :comp="company" :title="$t('views.permissions_view.button')" @changePerm="addPerm($event)"/>
                        </ModalBasicWindow>
                    </span>
                   </div>
                    <div class="card-body p-0">
                      <div class="row list-persons">
                        <div class="col-xl-4 xl-50 col-md-5 box-col-6">
                          <div class="nav flex-column nav-pills" id="v-pills-tab1" role="tablist" aria-orientation="vertical">
                            <a class="nav-link" :class="index == 0 ? 'active' : ''" :id="'tab' + permission.name + '' + index" data-bs-toggle="pill" 
                            :href="'#pill' + permission.name + '' + index" role="tab" :aria-controls="'pill' + permission.name + '' + index" 
                            :aria-selected="index == 0 ? true: false" v-for="(permission,index) in company.permissionEntityList" :key="index">
                              <div class="media">
                                <div class="media-body">
                                  <h6>{{permission.name}}</h6>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div class="col-xl-8 xl-50 col-md-7 box-col-6">
                          <div class="tab-content" id="v-pills-tabContent1">
                            <div class="tab-pane fade show" :class="index == 0 ? 'active' : ''" v-for="(permission, index) in company.permissionEntityList" :key="index"
                            :id="'pill' + permission.name + '' + index" role="tabpanel" :aria-labelledby="'pill' + permission.name+ '' + index">
                              <div class="profile-mail">
                                <div class="media">
                                  <div class="media-body mt-0">
                                    <PermissionList :permision="permission"  @changePerm="changePerm($event)"/>
                                  </div>
                                  <button class="btn btn-primary-blue mt-2"  @click="updatePerm()">
                                    <i class="fas fa-lock me-2"></i>{{$t('views.permissions_view.edit_permission')}}
                                  </button>
                                   <button class="btn btn-outline-danger ms-2 p-1 ps-3 pe-3 mt-2"  @click="remove(permission.id)">
                                    <i class="fas fa-times me-2"></i>{{$t('views.permissions_view.delete_permission')}}
                                  </button>
                                </div> 
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  </div>
              </div>
        </div>
    </MainContent>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import MainContent from '../components/MainContent.vue'
import Breadcrumb from '../components/Breadcrumb.vue';
import Permission from "@/interfaces/Permission";
import ResponseData from "@/services/ResponseData";
import AlertError from '../components/AlertError.vue'
import PermissionList from '../components/PermissionsCompontents/PermissionList.vue'
import NewPermission from '../components/PermissionsCompontents/NewPermission.vue'
import ModalBasicWindow from '../components/modals/ModalBasicWindow.vue'
import CompanyService from "@/services/CompanyService";
import Company from "@/interfaces/Company";
import Spinner from '@/components/Spinner.vue';

export default defineComponent({
    name: 'ManagePermisions',
    props: ['id'],
    data: () => ({
      company: {} as Company,
      error: false as boolean,
      loading: true as boolean,
      newPermission: {} as Permission
    }),
    components: {
        MainContent, Breadcrumb,AlertError,PermissionList,
        ModalBasicWindow,Spinner,NewPermission
    },
    created(){

      CompanyService.getCompany(this.id).then( (response: ResponseData<Company>) => {
            this.company = response.data
            this.loading = false
        }).catch( (error) => {
          console.log(error)
          this.loading = false
      })
    },
    methods: {
      isNotEmpty(){
        if(this.company.permissionEntityList)
          return Object.keys(this.company.permissionEntityList).length > 0;

        return false;
      },
      updateCompany(){
        CompanyService.addCompany(this.company).then( (response: ResponseData<Company>) => {
            this.company = response.data
            this.loading = false
        }).catch( (error) => {
          console.log(error)
          this.loading = false
      })
      },
      addPerm(permission: Permission){
         this.company.permissionEntityList?.push(permission)
         this.updateCompany()
      },
      updatePerm(){
        this.updateCompany();
      },
      changePerm(permission: Permission){
        this.company.permissionEntityList = this.company.permissionEntityList?.filter(p => p.id != permission.id)
        this.company.permissionEntityList?.push(permission);
      },
      remove(id: string){
         if(this.company.permissionEntityList){
            this.company.permissionEntityList = this.company.permissionEntityList.filter( p => p.id != id)
            this.updateCompany();
         }
      }
    }
})
</script>
<style scoped>
  .card .card-header {
    padding: 20px;
    border-bottom: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    position: relative;
    background-color: #fff;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #e6edef;
  }

  .nav-pills {
    border-right: 1px solid #e6edef;
    height: 100%;
    transition: all 0.4s ease;
  }

  .nav-pills .nav-link {
    transition: all 0.4s ease;
  }

  .nav-pills .nav-link.active,
  .nav-pills .nav-link > .nav-link,
  .nav-pills .show.active,
  .nav-pills .show > .nav-link,
  .nav-pills .nav-link:hover {
    background-color: rgba(22, 142, 234, 0.1);
    color: var(--blue-primary-color);
  }

  .nav-pills .media {
    padding: 15px;
  }

  .nav-pills .media p {
    color: var(--sidebar-text-color);
    font-size: 0.875rem;
    font-weight: bolder;
  }

  .list-persons .profile-mail {
    padding: 30px 0;
  }

  .list-persons .profile-mail .email-general {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px solid #ddd;
  }

  .general-info {
    font-size: 0.9rem;
  }

</style>