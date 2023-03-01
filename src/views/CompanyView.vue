<template>
  <MainContent>
    <Spinner v-if="loading"/>
    <div v-else>
    <Breadcrumb :heading="$t('views.company_view.breadcrumb_heading')" 
      :third="$t('views.company_view.breadcrumb_heading')" />
      <div class="container" v-if="isEmpty()">
          <CreateOrJoin  @setCompany="setCompany($event)"/>
      </div>
      <div class="container-fluid" v-else>
        <div class="row  mt-4">
            <div class="col-xxl-3 col-xl-4 mb-2" >
              <Navigation :name="company.name" :companyId="company.id" @leaveCompany="leaveCompany()"/>
              <CompanyInfoForm @submitData="changeCompanyInfo($event)" id="infoCompany"  :company1="company" :title="$t('views.company_view.change_company_info')" />
            </div>


             <!-- Members start -->
            <div class="col-xxl-9 col-xl-8 mb-3">
                <div class="card mb-0">
                  <div class="card-header bg-transparent d-flex">
                    <h5>{{$t('views.company_view.members')}}</h5>
                    <div class="input-group rounded w-25 ms-5">
                      <input type="search" class="form-control rounded" placeholder="Search" v-model="membersSearch" aria-label="Search" 
                      aria-describedby="search-addon"  />
                      <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search" @click="searchMember()"></i>
                      </span>
                    </div>
                    <span class="ms-auto">{{$t('views.company_view.number_of_members')}} : {{company.userEntityList?.length}} 
                    </span>
                   </div>
                    <div class="card-body p-0">
                      <div class="row list-persons">
                        <div class="col-xl-4 xl-50 col-md-5 box-col-6">
                          <div class="nav flex-column nav-pills" id="v-pills-tab1" role="tablist" aria-orientation="vertical">
                            <a class="nav-link" :class="index == 0 ? 'active' : ''" :id="'tab' + member.surname+ '' + index" data-bs-toggle="pill" 
                            :href="'#pill' + member.surname+ '' + index" role="tab" :aria-controls="'pill' + member.surname+ '' + index" 
                            :aria-selected="index == 0 ? true: false" v-for="(member,index) in company.userEntityList" :key="index">
                              <div class="media">
                                <div class="media-body">
                                  <h6>{{member.name}} {{member.surname}}</h6>
                                  <p>{{member.email}}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div class="col-xl-8 xl-50 col-md-7 box-col-6">
                          <div class="tab-content" id="v-pills-tabContent1">
                            <div class="tab-pane fade show" :class="index == 0 ? 'active' : ''" v-for="(member, index) in company.userEntityList" :key="index"
                            :id="'pill' + member.surname+ '' + index" role="tabpanel" :aria-labelledby="'pill' + member.surname+ '' + index">
                              <div class="profile-mail">
                                <div class="media">
                                  <div class="media-body mt-0">
                                    <h5>
                                      <span>{{member.name}} </span>
                                      <span class="ms-2">{{member.surname}}</span>
                                    </h5>
                                    <div class="email-general">
                                      <h6>{{$t('views.company_view.teams')}}</h6>
                                    <ul class="nav">
                                      <div v-if="hasMemberAnyTeam()">
                                        <li class="nav-item pe-2 general-info"  v-for="(team, index2) in getMemberTeams()" :key="index2">
                                          {{team.name}}
                                        </li>
                                      </div>
                                      <li class="nav-item pe-2 general-info" v-else>{{$t('views.company_view.no_team_yet')}}</li>
                                    </ul>
                                    </div>
                                    <div class="email-general">
                                      <h6> {{$t('views.company_view.general_info')}}</h6>
                                      <div class="general-info">
                                        {{$t('views.company_view.email_adress')}}
                                        <span class="text-primary-blue ms-2">{{member.email}}</span>
                                      </div>
                                      <div class="general-info mt-1">
                                        {{$t('views.company_view.phone_number')}}
                                        <span class="text-primary-blue ms-2">{{member.phoneNumber}}</span>
                                      </div>
                                    </div>
                                    <ul class="nav">
                                      <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="modal" :data-bs-target="'#changePermission' + member.id" >
                                         {{$t('views.company_view.change_permissions')}}
                                        </a>
                                      </li>
                                      {{permission.removeUserToCompany}}
                                      <li class="nav-item" v-if="permission.removeUserToCompany">
                                        <a  class="nav-link" @click="removeUserFromCompany(member.id)">
                                          {{$t('views.company_view.remove')}}
                                        </a>
                                      </li>
                                    </ul>
                                    <ChangePermissions :company="company" :id="'changePermission' + member.id" 
                                    :permision="member.permissionEntity.name" :userId="member.id" @changePermision="changePermision($event)"
                                    :title="$t('views.company_view.change_permissions')" v-if="permission.changePermissions"/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex justify-content-center">
                          <!-- <Pagination class="mx-auto mt-2" @handlePaging="handleMemberPaging($event)" /> -->
                        </div>
                      </div>
                    </div>
                  </div>

              <!-- Member ends -->

              <!-- Teams start -->
              
                <div class="card mb-0 mt-3">
                  <div class="card-header bg-transparent d-flex">
                    <h5> {{$t('views.company_view.teams')}}</h5>
                    <div class="input-group rounded w-25 ms-5">
                      <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                      <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                      </span>
                    </div>
                    <span class="ms-auto"> 
                       {{$t('views.company_view.number_of_teams')}} : {{company.teamEntityList?.length}} 
                       <button class="btn btn-primary-blue ms-3" data-bs-toggle="modal" 
                       data-bs-target="#addTeam">
                        <i class="fas fa-users me-2"></i>
                          {{$t('views.company_view.add_team')}}
                       </button>
                    </span>
                    <CreateTeam id="addTeam" :title="$t('views.company_view.add_team')" @submitData="createTeam($event)"/>
                  </div>
                    <div class="card-body p-0">
                      <div class="row list-persons">
                        <div class="col-xl-4 xl-50 col-md-5 box-col-6">
                          <div class="nav flex-column nav-pills" id="v-pills-tab1" role="tablist" aria-orientation="vertical">
                            <a class="nav-link" :class="index == 0 ? 'active' : ''" :id="'tabteam' + index" data-bs-toggle="pill" 
                            :href="'#pillteam' + index" role="tab" :aria-controls="'pillteam' + index" 
                            :aria-selected="index == 0 ? true: false" v-for="(team,index) in company.teamEntityList" :key="index">
                              <div class="media">
                                <div class="media-body">
                                  <h6>{{team.name}}</h6>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div class="col-xl-8 xl-50 col-md-7 box-col-6">
                          <div class="tab-content" id="v-pills-tabContent1">
                            <div class="tab-pane fade show" :class="index == 0 ? 'active' : ''" v-for="(team, index) in company.teamEntityList" :key="index"
                            :id="'pillteam'+ index" role="tabpanel" :aria-labelledby="'pillteam' + index">
                              <div class="profile-mail">
                                <div class="media">
                                  <div class="media-body mt-0">
                                    <h5>
                                      <span>{{team.name}} </span>
                                    </h5>
                                    <p>{{team.description}}</p>
                                    <div class="email-general">
                                      <h6>{{$t('views.company_view.members')}}</h6>
                                      <ul class="nav">
                                        <div v-if="team.userEntityList.length > 0">
                                          <li class="nav-item pe-2 general-info"  v-for="(member, index2) in team.userEntityList" :key="index2">
                                            {{member.name}} {{member.surname}}
                                          </li>
                                        </div>
                                        <li class="nav-item pe-2 general-info" v-else>
                                          {{$t('views.company_view.no_member_yet')}}
                                        </li>
                                      </ul>
                                    </div>
                                    <div class="email-general">
                                      <h6> {{$t('views.company_view.modules')}}</h6>
                                      <ul class="nav">
                                        <div v-if="team.moduleEntityList.length > 0">
                                          <li class="nav-item pe-2 general-info"  v-for="(modul, index3) in team.moduleEntityList" :key="index3">
                                            {{modul.name}} 
                                          </li>
                                        </div> 
                                        <li class="nav-item pe-2 general-info" v-else>{{$t('views.company_view.no_modules_yet')}}</li>
                                      </ul>
                                    </div>

                                    <ul class="nav">
                                      <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="modal" :data-bs-target="'#editTeam' + team.id" v-if="permission.addTeam">
                                          {{$t('views.company_view.edit_team')}}
                                        </a>
                                        <CreateTeam :id="'editTeam' + team.id" :title="$t('views.company_view.edit_team')" :team1="team" @submitData="createTeam($event)" />
                                      </li>
                                      <li class="nav-item" v-if="permission.removeTeam"> 
                                        <a  class="nav-link" href="javascript:void(0)" @click="removeTeamFromCompany(team.id)">
                                          {{$t('views.company_view.remove')}}
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex justify-content-center">
                          <!-- <Pagination @handlePaging="handleTeamPaging($event)" class="mt-2" /> -->
                        </div>
                      </div>
                    </div>
                  </div> 
            <!-- teams end -->
            </div>
          </div>
        </div>
      </div>
  </MainContent>
