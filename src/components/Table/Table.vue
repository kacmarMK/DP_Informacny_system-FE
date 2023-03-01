<template>
<div class="p-2 overflow-hidden">
  <ComponentLegend :data="data" @setFilter="setFilter($event)"/>
    <ag-grid-vue
    style="width: 100%; height:280px"
    class="ag-theme-material"
    :columnDefs="headers"
    :rowData="data"
  >
  </ag-grid-vue>
  <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-1">
    <ul class="pagination">
      <li class="page-item"><button class="page-link" href="#" @click="setPage(-1)" :disabled=" page === 1 ">Previous</button></li>
      <li class="page-item"><button class="page-link" href="#" @click="setPage(1)">Next</button></li>
    </ul>
  </nav>
</div>
</template>
<script>
import DataService from "@/services/DataService";
import { defineComponent } from "@vue/runtime-core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridVue } from "ag-grid-vue3";
import ComponentLegend from '../DashboardComponents/ComponentLegend.vue'
export default defineComponent({
    name: 'Table',
    props: ['dashboard'],
    components: {
      ComponentLegend,
      AgGridVue
    },
    data: () => ({
        data: [],
        headers: [],
        millisFrom: null,
        millisTo: Math.floor(new Date().getTime() / 1000),
        page: 1
    }),
    created(){
      let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
      this.millisFrom = Math.floor(yesterday.getTime() / 1000)
      this.getData()

    },
    methods: {
      setFilter(data){
        this.millisFrom = Math.floor(new Date(data.from).getTime() / 1000)
        this.millisTo = Math.floor(new Date(data.to).getTime() / 1000)
        this.page = 1 
        this.getData();
      },
      setPage(move){
         this.page = this.page + move;
         this.getData();
      },
      getData(){
        DataService.getTableData(this.millisFrom, this.millisTo, this.page).then( (response) => {          
          let rowData = []

          response.data.forEach( (value) => {
              value.data.date = new Date(value.timestamp * 1000),
              rowData.push(value.data)
          })

          this.data = rowData;
          
          let headers = []
          Object.keys(rowData[0]).forEach( (key) => {
            headers.push(Object.assign({}, {field: key, sortable: true, filter: true, suppressToolPanel: true}))
          })
          this.headers = headers

        }).catch( (err) => {
          this.data = []
          console.log(err)
        })
      }
    }
})
</script>

<style scope>
  th{
    color: #9FA2B4;
  }
</style>
