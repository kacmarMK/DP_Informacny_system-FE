<template lang="">
  <MainContent>
    <Spinner v-if="loading"/>
    <div v-else>
      <Breadcrumb :heading="$t('views.teams_view.heading')" :third="$t('views.teams_view.link')"/>
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
    data: () => ({/*
        teams: [] as Team[],
        loading: true as boolean,
        userId: '' as string,
        favorite: {} as Favorite*/
    }),
    created() {
    },
    methods: {
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
