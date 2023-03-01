<template>
  <MainContent>
    <Spinner v-if="loading"/>
    <div class="container-fluid" v-else>
      <div class="row gutters mt-4">
        <div class="col-sm-12 col-lg-6  mb-2">
          <Welcome />
        </div>
        <div class="col-xs-6 col-md-6 col-lg-3 col-xxl-3 mb-2" v-if="!hidden">
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
        </div>
      </div>
    </div>

  </MainContent>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FavoriteModules from '../components/HomeComponents/FavoriteModules.vue'
import FavoriteTeams from '../components/HomeComponents/FavoriteTeams.vue'
import MainContent from '../components/MainContent.vue'
import Welcome from '../components/HomeComponents/Welcome.vue'; 
import YourCompany from '../components/HomeComponents/YourCompany.vue'; 
import User from '@/interfaces/User';
import CompanyService from '@/services/CompanyService';
import Company from '@/interfaces/Company';
import ResponseData from '@/services/ResponseData';
import Team from '@/interfaces/Team';
import Module from '@/interfaces/Module';
import Favorite from '@/interfaces/Favorite';
import Spinner from '@/components/Spinner.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MainContent,
    Welcome,
    YourCompany,
    FavoriteModules,
    FavoriteTeams,
    Spinner
  },
  data: () => ({
     hidden: true as boolean,
     company: {} as Company,
     modules: new Array<Module>(),
     teams: new Array<Team>(),
     userId: '' as string,    
     loading: true as boolean,

  }),
  created(){
    let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
    if(user.id){
      this.userId = user.id
      CompanyService.getCompanyIdByUserId(user.id).then( (response : ResponseData<Company[]>) => {
        this.company = response.data[0]
        this.hidden = false;
        let user = this.company.userEntityList?.filter( u => u.id == this.userId)[0] as User
        if(user.favoriteEntityList)
          this.setFavorites(user.favoriteEntityList);
          this.loading = false
      }).catch( (err) => {
        console.log(err)
        this.loading = false
      })
    }

  },
  methods: {
    setFavorites(favorites: Favorite[]){
      console.log(favorites)
        favorites.forEach( (value: Favorite) => {
          if(value.favoriteType == "TEAM"){
            let team = this.company.teamEntityList?.filter( t => t.id = value.objectId)[0]
            if(team){
              this.teams.push(team)
            }
          }

          if(value.favoriteType == "MODULE"){
            let team = this.company.teamEntityList?.filter( t => t.id = value.objectId)[0]
            let module = team?.moduleEntityList?.filter(m => m.id = value.objectId)[0]
            if(module) this.modules.push(module);
          }
        })
    }
  }
})
</script>
