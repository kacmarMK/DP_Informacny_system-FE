<template>
    <MainContent>
        <div>
            <Breadcrumb :heading="$t('views.commands_view.heading')" :third="$t('views.commands_view.link')"/>
        </div>
    </MainContent>
</template>
<script lang="ts">
import MainContent from '../components/MainContent.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
    name: 'CommandsView',
    components: {
        MainContent,
        Breadcrumb},
    data: () => ({
    }),
    methods: {
    }
})
</script>
<style>
</style>
    