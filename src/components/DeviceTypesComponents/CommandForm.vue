<template lang="">
    <form @submit.prevent class="tab-content">
        <div class="modal-body">
            <div class="form-group">
                <label for="name" class="fw-bolder">Názov</label>
                <input type="text" class="form-control" v-model="command.name" id="name" :placeholder="$t('views.team_view.modals.name')">
            </div>
            <div class="form-group mt-2">
                <label for="name" class="fw-bolder">Príkaz</label>
                <input type="text" class="form-control" v-model="command.commandId" id="name" placeholder="Command">
            </div>
            
            <div class="form-group mt-2">
                    <div v-for="(field, index) in command.fields" :key="index">
                        {{field.name}} - {{field.type}} <i class="fas fa-times text-danger" @click="removeField(field)"></i>
                    </div>
                    <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <input type="text" class="form-control" v-model="field.name" id="name" placeholder="">
                    </div>
                    <div class="col-auto">
                        <select class="form-select" v-model="field.type">
                            <option value="input">Input</option>
                            <option value="boolean"> Boolean </option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-plus-circle text-success" @click="addField()"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer bg-light">
            <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submitData()" :value="title"/>
        </div>
    </form>
</template>
<script lang="ts">
import Field from '@/interfaces/Field';
import Command from '@/interfaces/Command';
import { defineComponent } from '@vue/runtime-core';
export default defineComponent({
    emits: ['submitData'],
    props: ['command1'],
    data: () => ({
        command: {} as Command,
        field: {} as Field
    }),
    created(){
        if(this.command1 != undefined){
            this.command.id =  this.command1.id;
            this.command.name = this.command1.name;
            this.command.commandId = this.command1.commandId;
            this.command.fields = JSON.parse(this.command1.fields)
        }
    },
    methods: {
        submitData(){
            this.$emit('submitData', this.command);
            this.command = {} as Command
        },
        addField(){
            if(this.command.fields == undefined) this.command.fields = new Array<Field>();
            this.command.fields.push(this.field)
            this.field = {} as Field
        },
        removeField(field: Field){
            let index = this.command.fields.indexOf(field)
            this.command.fields.splice(index, 1)
        }
    }
})
</script>
<style lang="">
    
</style>