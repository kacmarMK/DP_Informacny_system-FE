<template lang="">
    <div class="p-2">
        <div class="d-flex justify-content-between align-items-center">
            <Buttons />
            <ChartLegend :id="id" />
        </div>
         <apexchart width="100%" height="350" type="bar" :options="options" :series="series"></apexchart> 
    </div>
</template>
<script lang="ts">
import Buttons from './Buttons.vue'
import { defineComponent } from "@vue/runtime-core";
import ChartLegend from './ChartLegend.vue'

export default defineComponent({
    name: 'BarChart',
    components: {Buttons, ChartLegend},
    data: () => ({
        options: {
            chart: {
            id: 'vuechart-example'
            },
            xaxis: {
            categories: ['2022/5/15', "2022/5/16", "2022/5/17", "2022/5/18", "2022/5/19", "2022/5/20", "2022/5/21", "2022/5/22"]
            }
            },
        series: [{
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
    })
})
</script>
<style lang="">
    
</style>