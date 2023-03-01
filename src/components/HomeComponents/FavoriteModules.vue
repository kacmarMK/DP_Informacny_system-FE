<template>
    <div class="card p-3"  style="min-height: 6rem">
        <h5 class="fw-bolder">{{$t('views.home_view.favorite_modules')}}</h5>
        <table class="table table-bordernone table-hover">
            <tbody>
                <tr v-for="(item, index) in modules" :key="index">
                    <FavoriteList :index="index + 1" :name="item.name" :path="'/modules/' + item.id"
                    />
                </tr>
            </tbody>
        </table>
    </div>                
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import FavoriteList from './FavoriteList.vue'
export default defineComponent({
    name: 'FavoriteModules',
    components: {
        FavoriteList
    },
    props: ['modules']

})
</script>
<style scoped>
    .table-bordernone {
        border: 1px solid white;
    }
</style>