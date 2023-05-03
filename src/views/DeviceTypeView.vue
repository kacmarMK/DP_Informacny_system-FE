<template lang="">
    <MainContent>
        <div class="container-fluid p-2">
            <div class="row">
                <div class="col-lg-6">
                    <button class="btn btn-primary-blue mt-2" data-bs-toggle="modal" data-bs-target="#addType"> 
                        <i class="fas fa-plus-circle pe-1"></i> Pridať typ zariadenia
                    </button>
                    <ModalBasicWindow identifier="addType" title="Pridať typ zariadenia">
                        <DeviceForm @submitData="addDevice($event)" />
                    </ModalBasicWindow>
                    <div class="card p-3 mt-2"  style="min-height: 6rem">
                        <h5 class="fw-bolder"> Typy zariadení</h5>
                        <table class="table table-bordernone table-hover mt-3">
                                <thead>
                                    <th>Názov</th>
                                    <th>Príkazy</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    <tr v-for="(type, index) in devices" :key="index">
                                        <td class="ps-0"><a class="primary-link" data-bs-toggle="modal" :data-bs-target="'#editType' + type.id">{{type.name}}</a></td>
                                        <td>
                                            <span v-for="(command, index2) in type.commands" :key="index2" class="ps-1"> {{command.name}}  </span>
                                        </td>
                                        <td  class="ps-0"><i class="fas fa-times text-danger" @click="removeDevice(type.id)"></i></td> 
                                       <ModalBasicWindow :identifier="'editType' + type.id" title="Pridať typ zariadenia">
                                            <DeviceForm :type1="type" @submitData="editDevice($event)" />
                                        </ModalBasicWindow>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-lg-6">
                    <button class="btn btn-primary-blue mt-2" data-bs-toggle="modal" data-bs-target="#addCommand"> 
                        <i class="fas fa-plus-circle pe-1"></i> Pridať príkaz
                    </button>                    
                    <ModalBasicWindow identifier="addCommand" title="Pridať príkaz">
                        <CommandForm  @submitData="addCommand($event)" />
                    </ModalBasicWindow>
                    <div class="card p-3 mt-2"  style="min-height: 6rem">
                        <h5 class="fw-bolder">Zoznam príkazov</h5>
                        <table class="table table-bordernone table-hover mt-3">
                                <thead>
                                    <th>Názov</th>
                                    <th>Príkaz</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    <tr v-for="(command, index) in commands" :key="index">
                                        <td class="ps-0"><a class="primary-link" data-bs-toggle="modal" :data-bs-target="'#editCommand' + command.id">{{command.name}}</a></td>
                                        <td>{{command.commandId}}</td>
                                        <td  class="ps-0"><i class="fas fa-times text-danger" @click="removeCommand(command.id)"></i></td> 
                                            <ModalBasicWindow :identifier="'editCommand' + command.id" title="Editovať príkaz">
                                                <CommandForm :command1="command" @submitData="editCommand($event)" />
                                            </ModalBasicWindow>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </MainContent>
</template>
<script lang="ts">
import Command from '@/interfaces/Command'
import CommandForm from '../components/DeviceTypesComponents/CommandForm.vue'
import { defineComponent } from '@vue/runtime-core'
import MainContent from '../components/MainContent.vue'
import ModalBasicWindow from '../components/modals/ModalBasicWindow.vue'
import CommandService from '@/services/CommandService'
import DeviceTypeService from '@/services/DeviceTypeService'
import ResponseData from '@/services/ResponseData'
import DeviceType from '@/interfaces/DeviceType'
import CommandHelper from '@/interfaces/CommandHelper'
import DeviceForm from '../components/DeviceTypesComponents/DeviceForm.vue'
export default defineComponent({
    name: 'DeviceTypeView',
    data: () => ({
        commands: [] as Array<Command>,
        devices: [] as Array<DeviceType>
    }),
    components: {
        MainContent,
        ModalBasicWindow,
        CommandForm,
        DeviceForm
    },
    created() {

        DeviceTypeService.getAllTypes().then( (response: ResponseData<Array<DeviceType>>) => {
            this.devices = response.data;
        }).catch( (err) => {
            console.log(err)
        })
    },
    methods: {
        editCommand(command: Command){
            let com = this.commands.filter( c => c.id != command.id);
            this.commands = com;
        },
        addDevice(device: DeviceType){
            DeviceTypeService.addDeviceType(device).then( (response: ResponseData<DeviceType>) => {
                this.devices.push(response.data)
            }).catch( (err) => {
                console.log(err)
            })
        },
        editDevice(device: DeviceType){
            let dev = this.devices.filter( d => d.id != device.id);
            this.devices = dev;
            this.addDevice(device);
        },
        removeDevice(id: string){
            DeviceTypeService.deleteTypeById(id).then( () => {
                let dev = this.devices.filter( d => d.id != id);
                this.devices = dev;
            }).catch( (err) => {
                console.log(err)
            })
        }
    }

})
</script>
