<template>
           <ModalBasicWindow :identifier="id" :title="title">
            <form @submit.prevent>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="email" class="fw-bolder">{{$t('views.team_view.available_members')}}</label>
                        <select class="w-50 form-select mt-2">
                            <option value="">{{$t('views.team_view.select_member')}}</option>
                            <option v-for="(item, index) in available" :key="index" :value="item.uid">
                                {{item.name}}
                            </option>
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
import ResponseData from '@/services/ResponseData'
import { defineComponent } from '@vue/runtime-core'
import User from '../../interfaces/User'
import ModalBasicWindow from '../modals/ModalBasicWindow.vue'
export default defineComponent({
    name: 'AddMemberForm',
    props: ['id', 'title', 'users'],
    emits: ['addUserToteam'],
    data: () => ({
        available: [] as User[],
        selectedUser: {} as User
    }),
    components: {ModalBasicWindow},
    methods: {
        selected(id: string){
           let user = this.available.filter( u => u.uid == id);
           this.selectedUser = user[0]
        },
        submitData(){
            this.$emit('addUserToteam', this.selectedUser)
        },
        listOfAvailableUsers(users: User[]){
            const filteredArray = users.filter(value => this.users.includes(value));
            this.available = filteredArray;
        }
    }

})
</script>