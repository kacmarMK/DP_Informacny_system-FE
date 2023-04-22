<template>
  <MainContent>
    <Spinner v-if="loading"/>
    <div class="container-fluid" v-else>
      <div class="row gutters mt-4">

        <!--<div class="col-xs-6 col-md-6 col-lg-3 col-xxl-3 mb-2" v-if="!hidden">
          <YourCompany icon="fas fa-building" path="/company" :title="company.name" />
        </div>
        <div class="col-xs-6 col-md-6 col-lg-3 col-xxl-3 mb-2">
          <YourCompany icon="fas fa-user" :title="$t('views.home_view.profile_settings')" path="/settings" />
        </div>
        <div class="col-sm-12 col-lg-6  mb-2"  v-if="!hidden">
          <FavoriteModules :modules="modules"/>
        </div>
        <div class="col-sm-12 col-lg-6  mb-2"  v-if="!hidden">
          <FavoriteTeams :teams="teams"/>
        </div>-->
      </div>
    </div>

  </MainContent>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
//import FavoriteModules from '../components/HomeComponents/FavoriteModules.vue'
//import FavoriteTeams from '../components/HomeComponents/FavoriteTeams.vue'
import MainContent from '../components/MainContent.vue'
//import Welcome from '../components/HomeComponents/Welcome.vue'; 
//import YourCompany from '../components/HomeComponents/YourCompany.vue'; 
import User from '@/interfaces/User';
import ResponseData from '@/services/ResponseData';
import Team from '@/interfaces/Team';
import Module from '@/interfaces/Module';
import Favorite from '@/interfaces/Favorite';
import Spinner from '@/components/Spinner.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MainContent,
    //Welcome,
    //YourCompany,
    //FavoriteModules,
    //FavoriteTeams,
    Spinner
  },
  data: () => ({
     hidden: true as boolean,
     modules: new Array<Module>(),
     teams: new Array<Team>(),
     userId: '' as string,    
     loading: true as boolean,

  }),
  created(){
    let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
    if(user.uid){
      this.userId = user.uid
      this.loading = false
    }
  }
})
</script>
