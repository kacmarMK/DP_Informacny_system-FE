<template>
    <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-white">
        <div class="container-fluid">
            <div class="main-header-left">
                <div class="logo-wrapper"><router-link to="/home"><img class="img-fluid" src="../../assets/images/Logo.png" alt=""></router-link></div>
                <div class="toggle-sidebar" @click.prevent="toggleSidebar()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-center status_toggle middle"
                    id="sidebar-toggle">
                    <line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>
                    </svg>
                    </div>
            </div>
            <!-- <button class="btn btn-primary ps-4 pe-4" type="button"  data-bs-toggle="modal" data-bs-target="#potentostatModal"><i class="fas fa-chart-line me-2"></i>{{measurament}}</button>
            <ModalWindow identifier="potentostatModal" title="Meranie" /> -->
            <LanguageSwitcher class="ms-auto" />
            <NavbarProfile/>
        </div>
    </nav>
</template>
<script>

import { defineComponent } from "@vue/runtime-core";
import LanguageSwitcher from '../LanguageSwitcher.vue';
import NavbarProfile from './NavbarProfile.vue'

export default defineComponent({
     name: 'TopMenu',
     props: {
         heading: {type: String},
         measurament: {type: String},
     }, 
    methods: {
        toggleSidebar() {
            document.body.classList.toggle('sb-sidenav-toggled');
            document.querySelector('.mid-bar').classList.toggle('active');
            
        }
     },
     components:{
        LanguageSwitcher ,  
        // ModalWindow,
        NavbarProfile
     }
 
})
</script>
<style> 
 .toggle-sidebar:hover svg {
     color: var(--primary-color-blue)
 }
</style>