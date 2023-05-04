<template>
  <MainContent>
    <div class="container-fluid">
      <div>
        <HomePanel :heading="$t('main_content.sidebar_menu.notifications')"/>
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
import HomePanel from '@/components/HomeComponents/HomePanel.vue'
//import GrafanaDashboard from '@/components/GrafanaDashboard.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MainContent,
    //Welcome,
    //YourCompany,
    //FavoriteModules,
    //FavoriteTeams,
    //GrafanaDashboard,
    HomePanel
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

<style>

</style>