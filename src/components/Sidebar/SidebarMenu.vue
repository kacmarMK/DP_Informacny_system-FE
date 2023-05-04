<template>
 <div id="sidebar-wrapper">
    <div id="sidebar">
        <ul class="navbar-nav sidebar sidebar-dark mt-3">
            <NavLink icon="fas fa-tachometer-alt" :label="$t('main_content.sidebar_menu.overview')" path="/home" />
            <NavLink icon="fas fa-users" :label="$t('main_content.sidebar_menu.company')"  path="/company" />
            <NavLink icon="fas fa-code-fork" :label="$t('main_content.sidebar_menu.modules')" path="/collections" />
            <NavLink icon="fas fa-bell" :label="$t('main_content.sidebar_menu.notifications')"  path="/notifications" />
            <NavLink icon="fas fa-book" :label="$t('main_content.sidebar_menu.recipes')"  path="/recipes" />
            <NavLink icon="fas fa-list-check" :label="$t('main_content.sidebar_menu.jobs')"  path="/jobs" />
            <NavLink icon="fas fa-terminal" :label="$t('main_content.sidebar_menu.commands')" path="/commands" />
            
        </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent} from "@vue/runtime-core";
import NavLink from './NavLink.vue'
import User from "@/interfaces/User";
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

