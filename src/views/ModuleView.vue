<template>
  <MainContent>
    <div>
      <Breadcrumb :heading="$t('views.modul_view.heading')" :third="$t('views.modul_view.link')"/>
      <div class="grid-container">
        <div v-for="device in gridDevices" :key="device.uid" class="device-card">
          <h3>{{ device.name }}</h3>
          <p>MAC: {{ device.mac }}</p>
          <p>Type: {{ device.type }}</p>
          <p>Version: {{ device.version }}</p>
          <p>Firmware: {{ device.firmware }}</p>
          <p>Device deactivated: {{ device.deactivated }}</p>
          <button class="delete-button" @click="deleteDevice(device.uid)">X</button>

        </div>
      </div>
      <div>
        <button class="create-device-btn" @click="toggleDeviceCreation">
          <i class="fa fa-plus"></i> Create Device
        </button>
      </div>
      <transition name="fade">
        <div class="create-device-container" v-if="creatingDevice">
          <CreateDeviceComponent></CreateDeviceComponent>
        </div>
      </transition>
    </div>
  </MainContent>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import MainContent from '../components/MainContent.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import Device from '../interfaces/Device';
import DeviceService from '../services/DeviceService';
import CreateDeviceComponent from '../components/CreateDeviceComponent.vue';

export default defineComponent({
  name: 'ModuleView',
  components: {
    MainContent, 
    Breadcrumb,
    CreateDeviceComponent
  },
  data: () => ({
    errorMessage: "" as string,
    loading: false as boolean,
    gridDevices: [] as Device[],
    newDevice: '',
    creatingDevice: false as boolean

  }),
  methods: {
    async getDevices() {
      try {
        this.loading = true;
        const response = await DeviceService.getDevices();
        this.gridDevices = response.data;
      } catch (error) {
        console.log("Error when calling getDevices() service.");
      } finally {
        this.loading = false;
      }
    },
    async deleteDevice(deviceId: string) {
      if(confirm("Are you sure you want to delete this device?")){
        try {
          await DeviceService.deleteDevice(deviceId);
          // If the delete request was successful, update the list of recipes in the UI
          this.gridDevices = this.gridDevices.filter(device => device.uid !== deviceId);
        } catch (error) {
          console.error('Error deleting device.');
        }
      }
    },
    addDevice() {
      this.creatingDevice = !this.creatingDevice;
    },
    toggleDeviceCreation() {
      this.creatingDevice = !this.creatingDevice;
    },
  },
  created() {
    this.getDevices();
  },
})
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  button.create-device-btn {
    display: block;
    margin: 0 auto;
    font-size: 1.2rem;
    padding: 12px 20px;
    border-radius: 6px;
  }
  .create-device-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 5px;
  }
  .device-card {
    display: flex;
    margin: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f5f5f5;
    text-align: center
  }
  .delete-button {
      position: static;
      text-align: left;
      justify-content: start;
      align-items: start;
      font-size: 0.8rem;
      padding: 6px 10px;
      border-radius: 3px;
      background-color: #f44336;
      color: #fff;
      border: none;
      cursor: pointer;
      
    }
  </style>