<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="mt-5" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" id="name" v-model="command.name" required>
            </div>
        
            <div class="form-group">
                <label for="numbers">Parameters:</label>
                <input type="text" class="form-control" id="numbers" v-model="params" required placeholder="Enter comma-separated numbers, e.g. 1,2,3">
            </div>

            <div class="form-group">
              <label for="type">Device Type:</label>
              <select class="form-control" id="type" v-model="selectedType" required>
                <option v-for="type in typeOptions" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="deactivated" v-model="deactivated" false>
                <label class="form-check-label" for="deactivated">Deactivated:</label>
              </div>
            </div>
  
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <button type="submit" class="btn btn-primary">Create</button>
          </form>
        </div>
      </div>

      </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { DeviceTypeEnum } from '../modules/enums/DeviceTypeEnum';
  import Command from '@/interfaces/Command';
  import CommandService from "@/services/CommandService";
  import ResponseData from "@/services/ResponseData";

  export default defineComponent({
    name: 'CreateCommand',
    components: {
    },
    data: () => ({
      isSubCommand: false, 
      deactivated: false,
      command: {} as Command,
      deviceTypes: Object.values(DeviceTypeEnum),
      selectedType: '',
      params: '',
      typeOptions: [
        { value: 'ESP32', label: 'ESP32' },
        { value: 'SDG_CUBE', label: 'SDG_CUBE' },
      ],
      errorMessage: ''
    }),
    methods: {
      async handleSubmit() {
        // Parse the input into an array of numbers
        const numbersString = this.params;
        const numbersArray = numbersString.split(',').map(numString => Number(numString.trim()));

        // Check if the input is valid
        if (numbersArray.some(isNaN)) {
            // Display an error message and return
            this.errorMessage = 'Invalid input: Please enter a comma-separated list of numbers';
            return;
        }

        // Check if the input contains at least one number
        if (numbersArray.length === 0) {
            // Display an error message and return
            this.errorMessage = 'Invalid input: Please enter at least one number';
            return;
        }

        this.command.params = numbersArray;
        this.command.deviceType = this.selectedType;
        this.command.deactivated = this.deactivated;
        try{
          const response: ResponseData<Command> = await CommandService.createCommand(this.command);
          this.command = {deactivated: false};
          location.reload();
        } catch (e) {
          //TODO
        }
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

    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

  </style>