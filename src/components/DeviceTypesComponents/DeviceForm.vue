<template lang="">
    <form @submit.prevent class="tab-content">
        <div class="modal-body">
            <div class="form-group">
                <label for="name" class="fw-bolder">Názov</label>
                <input type="text" class="form-control" v-model="type.name" id="name" :placeholder="$t('views.team_view.modals.name')">
            </div>
            <div class="form-group mt-2">
                <label for="name" class="fw-bolder">Hodnota Od</label>
                <input type="text" class="form-control" v-model="type.from" id="name" placeholder="Hodnota Od">
            </div>
            <div class="form-group mt-2">
                <label for="name" class="fw-bolder">Hodnota Do</label>
                <input type="text" class="form-control" v-model="type.to" id="name" placeholder="Hodnota Do">
            </div>
            <div class="form-check form-check-inline" v-for="(command, index) in commandList" :key="index">
                <input class="form-check-input" type="checkbox" :id="'inlineCheckbox' + index" @click="setCommand(command.id)" :value="command.id" :checked="isChecked(command.id)">
                <label class="form-check-label" for="inlineCheckbox1">{{command.name}}</label>
            </div>
        </div>
        <div class="modal-footer bg-light">
            <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submitData()" :value="title"/>
        </div>
    </form>
</template>
<script lang="ts">
import Command from "@/interfaces/Command";
import DeviceType from "@/interfaces/DeviceType";
import CommandService from "@/services/CommandService";
import ResponseData from "@/services/ResponseData";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: ['type1'],
    emits: ['submitData'],
    data: () => ({
        type: {} as DeviceType,
        commandList: [] as Array<Command>
    }),
    created(){
        if(this.type1 != undefined){
            this.type = this.type1
        }else {
            this.type.commands = [] as  Array<Command>; 
        }
    },
    methods: {
        submitData(){
            this.$emit('submitData', this.type);
            this.type = {} as DeviceType
        },
        setCommand(id: string){
                let command2 = this.commandList.filter(c => c.id == id)[0] as Command
                if(this.type.commands != null && this.type.commands.length > 0){
                    let command = this.type.commands.filter(c => c.id == id)[0]

                    if(command){
                        this.type.commands = this.type.commands.filter(c => c.id != id)
                    }
                    else {
                        this.type.commands.push(command2)
                    }
                } else {
                    console.log(command2)
                    console.log(this.type)
                    this.type.commands.push(command2)
                }
            
        },
        isChecked(id: string){
            return  this.commandList.filter(c => c.id == id).length > 0;

        }
    }
})
</script>
