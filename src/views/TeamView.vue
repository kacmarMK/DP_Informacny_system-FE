<template lang="">
    <MainContent>
        <Spinner v-if="loading"/>
        <div v-else>
        <Breadcrumb :heading="team.name" :second="$t('views.teams_view.link')" secondPath="/teams" :third="team.name"/>
        
        </div>
    </MainContent>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MainContent from "../components/MainContent.vue";
import Team from "@/interfaces/Team";
//import TeamService from "@/services/TeamService";
import Breadcrumb from "../components/Breadcrumb.vue";
//import AddModuleForm from "../components/TeamComponents/AddModuleForm.vue";
import AddMemberForm from "../components/TeamComponents/AddMemberForm.vue";
//import ResponseData from "@/services/ResponseData";
//import User from "@/interfaces/User";
//import Module from "@/interfaces/Module";
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
    //AddModuleForm,
    //AddMemberForm,
    Spinner,
    //ModalBasicWindow,
    //Avataaars,
  },
  data: () => ({
    team: {} as Team,
    loading: true as boolean,
    permission: {} as Permission,
    avatar: {} as Avatar,
  }),
  created() {/*
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
      });*/
  },
  methods: {
    /*removeUser(id: string) {
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
    },*/
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