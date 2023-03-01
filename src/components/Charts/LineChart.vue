<template lang="">
<div class="p-2">
    <div class="d-flex justify-content-between align-items-center">
        <Buttons @changeDateTime="changeDateTime($event)" />
        <ChartLegend :id="id" @setFilter="setFilter($event)"/>
    </div>
    <div class="loading" v-if="loading">
    </div>
    <apexchart height="350" type="line" :options="options" :series="series" v-else></apexchart>
</div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";

import Buttons from './Buttons.vue'
import DataService from '@/services/DataService';
import ChartLegend from './ChartLegend.vue'
export default defineComponent({
    name: 'LineChart',
    components: {Buttons, ChartLegend},
    props: {
        id: Number
    },
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
        changeSettings(data){
            console.log(data)
        },
        changeDateTime(data){
            this.dateFrom = data.from;
            this.dateTo = data.to;
            this.getChartData();
        },
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
              type: 'line',
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
        }).catch( () => {
            this.loading = false
        })
        
        },
        setFilter(data){
            this.dateFrom = data.from
            this.dateTo = data.to
            this.limit = data.limit
            this.x = data.x
            this.y = data.y
            this.getChartData();
      },
    }
})
</script>
<style>

    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        height: 30vh;
    }
    .loading::after {
        content: '';
        width: 80px;
        height: 80px;
        border: 5px solid #fff;
        border-top-color: var(--blue-primary-color);
        border-radius: 50%;
        animation: loading 1s ease infinite;
    }
    
    .loading-bg p {
        animation: loadingText 1s ease infinite;
    }
    @keyframes loading {
        to{
            transform: rotate(1turn);
        }
    }

    @keyframes loadingText {
	0% {
		transform: scale(0.95);
	}

	70% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.95);
	}
    }

</style>