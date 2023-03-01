<template lang="">
  <MainContent>
    <Spinner v-if="loading"/>
    <div v-else>
      <Breadcrumb :heading="$t('views.teams_view.heading')" :third="$t('views.teams_view.link')"/>
      <div class="container-fluid p-4">
           <div class="row">
            <div class="col-md-12" v-if="teams.length == 0">
                  <h5>{{$t('views.teams_view.not_assigned')}}</h5>
              </div>
              <div v-else>
                  <div class="col-sm-12">
                 <div class="card">
                    <div class="card-body">
                       <div class="tab-content" id="top-tabContent">
                        <div class="tab-pane fade show active" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                          <div class="row">
                            <div class="col-xxl-3 col-lg-4" v-for="(team, index) in teams" :key="index" @click="redirect(team.id)">
                              <div class="project-box">
                                <div class="d-flex justify-content-between">
                                  <h6>{{team.name}}</h6>
                                   <div>
                                      <i class="fas fa-star text-warning" v-if="isFavorite(team.id)" @click.stop="unsetFavoriteTeam(team.id)"></i>
                                      <i class="far fa-star text-warning" v-else @click.stop="setFavoriteTeam(team.id)"></i>
                                   </div>
                                </div>
                                <div class="media">
                                  <img class="img-20 me-2 rounded-circle" src="" alt="" data-original-title="" title="">
                                </div>
                                <p>{{team.description}}</p>
                                <div class="row details">
                                  <div class="col-6"><span>{{$t('views.teams_view.members')}} </span></div>
                                  <div class="col-6 text-primary-blue">{{team.userEntityList.length}}</div>
                                  <div class="col-6"> <span>{{$t('views.teams_view.modules')}}</span></div>
                                  <div class="col-6 text-primary-blue">{{team.moduleEntityList.length}}</div>
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
        </div> 
    </div>
    </MainContent>
</template>
<script lang="ts">
import Team from '@/interfaces/Team'
import MainContent from '../components/MainContent.vue'
import TeamService from '../services/TeamService'
import FavoriteService from '../services/FavoriteService'
import ResponseData from '@/services/ResponseData'
import Breadcrumb from '../components/Breadcrumb.vue'
import Spinner from '../components/Spinner.vue'
import { defineComponent } from '@vue/runtime-core'
import User from '@/interfaces/User'
import Favorite from '@/interfaces/Favorite'
export default defineComponent({
    name: 'TeamsView',
    components: {MainContent,Breadcrumb,Spinner},
    data: () => ({
        teams: [] as Team[],
        loading: true as boolean,
        userId: '' as string,
        favorite: {} as Favorite
    }),
    created() {
        let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
        if(user.id != undefined){
          this.userId = user.id
          TeamService.getTeamsByUserID(user.id).then( (response: ResponseData<Team[]>) => {
              this.teams = response.data
              this.loading = false
          }).catch( (err) => {
              console.log(err)
              this.loading = false
          })
        }
    },
    methods: {
      redirect(id: string){
        this.$router.push({path: '/teams/' + id})
      },
      setFavoriteTeam(teamId: string){
            let team = this.teams.filter( t => t.id == teamId)[0]

            let user = team.userEntityList?.filter( u => u.id == this.userId)[0]

            if(user && user.favoriteEntityList ){
                if(user.favoriteEntityList[0] == null){
                  user.favoriteEntityList = new Array<Favorite>();
                }
                this.favorite.favoriteType = "TEAM"
                this.favorite.objectId = teamId
                user.favoriteEntityList.push(this.favorite)

                team.userEntityList = team.userEntityList?.filter( u => u.id != this.userId)
                team.userEntityList?.push(user)
                this.updateTeam(team)
            }
      },
      isFavorite(teamId: string){
        let team = this.teams.filter( t => t.id == teamId)[0]
        let user = team.userEntityList?.filter( u => u.id == this.userId)[0]
        if(user && user.favoriteEntityList && user.favoriteEntityList[0] != null && user.favoriteEntityList.length > 0  ){
          return user.favoriteEntityList?.filter( f => f.objectId == teamId).length > 0;
        }
        return false;
      },
      unsetFavoriteTeam(teamId: string){
            let team = this.teams.filter( t => t.id == teamId)[0]
            let user = team.userEntityList?.filter( u => u.id == this.userId)[0]
            if(user && user.favoriteEntityList ){
                let favorite = user.favoriteEntityList.filter(f => f.objectId == teamId)[0];
                user.favoriteEntityList = user.favoriteEntityList.filter( f => f.objectId != teamId)
                team.userEntityList = team.userEntityList?.filter( u => u.id != this.userId)
                team.userEntityList?.push(user)

                if(favorite.id){
                  FavoriteService.deleteById(favorite.id).then( () => {
                    console.log("hurra")
                  }).catch( (err) => {
                    console.log(err)
                  })
                }
            }
        },

        updateTeam(team: Team){
            TeamService.addTeam(team).then( (response: ResponseData<Team>) => {
                this.teams = this.teams.filter( t => t.id != team.id)
                this.teams.push(response.data)
            }).catch( (error) => {
                console.log(error)
            })
        }
    }
})
</script>
<style scoped>
.project-box {
    border: 1px solid #e6edef;
    border-radius: 5px;
    padding: 30px;
    margin-bottom: 30px;
    position: relative;
    cursor: pointer;
    height: 15rem;

}

.text-primary-blue,
.project-box,
.project-box p {
    transition: all 0.5s ease;
}

.project-box:hover {
  background: var(--blue-primary-color);
  color: white;
}



.project-box:hover .text-primary-blue,
.project-box:hover p{
  color: white;
}

.project-box p {
    color: #999;
}
</style>
