<template lang="">
<div class="p-2">
    <div class="d-flex justify-content-between align-items-center">
        <Buttons />
        <ChartLegend :id="id"/>
    </div>
    <apexchart height="350" type="area" :options="options" :series="series"></apexchart>
</div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import Buttons from './Buttons.vue'
import ChartLegend from './ChartLegend.vue'
import DataService from '@/services/DataService';

export default defineComponent({
    name: 'AreaChart',
    components: {Buttons, ChartLegend},
    data: () => ({
        data: [],
        options: {},
        series: [],
        limit: 100,
        dateFrom: null,
        dateTo: Math.floor(new Date().getTime() / 1000),
        x: 'humidity',
        y: 'temperature',
        loading: true,
    }),
    created() {
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        this.dateFrom = Math.floor(yesterday.getTime() / 1000)
        this.getChartData()
    },
    methods: {
 getChartData(){
        this.loading = true
        console.log(this.limit)
        DataService.getChartData(this.dateFrom, this.dateTo, this.limit).then( (response) => {
            console.log(response.data)

          let rowData = []
          let count = 0
          response.data.forEach( (value) => {
              if(count < this.limit){
                rowData.push(value.data)
              }
              count++;
          })
           let data = rowData.map( obj => Math.round(obj.humidity * 10) / 10)
           let categories = rowData.map(obj => Math.round(obj.temperature * 10) / 10)

           let what = {  chart: {
              type: 'area',
              stacked: false,
              height: 350,
              zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
            },
            xaxis: {
              categories: categories
            },
            }
            this.options = Object.assign({},what)
            this.series = [
                {
                    name: 'Temperature',
                    data: data
                }
            ]
            this.loading = false;
        }) 
        },
    }
})
</script>
<style lang="">
    
</style>