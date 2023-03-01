<template lang="">
    <form @submit.prevent>
        <div class="modal-body">
            <div class="form-group">
            <label for="email" class="fw-bolder">{{$t('views.permissions_view.name')}}</label>
            <input class="form-control" type="text" v-model="newPermission.name"/>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.removeMemberToCompany" id="removeMemberFromCompany" v-model="newPermission.removeMemberToCompany">
                <label class="form-check-label" for="removeMemberFromCompany">
                    {{$t('views.permissions_view.permission_list.remove_member_from_company')}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.changePermissions" id="changePermissions" v-model="newPermission.changePermissions">
                <label class="form-check-label" for="changePermissions">
                    {{$t('views.permissions_view.permission_list.change_permission')}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.addTeam" id="addTeam" v-model="newPermission.addTeam">
                <label class="form-check-label" for="addTeam">
                    {{$t('views.permissions_view.permission_list.add_team')}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.removeTeam" id="removeTeam" v-model="newPermission.removeTeam">
                <label class="form-check-label" for="removeTeam">
                    {{$t('views.permissions_view.permission_list.remove_team')}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.addModule" id="addModule" v-model="newPermission.addModule">
                <label class="form-check-label" for="addModule">
                    {{$t('views.permissions_view.permission_list.add_module')}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.removeModule" id="removeModule" v-model="newPermission.removeModule">
                <label class="form-check-label" for="removeModule">
                    {{$t('views.permissions_view.permission_list.remove_module')}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.editModule" id="editModule" v-model="newPermission.editModule">
                <label class="form-check-label" for="editModule">
                    {{$t('views.permissions_view.permission_list.edit_module')}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.assertModuleToTeam"  id="assertModuleToTeam" v-model="newPermission.assertModuleToTeam">
                <label class="form-check-label" for="assertModuleToTeam">
                    {{$t('views.permissions_view.permission_list.assert_module_to_team')}}
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" :checked="newPermission.assertUserToTeam"  id="assetUserToTeam" v-model="newPermission.assertUserToTeam">
                <label class="form-check-label" for="assetUserToTeam">
                    {{$t('views.permissions_view.permission_list.assert_user_to_team')}}
                </label>
            </div>
        </div>
        <div class="modal-footer bg-light">
            <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submitData()" :value="title"/>
        </div>
    </form>
</template>
<script lang="ts">
import Company from "@/interfaces/Company";
import Permission from "@/interfaces/Permission";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'NewPermission',
    props: ['title'],
    emits: ['changePerm'],
    data: () => ({
        newPermission: {} as Permission,
        company: {} as Company
    }),
    methods: {
        submitData(){
            this.$emit("changePerm", this.newPermission)
            this.newPermission = {} as Permission;
        },
    }
})
</script>
