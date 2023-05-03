<template>
    <div>
      <h2>Create Device</h2>
      <form @submit.prevent="handleSubmit">
        <label for="uid">UID:</label>
        <input type="text" id="uid" v-model="device.uid">
<label for="name">Name:</label>
<input type="text" id="name" v-model="device.name">

<label for="mac">MAC:</label>
<input type="text" id="mac" v-model="device.mac">

<label for="type">Type:</label>
<select id="type" v-model="selectedType">
  <option v-for="type in typeOptions" :key="type.value" :value="type.value">{{ type.label }}</option>
</select>

<label for="version">Version:</label>
<input type="text" id="version" v-model="device.version">

<label for="firmware">Firmware:</label>
<input type="text" id="firmware" v-model="device.firmware">

<label for="responseTime">Response Time:</label>
<input type="number" id="responseTime" v-model="device.responseTime">

<label for="addTime">Add Time:</label>
<input type="number" id="addTime" v-model="device.addTime">

<label for="initExpireTime">Init Expire Time:</label>
<input type="number" id="initExpireTime" v-model="device.initExpireTime">

<label for="initApiKey">Init API Key:</label>
<input type="text" id="initApiKey" v-model="device.initApiKey">

<label for="deactivated">Deactivated:</label>
<input type="checkbox" id="deactivated" v-model="device.deactivated">

<button type="submit">Create</button>
</form>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { DeviceTypeEnum } from '../modules/enums/DeviceTypeEnum';
import Device from '@/interfaces/Device';

export default defineComponent({
  name: 'CreateDeviceView',
  data: () => ({
    device: {} as Device,
    deviceTypes: Object.values(DeviceTypeEnum),
    selectedType: '',
    typeOptions: [
        { value: 'ESP32', label: 'ESP32' },
        { value: 'SDG_CUBE', label: 'SDG_CUBE' },
      ],
  }),
  methods: {
    handleSubmit() {
      // Do something with the created device
      console.log(this.device);
      
      // Clear the form
      this.device = {};
    }
  }
})
</script>