<template lang="">
       <ModalBasicWindow :identifier="id" :title="title">
            <form @submit.prevent class="tab-content">
                  <div class="modal-body">
                    <div class="form-group">
                        <label for="name" class="fw-bolder">{{$t('views.company_view.company_info_form_name')}}</label>
                        <input type="text" class="form-control" v-model="company.name" id="name" :placeholder="$t('views.company_view.company_info_form_name')">
                    </div>
                  </div>
                  <div class="modal-footer bg-light">
                    <input type="submit" class="btn btn-primary-blue" data-bs-dismiss="modal" @click="submitData()" :value="title"/>
                  </div>
            </form>
        </ModalBasicWindow>
</template>
<script lang="ts">
import Company from "@/interfaces/Company";
import { defineComponent } from "@vue/runtime-core";
import ModalBasicWindow from "../modals/ModalBasicWindow.vue";
export default defineComponent({
    name: 'CompanyInfoForm',
    props: ['id', 'title', 'company1'],
    data: () => ({
        company: {} as Company, 
    }),
    created(){
       if(this.company1 != undefined){
            this.company = this.company1;
        }
    },
    components: {
        ModalBasicWindow
    }, 
    methods: {
        submitData(){
           this.$emit('submitData', this.company)
        }
    }
})
</script>
<style lang="">
    
</style>