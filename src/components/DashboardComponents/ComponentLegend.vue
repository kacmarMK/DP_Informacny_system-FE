<template>
  <nav class="navbar navbar-expand-sm navbar-light">
    <ul class="navbar-nav ms-auto">
        <li class="nav-item active">
          <a class="nav-link"  data-bs-toggle="modal" :data-bs-target="'#modalTableFilter' + this.index" ><i class="fas fa-filter fa-lg"></i></a>
        </li>
       <ModalBasicWindow :identifier="'modalTableFilter' + this.index" title="Filter">
            <form @submit.prevent>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email" class="fw-bolder">Date from</label>
                                <flat-pickr v-model="dateFrom"></flat-pickr>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email" class="fw-bolder">Date to</label>
                                 <flat-pickr v-model="dateTo"></flat-pickr>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="setDateRange()" value="Save"/>
                </div>
            </form>
        </ModalBasicWindow>

        <li class="nav-item active">
          <a class="nav-link" data-bs-toggle="modal" :data-bs-target="'#modalTableExport' + this.index"><i class="fas fa-file-csv fa-lg"></i></a>
        </li>

        <ModalBasicWindow :identifier="'modalTableExport' + this.index" title="Filter">
            <form @submit.prevent>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email" class="fw-bolder">Date from</label>
                                <flat-pickr v-model="dateExportFrom"></flat-pickr>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email" class="fw-bolder">Date to</label>
                                 <flat-pickr v-model="dateExportTo"></flat-pickr>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">

                    <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal"  @click="exportCSVFile(new Date().getTime())" value="Export"/>
                </div>
            </form>
        </ModalBasicWindow>
    </ul>
  </nav>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import ModalBasicWindow from '../modals/ModalBasicWindow'
import DataService from '@/services/DataService'
export default defineComponent({
    name: 'ComponentLegend',
    components: {flatPickr, ModalBasicWindow},
    emits: ['setFilter'],
    data: () => ({
      dateFrom: null,
      dateTo: null,
      dateExportFrom: null,
      dateExportTo: null,
      data: []
    }),
    props: ['index'],
    methods: {
    convertToCSV(objArray) {
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      for (let i = 0; i < array.length; i++) { // eslint-disable-line
        let line = '';
        for (const index in array[i]) { // eslint-disable-line
          if (line !== '') line += ',';
          line += array[i][index];
        }
        str += line + '\r\n'; // eslint-disable-line
      }
      return str;
    },
  exportCSVFile(fileTitle) {
        let headers = []
        this.getData()
        let data = this.data
        console.log(data)
        Object.keys(data[0]).forEach((key) => {
            headers.push(key)
        })

        if (headers) {
          data.unshift(headers);
        }
        const jsonObject = JSON.stringify(data);
        const csv = this.convertToCSV(jsonObject);
        const exportedFilenmae = fileTitle + '.csv' || 'export.csv'; // eslint-disable-line
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      },
      setDateRange(){
        this.$emit('setFilter', {
          from: this.dateFrom,
          to: this.dateTo
        })
      },
      getData(){
        let millisFrom = Math.floor(new Date(this.dateExportFrom) / 1000);
        let millisTo = Math.floor(new Date(this.dateExportTo) / 1000);
        DataService.getAllData(millisFrom, millisTo).then( (response) => {          
            let rowData = []
            console.log(response.data)
            response.data.forEach( (value) => {
                value.data.date = new Date(value.timestamp * 1000),
                rowData.push(value.data)
            })

            this.data = rowData;
        }).catch( (err) => {
            console.log(err)
        })

      }
    }

})
</script>


