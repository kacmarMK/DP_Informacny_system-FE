<template>
    <MainContent>
        <div>
            <Breadcrumb :heading="$t('views.commands_view.heading')" :third="$t('views.commands_view.link')"/>
        </div>
        <div class="grid-container">
          <div v-for="command in gridCommands" :key="command.id" class="device-card">
            <h3>{{ command.name }}</h3>
            <p>Command parameters: {{ command.params }}</p>
            <p>Device type: {{ command.deviceType }}</p>
            <p>Is command deactivated?: {{ command.deactivated }}</p>
            <button class="delete-button" @click="deleteCommand(command.id)">X</button>
          </div>
        </div>
        <div>
          <button class="create-device-btn" @click="toggleCommandCreation">
            <i class="fa fa-plus"></i> Create Command
          </button>
        </div>
        <transition name="fade">
          <div class="create-device-container" v-if="creatingCommand">
            <CreateCommandComponent></CreateCommandComponent>
          </div>
        </transition>
    </MainContent>
</template>
<script lang="ts">
import MainContent from '../components/MainContent.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { defineComponent } from '@vue/runtime-core'
import Command from '../interfaces/Command';
import CommandService from '../services/CommandService';
import CreateCommandComponent from '../components/CreateCommandComponent.vue';
import DeviceTypeEnum from '../modules/enums/DeviceTypeEnum';
import axios, {AxiosError} from 'axios';

export default defineComponent({
    name: 'CommandsView',
    components: {
        MainContent,
        Breadcrumb,
        CreateCommandComponent
    },
    data: () => ({
        errorMessage: "" as string,
        loading: false as boolean,
        gridCommands: [] as Command[],
        newCommand: '',
        creatingCommand: false as boolean,
        deviceType: DeviceTypeEnum
    }),
    methods: {
        async getCommands() {
        try {
          this.loading = true;
          const response = await CommandService.getAllCommands("none", "none");
          this.gridCommands = response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 404) {
                    console.log("Resource not found.");
                } else {
                    console.log("Error when calling getAllCommands() service.");
                }
            } else {
                console.log("Unknown error:", error);
            }
        } finally {
          this.loading = false;
        }
      },
      async deleteCommand(commandId: string) {
        if(confirm("Are you sure you want to delete this device?")){
          try {
            await CommandService.deleteCommand(commandId);
            // If the delete request was successful, update the list of recipes in the UI
            this.gridCommands = this.gridCommands.filter(command => command.id !== commandId);
          } catch (error) {
            console.error('Error deleting device.');
          }
        }
      },
      addCommand() {
        this.creatingCommand = !this.creatingCommand;
      },
      toggleCommandCreation() {
        this.creatingCommand = !this.creatingCommand;
      },
    },
    created() {
      this.getCommands();
    }
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
    