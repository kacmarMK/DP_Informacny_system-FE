<template>
 <div id="sidebar-wrapper">
    <div id="sidebar">
        <ul class="navbar-nav sidebar sidebar-dark mt-3">
            <NavLink icon="fas fa-tachometer-alt" :label="$t('main_content.sidebar_menu.overview')" path="/home" />
            <NavLink icon="fas fa-fw fa-microchip" :label="$t('main_content.sidebar_menu.modules')"  path="/modules" />
            <NavLink icon="fas fa-users" :label="$t('main_content.sidebar_menu.teams')"  path="/teams" />
            <!--<NavLink icon="fas fa-building" :label="$t('main_content.sidebar_menu.company')" path="/company" />-->
        </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent} from "@vue/runtime-core";
import NavLink from './NavLink.vue'
import User from "@/interfaces/User";
import CompanyService from "@/services/CompanyService";
import store from "@/store/index"
export default defineComponent({
    name: 'SidebarMenu',
    components: {NavLink},
    data: () => ({
        hidden: true as boolean
    })
})
</script>

<style>

ul.navbar-nav.sidebar.sidebar-dark > li.nav-item a.nav-link,
ul.navbar-nav.sidebar.sidebar-dark > li.nav-item div.nav-link  {
    border-radius: 10px;
    transition: all 0.3s ease;
    padding: 10px;
}

ul.navbar-nav.sidebar.sidebar-dark > li.nav-item a.nav-link.active,
ul.navbar-nav.sidebar.sidebar-dark > li.nav-item div.nav-link.active ,
ul.navbar-nav.sidebar.sidebar-dark > li.nav-item div.nav-link:hover ,
ul.navbar-nav.sidebar.sidebar-dark > li.nav-item a.nav-link:hover {
    background-color: #168eea;
    color: white;
    position: relative;

}




</style>

