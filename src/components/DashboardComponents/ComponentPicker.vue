<template lang="">
<div class="container">
    <div class="row">
        <div class="col-4 component mb-1" data-bs-dismiss="modal" @click="pickComponent(table)">
            <div class="d-block">
                <i class="fas fa-table fa-2x"></i>
                <h6>Table</h6>
            </div>
        </div>
        <div class="col-4 component mb-1" data-bs-dismiss="modal" @click="pickComponent(chartPie)">
            <div class="d-block">
                <i class="fas fa-chart-pie fa-2x"></i>
                <h6>Pie Chart</h6>
            </div>
        </div>
        <div class="col-4 component mb-1" data-bs-dismiss="modal" @click="pickComponent(chartBar)">
            <div class="d-block">
                <i class="fas fa-chart-bar fa-2x"></i>
                <h6>Bar Chart</h6>
            </div>
        </div>
        <div class="col-4 component mb-1" data-bs-dismiss="modal" @click="pickComponent(chartLine)">
            <div class="d-block">
                <i class="fas fa-chart-line fa-2x"></i>
                <h6>Line Chart</h6>
            </div>
        </div>
        <div class="col-4 component mb-1" data-bs-dismiss="modal" @click="pickComponent(chartArea)">
            <div class="d-block">
                <i class="fas fa-chart-area fa-2x"></i>
                <h6>Area Chart</h6>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'ComponentPicker',
    data: () => ({
        table: "Table",
        chartPie: "PieChart",
        chartLine: "LineChart",
        chartArea: "AreaChart",
        chartBar: "BarChart"
    }),
    emits: ["pickComponent"],
    methods: {
        pickComponent(layout: string){
            this.$emit('pickComponent', {
                layout: layout
            })
        }

    }
})
</script>
<style scoped>
    .component {
        border: 1.5px solid var(--light-blue-bg-rgb);
        color: var(--blue-primary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 8rem;
        transition: all 0.5s ease;
        cursor: pointer;
    }

    .component:hover {
        background-color: var(--blue-primary-color);
        color: white ;
    }
</style>
