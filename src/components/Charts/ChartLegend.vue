<template lang="">
        <div>
            <i class="fas fa-filter" data-bs-toggle="modal" style="cursor: pointer" :data-bs-target="'#modalFilter' + this.id"></i>
            <i class="fas fa-cog ms-2" data-bs-toggle="modal"  style="cursor: pointer"  :data-bs-target="'#modalSettings' + this.id"></i>
        </div>
        <ModalBasicWindow :identifier="'modalSettings' + this.id" title="Settings">
            <form @submit.prevent>
                <div class="modal-body">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>X axis</option>
                                    <option value="1">Temperature</option>
                                    <option value="2">Date</option>
                                    <option value="3">Carbon Dioxide</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">                                
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Y axis</option>
                                    <option value="1">Date</option>
                                    <option value="2">Temperature</option>
                                    <option value="3">Carbon Dioxide</option>
                                </select>
                            </div>
                        </div>
                </div>
                <div class="modal-footer bg-light">
                    <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="changeSettings()" :value="title"/>
                </div>
            </form>
        </ModalBasicWindow>
        <ModalBasicWindow :identifier="'modalFilter' + this.id" title="Filter">
            <form @submit.prevent>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email" class="fw-bolder">Number of plotted points</label>
                                <input type="number" v-model="limit" class="form-control" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email" class="fw-bolder">Date from</label>
                                <flat-pickr class="form-control bg-white" v-model="dateFrom"></flat-pickr>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email" class="fw-bolder">Date to</label>
                                 <flat-pickr class="form-control bg-white" v-model="dateTo"></flat-pickr>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email" class="fw-bolder">X axis</label>
                                <select class="form-select" v-model="xAxis" aria-label="Default select example">
                                    <option value="">Select value</option>
                                    <option value="temperature">Temperature</option>
                                    <option value="date">Date</option>
                                    <option value="humidity">Humidity</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group"> 
                                <label for="email" class="fw-bolder">Y axis</label>                               
                                <select class="form-select" v-model="yAxis" aria-label="Default select example">
                                    <option value="">Select value</option>
                                    <option value="date">Date</option>
                                    <option value="temperature">Temperature</option>
                                    <option value="humidity">Humidity</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light">
                    <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submit()" value="Save"/>
                </div>
            </form>
        </ModalBasicWindow>
</template>
<script>
import ModalBasicWindow from '../modals/ModalBasicWindow.vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
    components: {
        ModalBasicWindow, flatPickr
    },
    props: ['x', 'y', 'id'],
    data: () => ({
        dateFrom: null,
        dateTo: null,
        xAxis: '',
        yAxis: '', 
        limit: 100,
    }),
    emits: ['setFilter'],
    created(){
        this.xAxis = this.x;
        this.yAxis = this.y;
    },
    methods: {
        submit(){
            let millisFrom = Math.floor(new Date(this.dateFrom) / 1000);
            let millisTo = Math.floor(new Date(this.dateTo) / 1000);
            this.$emit('setFilter', {
                x: this.xAxis,
                y: this.yAxis,
                from: millisFrom,
                to: millisTo,
                limit: this.limit
            })
        }
    }
}
</script>
<style lang="">
    
</style>