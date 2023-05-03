<template>
  <MainContent>
    <Spinner v-if="loading"/>
    <div v-else>
      <Breadcrumb :heading="$t('views.modul_view.heading')" :third="$t('views.modul_view.link')"/>
      <div class="grid-container">
        <div v-if="!creatingDevice">
          <ul>
            <li v-for="device in gridDevices" :key="device.uid">{{ device.name }}</li>
          </ul>
        </div>
        <div v-else>
          <DeviceForm @cancel="toggleDeviceCreation" @submit="createDevice" />
        </div>
      </div>
      <div>
        <button v-if="!creatingDevice" @click="toggleDeviceCreation">Add Device</button>
        <button v-else @click="toggleDeviceCreation">Back to Device List</button>
        <button @click="removeDevice">Remove Device</button>
      </div>
    </div>
  </MainContent>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MainContent from '../components/MainContent.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import DeviceForm from '../views/CreateDeviceView.vue';
import Device from '../interfaces/Device'

export default defineComponent({
  name: 'ModuleView',
  components: {
    MainContent, 
    Breadcrumb,
    DeviceForm
  },
  data: () => ({
    error: false as boolean,
    errorMessage: "" as string,
    loading: false as boolean,
    gridDevices: [] as Device[],
    newDevice: '',
    creatingDevice: false as boolean
  }),
  methods: {
    addDevice() {
      if (!this.creatingDevice) {
        this.toggleDeviceCreation();
      }
    },
    removeDevice() {
      if (this.gridDevices.length > 0) {
        this.gridDevices.pop();
      }
    },
    toggleDeviceCreation() {
      this.creatingDevice = !this.creatingDevice;
    },
    createDevice(device: Device) {
      this.gridDevices.push(device);
      this.toggleDeviceCreation();
    }
  }

})
</script>

<style scoped>

.card {
   border: 1px solid #e6edef;
   transition: all 0.6s ease;
   cursor: pointer;
}

.card:hover .icon-round {
  background-color:  var(--blue-primary-color);
   color: white;
}
.card-header {
  background: transparent;
}

</style>