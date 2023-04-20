<template>
    <div>
      <grafana-dashboard
        :dashboard="dashboard"
        :data-sources="dataSources"
        :time-range="timeRange"
        :timezone="timezone"
        :options="options"
        @initialized="onInitialized"
        @rendered="onRendered"
      />
    </div>
  </template>
  
  <script>
  import { GrafanaDashboard } from '@grafana/ui';
  
  export default {
    name: 'GrafanaDashboard',
    components: {
      GrafanaDashboard,
    },
    data() {
      return {
        dashboard: {
          uid: 'my-dashboard',
        },
        dataSources: [
          {
            name: 'my-data-source',
            type: 'prometheus',
            url: 'http://localhost:9090',
          },
        ],
        timeRange: {
          from: 'now-1h',
          to: 'now',
        },
        timezone: 'browser',
        options: {},
      };
    },
    methods: {
      onInitialized() {
        console.log('Grafana dashboard initialized');
      },
      onRendered() {
        console.log('Grafana dashboard rendered');
      },
    },
  };
  </script>