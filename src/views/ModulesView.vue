<template lang="">
    <MainContent>
        <Spinner v-if="loading"/>
        <div v-else>
        <Breadcrumb :heading="$t('views.modules_view.heading')" :third="$t('views.modules_view.link')"/>
        <div class="container-fluid p-3">
              <div class="row">
                <div class="col-xxl-3 col-4" v-for="(team, i) in company.teamEntityList" :key="i">
                    <h3>{{team.name}}</h3>
                    <draggable 
                        class="list-group bg-white p-2"
                        :list="team.moduleEntityList"
                        group="people"
                        @change="log"
                        itemKey="name"
                        @end="onDrop()"
                    >   
                        <template #item="{ element }">
                          <div class="list-group-item mb-2 bg-light">
                              <div class="d-flex justify-content-between">
                                <a class="fw-bolder text-dark" @click="route(element.id, 'modules')">{{ element.name }}</a>
                                <div>
                                    <i class="fas fa-star text-warning" v-if="isFavorite(element.id)" @click="unsetFavoriteModules(element.id)"></i>
                                    <i class="far fa-star text-warning" v-else @click="setFavoriteModules(element.id)"></i>
                                </div>
                              </div>
                              <ul class="ps-2">
                                  <li v-for="(item, index) in element.dashboardEntityList" :key="index"><a href="#" @click="route(item.id, 'dashboard')">{{item.name}}</a></li>
                              </ul>
                          </div>
                        </template>
                    </draggable>
                </div>
            </div>
          </div>
        </div>
    </MainContent>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import draggable from 'vuedraggable'
import MainContent from '../components/MainContent.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import User from "@/interfaces/User";
import CompanyService from "@/services/CompanyService";
import Company from "@/interfaces/Company";
import ResponseData from "@/services/ResponseData";
import Favorite from "@/interfaces/Favorite";
import Spinner from '@/components/Spinner.vue';

export default defineComponent({
    name: 'ModulesView',
    components: {
        draggable,MainContent,Breadcrumb,Spinner 
    },
    data: () => ({
        company: {} as Company,
        favorite: {} as Favorite,
        userId: '' as string,
        loading: true as boolean
    }),
    created() {
        let user: User = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'))
        if(user.id != undefined){
            this.userId = user.id
            CompanyService.getCompanyIdByUserId(user.id).then( (response: ResponseData<Company[]>) => {
                this.company = response.data[0]
                this.loading = false;
            }).catch( (err) => {
                console.log(err)
            })
        }
    },
    methods: {
        route(id: string, path: string){
             this.$router.push({path: '/' + path + '/' + id})
        },
        onDrop(){
            console.log(this.company.teamEntityList)
            CompanyService.addCompany(this.company).then( (response: ResponseData<Company>) => {
                this.company = response.data
            }).catch( (err) => {
                console.log(err)
            })
        },
        setFavoriteModules(id: string){ 
            console.log("hello")
            let user = this.company.userEntityList?.filter( u => u.id == this.userId)[0]
            if(user && user.favoriteEntityList ){
                if(user.favoriteEntityList[0] == null){
                  user.favoriteEntityList = new Array<Favorite>();
                }
                this.favorite.favoriteType = "MODULE"
                this.favorite.objectId = id
                user.favoriteEntityList.push(this.favorite)

                this.company.userEntityList = this.company.userEntityList?.filter( u => u.id != this.userId)
                this.company.userEntityList?.push(user)
                this.updateCompany()
            }

        },
        unsetFavoriteModules(id:string){
            let user = this.company.userEntityList?.filter( u => u.id == this.userId)[0]
            if(user && user.favoriteEntityList ){
                user.favoriteEntityList = user.favoriteEntityList.filter( f => f.objectId != id)
                this.company.userEntityList = this.company.userEntityList?.filter( u => u.id != this.userId)
                this.company.userEntityList?.push(user)
                this.updateCompany()
            }
        },
        isFavorite(id: string){
           let user = this.company.userEntityList?.filter( u => u.id == this.userId)[0]
           if(user && user.favoriteEntityList && user.favoriteEntityList[0] != null && user.favoriteEntityList.length > 0  ){
             return user.favoriteEntityList?.filter( f => f.objectId == id).length > 0;
           }
           return false;
        },
        updateCompany(){
            CompanyService.addCompany(this.company).then( (response: ResponseData<Company>) => {
                this.company = response.data
            }).catch( (error) => {
                console.log(error)
            })
        }
    }
})
</script>
<style scoped>
    ul li {
        list-style: none;
    }
    
    ul{ 
        padding: 0;
    }
</style>