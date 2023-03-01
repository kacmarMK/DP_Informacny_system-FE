<template>
    <ModalBasicWindow :identifier="id" :title="title">
        <form @submit.prevent>
            <div class="modal-body">
                <div class="form-group">
                    <label for="email" class="fw-bolder">{{$t('views.company_view.choose_permision')}}</label>
                    <select class="w-50 form-select mt-2" :value="permision" @change="changePerm($event.target.value)">
                        <option v-for="(item, index) in company.permissionEntityList" :key="index" :value="item.name">
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
import Permission from '@/interfaces/Permission'
import { defineComponent } from '@vue/runtime-core'
import ModalBasicWindow from '../modals/ModalBasicWindow.vue'
export default defineComponent({
    name: 'ChangePermissions',
    props: ['id', 'title', "company", "permision", 'userId'],
    emits: ['changePermision'],
    data: () => ({
        newPermision: {} as Permission
    }),
    components: {ModalBasicWindow},
    methods: {
        submitData(){
            this.$emit('changePermision', {
                permission: this.newPermision,
                userId: this.userId
            })
        },
        changePerm(value: string){
            this.newPermision = this.company.permissionEntityList.filter( (permision: { name: string }) => permision.name = value);
        },
    }

})
</script>