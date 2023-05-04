<template>
    <MainContent>
      <div>
        <Breadcrumb :heading="$t('views.notifications_view.heading')" :third="$t('views.notifications_view.link')"/>
      </div>
      </MainContent>
  </template>
  <script lang="ts">
  import MainContent from '../components/MainContent.vue'
  import Breadcrumb from '../components/Breadcrumb.vue'
  import { defineComponent } from '@vue/runtime-core'
  import User from '@/interfaces/User'
  export default defineComponent({
      name: 'NotificationsView',
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
  