<template lang="">
<div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.removeMemberToCompany" id="removeMemberFromCompany" v-model="permission.removeMemberToCompany">
        <label class="form-check-label" for="removeMemberFromCompany">
            {{$t('views.permissions_view.permission_list.remove_member_from_company')}}
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.changePermissions" id="changePermissions" v-model="permission.changePermissions">
        <label class="form-check-label" for="changePermissions">
            {{$t('views.permissions_view.permission_list.change_permission')}}
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.addTeam" id="addTeam" v-model="permission.addTeam">
        <label class="form-check-label" for="addTeam">
            {{$t('views.permissions_view.permission_list.add_team')}}
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.removeTeam" id="removeTeam" v-model="permission.removeTeam">
        <label class="form-check-label" for="removeTeam">
            {{$t('views.permissions_view.permission_list.remove_team')}}
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.addModule" id="addModule" v-model="permission.addModule">
        <label class="form-check-label" for="addModule">
            {{$t('views.permissions_view.permission_list.add_module')}}
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.removeModule" id="removeModule" v-model="permission.removeModule">
        <label class="form-check-label" for="removeModule">
            {{$t('views.permissions_view.permission_list.remove_module')}}
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.editModule" id="editModule" v-model="permission.editModule">
        <label class="form-check-label" for="editModule">
            {{$t('views.permissions_view.permission_list.edit_module')}}
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.assertModuleToTeam"  id="assertModuleToTeam" v-model="permission.assertModuleToTeam">
        <label class="form-check-label" for="assertModuleToTeam">
            {{$t('views.permissions_view.permission_list.assert_module_to_team')}}
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" :checked="permission.assertUserToTeam"  id="assetUserToTeam" v-model="permission.assertUserToTeam">
        <label class="form-check-label" for="assetUserToTeam">
            {{$t('views.permissions_view.permission_list.assert_user_to_team')}}
        </label>
    </div>
</div>

</template>
<script lang="ts">
import Permission from "@/interfaces/Permission"
import { defineComponent } from "@vue/runtime-core"
export default defineComponent({
    name: 'PermissionList',
    props: ['permision'],
    emits: ['changePerm'],
    data: () => ({
        permission: {} as Permission
    }),
    created(){
        this.permission = this.permision
    },
    methods: {
        change(){
            this.$emit("changePerm", this.permision)
        }   
    }
})
</script>
<style lang="">
    
</style>