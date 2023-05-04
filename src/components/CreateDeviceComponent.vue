<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form class="mt-5" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" v-model="device.name" required>
          </div>

          <div class="form-group">
            <label for="mac">MAC:</label>
            <input type="text" class="form-control" id="mac" v-model="device.mac" required>
          </div>

          <div class="form-group">
            <label for="type">Type:</label>
            <select class="form-control" id="type" v-model="selectedType" required>
              <option
                v-for="type in typeOptions"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="version">Version:</label>
            <input type="text" class="form-control" id="version" v-model="device.version">
          </div>

          <div class="form-group">
            <label for="firmware">Firmware:</label>
            <input type="text" class="form-control" id="firmware" v-model="device.firmware">
          </div>
          <!--
          <div class="form-group">
            <label for="responseTime">Response Time:</label>
            <input type="number" class="form-control" id="responseTime" v-model="device.responseTime">
          </div>

          <div class="form-group">
            <label for="addTime">Add Time:</label>
            <input type="number" class="form-control" id="addTime" v-model="device.addTime">
          </div>

          <div class="form-group">
            <label for="initExpireTime">Init Expire Time:</label>
            <input type="number" class="form-control" id="initExpireTime" v-model="device.initExpireTime">
          </div>
        -->
          <div class="form-group">
            <label for="initApiKey">Init API Key:</label>
            <input type="text" class="form-control" id="initApiKey" v-model="device.initApiKey">
          </div>

          <div class="form-group">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="deactivated" v-model="device.deactivated">
              <label class="form-check-label" for="deactivated">Deactivated:</label>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DeviceTypeEnum } from '../modules/enums/DeviceTypeEnum';
import Device from '@/interfaces/Device';
import DeviceService from "@/services/DeviceService";
import ResponseData from "@/services/ResponseData";

export default defineComponent({
  name: 'CreateDevice',
  components: {
  },
  data: () => ({
    device: {
      deactivated: false} as Device,
    deviceTypes: Object.values(DeviceTypeEnum),
    selectedType: '',
    typeOptions: [
      { value: 'ESP32', label: 'ESP32' },
      { value: 'SDG_CUBE', label: 'SDG_CUBE' },
    ],
  }),
  methods: {
    async handleSubmit() {
      if (this.device.jobs == null) {
        this.device.jobs = [];
      }

      this.device.type = this.selectedType;

      const response: ResponseData<Device> = await DeviceService.createDevice(this.device);
      // Clear the form
      //this.device = {};
    },
  },
});
</script>
<style>
  /* Center the form vertically and horizontally */
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  /* Style the form */
  form {
    max-width: 630px;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  /* Style the form labels */
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }

  input,
  select {
    display: block;
    width: 80%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #555;
  }

  /* Style the form submit button */
  button[type="submit"] {
    display: block;
    width: 100%;
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem;
    border: none;
    border-radius: 3px;
    font-size: 1rem;
    cursor: pointer;
  }

  /* Style the form submit button on hover */
  button[type="submit"]:hover {
    background-color: #0069d9;
  }

  /* Style the form error messages */
  .error-message {
    color: #dc3545;
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  input:required {
    border: 1px solid rgb(58, 56, 56);
  }
</style>