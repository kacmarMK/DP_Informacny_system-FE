<template lang="">
    <div class="p-2">
        <div class="d-flex justify-content-center align-items-center flex-column">
             <i :class="dashboard.icon" class="fa-2x"></i>
            <h6>{{dashboard.name}}</h6>
            <h5>{{dashboard.value}}</h5>
        </div>
    </div>
</template>
<script lang="ts">
import Dashboard from '@/interfaces/Dashboard'
import DashboardService from '@/services/DashboardService'
import ResponseData from '@/services/ResponseData'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
    name: 'SetupedValue',
    props: ['param1', 'param2'],
    data: () => ({
        dashboard: {} as Dashboard
    }),
    created(){
        DashboardService.getDashboardById(this.param1).then( (response: ResponseData<Dashboard>) => {
            this.dashboard = response.data;
        }).catch( (err) => {
            console.log(err)
        })
    }
})
</script>
<style lang="">
    
</style>