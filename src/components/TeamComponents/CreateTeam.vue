<template>
    <ModalBasicWindow :identifier="id" :title="title">
        <form @submit.prevent>
            <div class="modal-body">
                <div class="form-group">
                    <label for="name" class="fw-bolder">{{$t('views.company_view.team_name')}}</label>
                    <input type="text" v-model="team.name" class="form-control" :placeholder="$t('views.company_view.team_name')"/>
                </div>
                <div class="form-group">
                    <label for="name" class="fw-bolder">{{$t('views.company_view.description')}}</label>
                    <textarea v-model="team.description" class="form-control" :placeholder="$t('views.company_view.description')">
                    </textarea>
                </div>
            </div>
            <div class="modal-footer bg-light">
                <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submitData()" :value="title"/>
            </div>
        </form>
    </ModalBasicWindow>
</template>
<script lang="ts">
import Team from "@/interfaces/Team"
import { defineComponent } from "@vue/runtime-core"
import ModalBasicWindow from '../modals/ModalBasicWindow.vue'


export default defineComponent({
    name: 'CreateTeam',
    props: ['team1', 'id', 'title'],
    emits: ['submitData'],
    components: {ModalBasicWindow},
    data: () => ({
        team: {} as Team 
    }),
    created() {
        if(this.team1 != undefined){
            this.team = this.team1
        }
    },
    methods: {
        submitData(){
            this.$emit('submitData', this.team)
        }
    }
})
</script>
<style lang="">
    
</style>