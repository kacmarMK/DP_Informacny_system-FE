<template>
    <ModalBasicWindow :identifier="id" :title="title">
        <form @submit.prevent>
            <div class="modal-body">
                <div class="form-group">
                    <label for="name" class="fw-bolder">{{$t('views.team_view.modals.name')}}</label>
                    <input type="text" class="form-control" v-model="modul.name" id="name" :placeholder="$t('views.team_view.modals.name')">
                </div>
            </div>
            <div class="modal-footer bg-light">
                <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submitData()" :value="title"/>
            </div>
        </form>
    </ModalBasicWindow>
</template>
<script lang="ts">
import Dashboard from '@/interfaces/Dashboard'
import { defineComponent } from '@vue/runtime-core'
import Module from '../../interfaces/Module'
import ModalBasicWindow from '../modals/ModalBasicWindow.vue'
export default defineComponent({
    name: 'AddModuleForm',
    props: ['id', 'title'],
    emits: ['addModuleToteam'],
    data: () => ({
        modul: {} as Module
    }),
    components: {ModalBasicWindow},
    methods: {
        submitData(){
            this.modul.dashboardEntityList = new Array<Dashboard>();
            this.$emit('addModuleToteam', this.modul)
        }
    }

})
</script>