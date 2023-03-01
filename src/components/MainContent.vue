<template>
    <TopMenu />
    <SidebarMenu />
    <div id="page-content-wrapper">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import SidebarMenu from './Sidebar/SidebarMenu.vue'
import TopMenu from './Topmenu/TopMenu.vue'

export default defineComponent({
    name: 'MainContent',
    components: {SidebarMenu,TopMenu}
})
</script>
