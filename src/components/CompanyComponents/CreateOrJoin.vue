<template lang="">
    <div class="d-flex text-center justify-content-center flex-column mt-4">
        <h3>You are not member of any company. Join company or create new.</h3>
        <div class="mt-3">
            <button class="btn btn-primary-blue w-25 me-2" data-bs-toggle="modal" data-bs-target="#joinCompany">Join</button>
            <button class="btn btn-primary-blue w-25" data-bs-toggle="modal" data-bs-target="#createCompany">Create</button>
        </div>
    </div>

    <ModalBasicWindow identifier="joinCompany" :title="$t('buttons.add_component')"> 
        <form @submit.prevent>
            <div class="modal-body">
                <div class="form-group">
                    <label for="id" class="fw-bolder text-start">Company Id</label>
                    <input type="text" class="form-control" id="id" v-model="companyId" placeholder="Company Id">
                </div>
            </div>
            <div class="modal-footer bg-light">
                <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="join()" :value="title"/>
            </div>
        </form>
    </ModalBasicWindow>

    <ModalBasicWindow identifier="createCompany" :title="$t('buttons.add_component')"> 
        <form @submit.prevent>
            <div class="modal-body">
                <div class="form-group mb-2">
                    <label for="name" class="fw-bolder">Name</label>
                    <input type="text" class="form-control" v-model="company.name" id="name" placeholder="Company Name">
                </div>
            </div>
            <div class="modal-footer bg-light">
                <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="create()" :value="title"/>
            </div>
        </form>
    </ModalBasicWindow>

</template>
<script lang="ts">
import Company from "@/interfaces/Company"
import Permission from "@/interfaces/Permission"
import Team from "@/interfaces/Team"
import User from "@/interfaces/User"
import CompanyService from "@/services/CompanyService"
import ResponseData from "@/services/ResponseData"
import { defineComponent } from "@vue/runtime-core"
import ModalBasicWindow from '../modals/ModalBasicWindow.vue'

export default defineComponent({
    name: 'CreateOrJoin',
    emits: ['setCompany'],
    data: () => ({
        companyId: '' as string,
        company: {} as Company,
        user: {} as User,
        permission: {} as Permission
    }),
    components: {
        ModalBasicWindow
    },
    methods: {
        join(){
            this.user = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
            CompanyService.getCompany(this.companyId).then( (response: ResponseData<Company>) => {
                this.company = response.data
                this.user.permissionEntity = this.company.permissionEntityList?.filter( p => p.name == "User")[0]
                this.company.userEntityList?.push(this.user)
                this.addCompany();
            }).catch( (err) => {
                console.log(err)
            })

            // this.addCompany();
        },
        create(){
            this.user = Object.assign({}, JSON.parse(sessionStorage.getItem('user') || '{}'));
            
            this.company.permissionEntityList = new Array<Permission>();
            this.company.userEntityList = new Array<User>();
            this.company.teamEntityList = new Array<Team>();
            
            //Add Admin Perm
            let admin: Permission = this.createDefaultPermissions("Admin", true, true, true, 
                true, true, true, true, true, true, true)
            this.company.permissionEntityList?.push(admin)

            //Add User Perm 
            let user: Permission = this.createDefaultPermissions("User", false, false, false, 
                false, false, false, false, false, false, false)
            this.company.permissionEntityList?.push(user)

            //set user to company
            this.user.permissionEntity = admin;
            this.company.userEntityList?.push(this.user);

            this.addCompany();
        },
        addCompany(){
            CompanyService.addCompany(this.company).then( (response: ResponseData<Company>) => {
                this.company = response.data;
                this.emitData(response.data)
            }).catch( (error) => {
                console.log(error)
            })
        },

        emitData(company: Company){
            this.$emit("setCompany", company);
        },
        createDefaultPermissions(name: string, addMemberToCompany: boolean,removeMemberFromCompany: boolean, editModule: boolean,
            changePermissions: boolean, addTeam: boolean, removeTeam: boolean, addModule: boolean,
            removeModule: boolean, assertModuleToTeam: boolean, assetUserToTeam: boolean){
            
            let permission: Permission = {};
            permission.companyId = this.user.company != undefined ? this.user.company : ''
            permission.editModule = editModule;
            permission.name = name
            permission.addMemberToCompany = addMemberToCompany;
            permission.removeMemberToCompany = removeMemberFromCompany;
            permission.changePermissions = changePermissions;
            permission.addTeam = addTeam;
            permission.removeTeam = removeTeam;
            permission.addModule = addModule;
            permission.removeModule = removeModule;
            permission.assertModuleToTeam = assertModuleToTeam;
            permission.assertUserToTeam = assetUserToTeam;

            return permission
        }
    }
})
</script>
