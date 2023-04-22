<template lang="">
    <MainContent>
        <Spinner v-if="loading"/>
        <div v-else>
            <Breadcrumb :heading="$t('views.jobs_view.heading')" :third="$t('views.jobs_view.link')"/>
        </div>
    </MainContent>
  </template>
  <script lang="ts">
  import MainContent from '../components/MainContent.vue'
  import Breadcrumb from '../components/Breadcrumb.vue'
  import Spinner from '../components/Spinner.vue'
  import { defineComponent } from '@vue/runtime-core'
  import User from '@/interfaces/User'
  export default defineComponent({
      name: 'JobsView',
      components: {
        MainContent,
        Breadcrumb,
        Spinner},
      data: () => ({/*
          teams: [] as Team[],
          loading: true as boolean,
          userId: '' as string,
          favorite: {} as Favorite*/
      }),
      methods: {
      }
  })
  </script>
  <style>
  </style>
  