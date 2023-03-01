<template lang="">
  <div class="p-2">
      <div class="d-flex justify-content-between align-items-center">
          <Buttons />
          <i class="fas fa-filter"></i>
          <ModalBasicWindow ></ModalBasicWindow>
      </div>
      <apexchart width="100%" height="350" type="donut" :options="options" :series="series"></apexchart> 
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import ModalBasicWindow from '../modals/ModalBasicWindow.vue'
import Buttons from './Buttons.vue'
export default defineComponent({
    name: 'PieChart',
    components: {ModalBasicWindow, Buttons},
    data: () => ({
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
        }
    })
})
</script>