</template>

<script lang="ts">
import Company from '@/interfaces/Company';
import CompanyService from '@/services/CompanyService';
import {defineComponent} from 'vue';
import Navigation from '../components/CompanyComponents/Navigation.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
// import Pagination from '../components/Pagination.vue'
import MainContent from '../components/MainContent.vue'
import CompanyInfoForm from '../components/CompanyComponents/CompanyInfoForm.vue'
import ChangePermissions from '../components/CompanyComponents/ChangePermissions.vue'
import Spinner from '@/components/Spinner.vue';
import CreateTeam from '../components/TeamComponents/CreateTeam.vue'
import CreateOrJoin from '../components/CompanyComponents/CreateOrJoin.vue'
import User from '@/interfaces/User';
import ResponseData from '@/services/ResponseData';
import Team from '@/interfaces/Team';
import Module from '@/interfaces/Module';
import Permission from '@/interfaces/Permission';
import UserService from '@/services/UserService';
import TeamService from '@/services/TeamService';

export default defineComponent({
  name: 'CompanyView',
  components: {
    MainContent,
    Breadcrumb,
    // Pagination,
    CompanyInfoForm,
    ChangePermissions,
    Spinner,
    CreateTeam,
    CreateOrJoin,
    Navigation
  },
  props: ['id'],
  data: () => ({
    company: {} as Company,
    loading: true as boolean,
    members: [] as User[],
    teams: [] as Team[],
    permission: {} as Permission,
    membersSearch: '' as string,
    teamsSearch: '' as string
  }),
  created(){
     let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));

     if(user.permissionEntity)
      this.permission = user.permissionEntity

     let id = user.id != undefined ? user.id : ""
     CompanyService.getCompanyIdByUserId(id).then( (response: ResponseData<Company[]>) => {
            this.company = response.data[0]
            this.loading = false
      }).catch( (error) => {
        console.log(error)
        this.loading = false
      })
  },
  methods: {
    removeUserFromCompany(id: string){
      this.company.userEntityList = this.company.userEntityList?.filter(user => user.id != id);
      this.updateCompany()
    },
    removeTeamFromCompany(id: string){
      TeamService.removeTeam(id).then( () => { console.log("fess ppci") });
      this.company.teamEntityList = this.company.teamEntityList?.filter(team => team.id != id);
      this.updateCompany()
    },
    isEmpty(){
      return Object.keys(this.company).length == 0;
    },
    searchMember(){
      // this.company.userEntityList?.filter( m => )
      // this.membersSearch 
    },
    handleMemberPaging(event: any){
      console.log(event)
    },
    handleTeamPaging(event: any){
      console.log(event)
    },
    changeCompanyInfo(event: Company){
      this.company = event
      this.updateCompany()
    },
    createTeam(team: Team){
      console.log(team)
      if(team.id != undefined && team.id != ''){
        this.removeTeamFromCompany(team.id);
      } else {
        team.userEntityList = new Array<User>();
        let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
        team.userEntityList.push(user);
        team.moduleEntityList = new Array<Module>();
      }
      
      this.company.teamEntityList?.push(team);
      this.updateCompany()
    },
    updateCompany(){
       CompanyService.addCompany(this.company).then( (response: ResponseData<Company>) => {
        this.company = response.data
      }).catch( (error) => {
        console.log(error)
      })
    },
    ChangePermissions(){
      console.log("perm")
    },
    hasMemberAnyTeam(memberId: string){
      this.company.teamEntityList?.forEach( (team: Team) => {
        let userFound = team.userEntityList?.filter( u => u.id == memberId);
        if(userFound != undefined && userFound.length > 0){
          return true;
        }
      })
      return false;
    },
    getMemberTeams(memberId: string){
      let teams = new Array<Team>();
      this.company.teamEntityList?.forEach( (team: Team) => {
        let userFound = team.userEntityList?.filter( u => u.id == memberId);
        if(userFound != undefined && userFound.length > 0){
          teams.push(team)
        }
      })

      return teams;
    },
    setCompany(company: Company){
      this.company = company;
    },
    leaveCompany(){
      let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
      let id = user.id != undefined ? user.id : ""
      this.company.userEntityList = this.company.userEntityList?.filter( u => u.id != id);
      this.loading= true;
      CompanyService.addCompany(this.company).then( (response: ResponseData<Company>) => {
        this.company = {} as Company;
        this.loading= false;
      }).catch( (error) => {
        console.log(error)
      })
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
  .nav-pills .nav-link:hover,
  .input-group-text {
    background-color: rgba(22, 142, 234, 0.1);
    color: var(--blue-primary-color);
  }



  .nav-pills .media {
    padding: 15px;
  }

  ul.nav li:first-child a{
    padding: 0.5rem 0;
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