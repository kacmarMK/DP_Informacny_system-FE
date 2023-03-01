<template lang="">
    <div class="card p-3"  style="min-height: 6rem">
        <h5 class="fw-bolder">{{$t('views.home_view.favorite_teams')}}</h5>
        <table class="table table-bordernone table-hover">
            <tbody>
                <tr v-for="(item, index) in teams" :key="index">
                    <FavoriteList :index="index + 1"
                    :name="item.name" :path="'/teams/' + item.id"
                    />
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import FavoriteList from './FavoriteList.vue'

export default defineComponent({
    name: 'FavoriteTeams',
    props: ['teams'],
    components: {
        FavoriteList
    },

})
</script>
<style scoped>
    .table-bordernone {
        border: 1px solid white;
    }
    td {
        padding: 15px;
    }
    .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
        background-color: var(--light-blue-bg-rgb);
    }
</style>