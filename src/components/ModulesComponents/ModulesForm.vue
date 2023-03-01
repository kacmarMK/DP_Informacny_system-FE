<template lang="">
       <ModalBasicWindow :identifier="id" :title="title">
            <form @submit.prevent class="tab-content">
                  <div class="modal-body">
                    <div class="form-group">
                        <label for="name" class="fw-bolder">{{$t('views.team_view.modals.name')}}</label>
                        <input type="text" class="form-control" v-model="modul.name" id="name" :placeholder="$t('views.team_view.modals.name')">
                    </div>
                    <button class="btn btn-primary-blue mt-2" data-bs-toggle="modal" :data-bs-target="'#setIcon' + id"> Choose icon</button>
                    <ModalBasicWindow :identifier="'setIcon' + id" title="Choose icon">
                        <div class="row ms-2">
                            <div class="col-2 component mb-1" v-for="(icon, index) in icons" :key="index" @click="setIcon(icon)">
                                <div class="d-block">
                                    <i :class="icon"></i>
                                </div>
                            </div>
                        </div>
                    </ModalBasicWindow>
                    <div class="form-group mt-3">
                        <label for="name" class="fw-bolder">{{$t('views.team_view.modals.icon')}}</label>
                        <input type="text" class="form-control" v-model="modul.icon"
                        id="icon" :placeholder="$t('views.team_view.modals.icon')">
                    </div>

                    <div class="form-group mt-3">
                        <label for="name" class="fw-bolder">Device type</label>
                        <select class="form-select" v-model="modul.type" @change="changeSliderRange()">
                            <option>Select Value</option>
                            <option  v-for="(type, index) in types" :value="type.name" :key="index">{{type.name}}</option>
                        </select>
                    </div>
                  </div>
                  <div class="modal-footer bg-light">
                    <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submitData()" :value="title"/>
                  </div>
            </form>
        </ModalBasicWindow>


</template>
<script lang="ts">
declare var bootstrap: any;
import Dashboard from "@/interfaces/Dashboard";
import DeviceType from "@/interfaces/DeviceType";
import DeviceTypeService from "@/services/DeviceTypeService";
import ResponseData from "@/services/ResponseData";
import { defineComponent } from "@vue/runtime-core";
import ModalBasicWindow from "../modals/ModalBasicWindow.vue";
export default defineComponent({
    name: 'ModulesForm',
    props: ['id', 'modul1', 'title'],
    emits: ['submitData'],
    components: {ModalBasicWindow},
    data: () => ({
        modul: {} as Dashboard,
        icons: [
            'fas fa-cube', 'fas fa-archive', 'fas fa-laptop-code', 'fas fa-window-maximize', 'fas fa-microchip', 'fas fa-inbox', 'fas fa-keyboard', 'fas fa-filter',
            'fas fa-headphones','fas fa-microphone','fas fa-file-video','fas fa-tv','fas fa-address-book','fas fa-chalkboard','fas fa-assistive-listening-systems',
            'fas fa-air-freshener','fas fa-id-card','fas fa-battery-full','fas fa-biohazard','fas fa-burn','fas fa-buffer','fas fa-barcode','fas fa-clipboard',
            'fas fa-database','fas fa-qrcode','fas fa-heartbeat','fas fa-medkit','fas fa-lightbulb','fas fa-fan','fas fa-plug','fas fa-fire','fas fa-radiation','fas fa-solar-panel',
            'fas fa-sun','fas fa-water','fas fa-wind',
        ] as Array<string>,
        types: [] as Array<DeviceType>
    }),
    created(){
        if(this.modul1 != undefined){
            this.modul = this.modul1;
        }

        DeviceTypeService.getAllTypes().then( (response: ResponseData<Array<DeviceType>>) => {
            this.types = response.data
        }).catch( (err) => {
            console.log(err)
        })

    },
    methods: {
        submitData(){
           this.$emit('submitData', this.modul)
           this.modul = {} as Dashboard
        },
        setIcon(icon: string){
            this.modul.icon = icon;
            let modal = document.getElementById("setIcon" + this.id);
            const m1 = bootstrap.Modal.getInstance(modal)
            m1.hide();

        }
    }
})
</script>
<style scoped>
    .component {
        border: 1.5px solid var(--light-blue-bg-rgb);
        color: var(--blue-primary-color);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s ease;
        cursor: pointer;
        height: 3rem;
    }

    .component:hover {
        background-color: var(--blue-primary-color);
        color: white ;
    }
</style>