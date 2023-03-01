<template lang="">
    <MainContent>
        <Spinner v-if="loading"/>
        <div v-else>
        <Breadcrumb :heading="team.name" :second="$t('views.teams_view.link')" secondPath="/teams" :third="team.name"/>
        <div class="container-fluid">
            <div class="d-flex justify-content-start mt-3">
                <button class="btn btn-primary-blue p-2" data-bs-toggle="modal" data-bs-target="#moduleAdd">
                    <i class="fas fa-microchip me-1"></i>
                    {{$t("buttons.add_modul")}}
                </button>
                <button class="btn btn-primary-blue p-2 ms-2" data-bs-toggle="modal" data-bs-target="#memberAdd">
                    <i class="fas fa-user me-1"></i>
                    {{$t("buttons.add_member")}}
                </button>
                <AddModuleForm id="moduleAdd"  :title="$t('buttons.add_modul')" @addModuleToteam="addModule($event)" />
                <AddMemberForm id="memberAdd"  :users="team.userEntityList" 
                :title="$t('buttons.add_member')" @addUserToteam="addMember($event)"  />

            </div>
            <div class="row mt-2 display-table">
                <div class="col-lg-8">
                    <div class="card p-3"  style="min-height: 6rem">
                        <h5 class="fw-bolder">{{$t('views.teams_view.members')}}</h5>
                            <table class="table table-bordernone table-hover mt-3">
                                    <thead>
                                        <th>{{$t('views.team_view.first_name')}}</th>
                                        <th>{{$t('views.team_view.surname')}}</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in team.userEntityList" :key="index">
                                            <td class="ps-0"><a class="primary-link" data-bs-toggle="modal" :data-bs-target="'#' + item.name + '' + item.surname + '' + index">{{item.name}}</a></td>
                                            <td class="ps-0">{{item.surname}}</td>
                                            <td  class="ps-0"><i class="fas fa-times text-danger" @click.stop="removeUser(item.id)" v-if="permission.removeModule"></i></td>
                                            <ModalBasicWindow  :identifier="item.name + '' + item.surname + '' + index" title="User Profile">
                                                <div class="modal-body p-4">
                                                    <div class="row">
                                                        <div class="col-lg-4 d-flex justify-content-center align-items-center">
                                                        <div class="w-100 h-100">
                                                            <avataaars
                                                            :clotheType="avatar.clotheType"
                                                            :accessoriesType="avatar.accessoriesType"
                                                            :clotheColor="avatar.clotheColor"
                                                            :eyebrowType="avatar.eyebrowType"
                                                            :eyeType="avatar.eyeType"
                                                            :mouthType="avatar.mouthType"
                                                            :facialHairColor="avatar.facialHairColor"
                                                            :facialHairType="avatar.facialHairType"
                                                            :hairColor="avatar.hairColor"
                                                            :skinColor="avatar.skinColor"
                                                            :topColor="avatar.topColor"
                                                            :topType="avatar.topType"
                                                            :graphicType="avatar.graphicType">
                                                            </avataaars>
                                                        </div>
                                                        </div>
                                                        <div class="col-lg-8">
                                                            <div class="row">
                                                                <div class="col-lg-6 mb-4">
                                                                    <h6>{{$t('views.team_view.first_name')}}</h6>
                                                                    <span>{{item.name}}</span>
                                                                </div>
                                                                <div class="col-lg-6 mb-4">
                                                                   <h6>{{$t('views.team_view.surname')}}</h6>
                                                                    <span>{{item.surname}}</span>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                   <h6>{{$t('views.team_view.email')}}</h6>
                                                                    <span>{{item.email}}</span>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                   <h6>{{$t('views.team_view.phone')}}</h6>
                                                                    <span>{{item.phone}}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ModalBasicWindow>
                                        </tr>
                                    </tbody>
                            </table>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card p-3"  style="min-height: 6rem">
                        <h5 class="fw-bolder">{{$t('views.teams_view.modules')}}</h5>
                        <table class="table table-bordernone table-hover mt-3">
                            <thead>
                                <th>{{$t('views.team_view.name')}}</th>
                                <th></th>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in team.moduleEntityList" :key="index" style="cursor:pointer" @click="redirect(item.id)">
                                    <td class="ps-0">{{item.name}}</td>
                                    <td class="ps-0"><i class="fas fa-times text-danger" style="cursor:pointer"  @click.stop="removeModule(item.id)"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </MainContent>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MainContent from "../components/MainContent.vue";
import Team from "@/interfaces/Team";
import TeamService from "@/services/TeamService";
import Breadcrumb from "../components/Breadcrumb.vue";
import AddModuleForm from "../components/TeamComponents/AddModuleForm.vue";
import AddMemberForm from "../components/TeamComponents/AddMemberForm.vue";
import ResponseData from "@/services/ResponseData";
import User from "@/interfaces/User";
import Module from "@/interfaces/Module";
import Spinner from "@/components/Spinner.vue";
import Permission from "@/interfaces/Permission";
import ModalBasicWindow from "../components/modals/ModalBasicWindow.vue";
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import Avatar from "@/interfaces/Avatar";

export default defineComponent({
  name: "TeamView",
  props: ["id"],
  components: {
    MainContent,
    Breadcrumb,
    AddModuleForm,
    AddMemberForm,
    Spinner,
    ModalBasicWindow,
    Avataaars,
  },
  data: () => ({
    team: {} as Team,
    loading: true as boolean,
    permission: {} as Permission,
    avatar: {} as Avatar,
  }),
  created() {
    let user: User = Object.assign({},JSON.parse(sessionStorage.getItem("user") || "{}"));
    
    if (user.permissionEntity) this.permission = user.permissionEntity;
    if(user.avatar) this.avatar = JSON.parse(user.avatar)

    TeamService.getTeamById(this.id)
      .then((response: ResponseData<Team>) => {
        this.team = response.data;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    removeUser(id: string) {
      this.team.userEntityList = this.team.userEntityList?.filter(
        (u) => u.id != id
      );
      this.updateTeam();
    },
    removeModule(id: string) {
      this.team.moduleEntityList = this.team.moduleEntityList?.filter(
        (m) => m.id != id
      );
      this.updateTeam();
    },
    addMember(user: User) {
      if (Object.keys(user).length > 0) {
        this.team.userEntityList?.push(user);
        this.updateTeam();
      }
    },
    updateTeam() {
      TeamService.addTeam(this.team)
        .then((response: ResponseData<Team>) => {
          this.team = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    redirect(id: number) {
      this.$router.push({ path: "/modules/" + id });
    },
    addModule(module: Module) {
      if (Object.keys(module).length > 0) {
        this.team.moduleEntityList?.push(module);
        this.updateTeam();
      }
    },
  },
});
</script>
<style scoped>
.table-bordernone {
  border: 1px solid white;
}
td {
  padding: 15px;
}
.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: var(--light-blue-bg-rgb);
  color: var(--blue-primary-color);
}
</style>