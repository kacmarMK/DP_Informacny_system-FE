<template lang="">
    <ul class="navbar-nav ">
        <li class="nav-item">
            <router-link to="/settings" class="nav-link">
                <i class="fas fa-cog"></i>
                <span class="ps-2">{{$t('main_content.top_menu.profile.settings')}}</span>
            </router-link>
        </li>
        <li class="nav-item">
            <a class="nav-link fw-bolder text-danger" @click="logout()">
                <i class="fas fa-sign-out-alt"></i>
                <span class="ps-2">{{$t('main_content.top_menu.profile.logout')}}</span>
            </a>
        </li>
    </ul>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'NavbarProfile',
    methods: {
        logout() {
            sessionStorage.clear();
            localStorage.clear();
            this.$router.push({path: 'login'})
        }
    }
})
</script>
