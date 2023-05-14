<template>
    <MainContent>
        <div>
            <Breadcrumb :heading="$t('views.commands_view.heading')" :third="$t('views.commands_view.link')"/>
        </div>
        <div class="page-container">
        <div class="container">
          <table>
            <thead>
              <tr>
                <th><a href="" @click.prevent="getCommands('name', sortBy === 'name' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc', pagination.currentPage)">Name</a></th>
                <th><a href="" @click.prevent="getCommands('deviceType', sortBy === 'deviceType' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc', pagination.currentPage)">Device Type</a></th>
                <th>Parameters</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="command in gridCommands" :key="command.id">
                <td>{{ command.name }}</td>
                <td>{{ command.deviceType }}</td>
                <td>{{ command.params }}</td>
                <td>
                  <button class="delete-button" @click="deleteCommand(command.id)">Delete</button>
                  <button class="edit-button" >Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
          <a v-if="pagination.currentPage > 1" @click="getCommands(sortBy, sortDirection, pagination.currentPage - 1)">
            Previous
          </a>
          <a @click="getCommands(sortBy, sortDirection, pagination.currentPage + 1)">
            Next
          </a>
        </div>
        </div>
        </div>
        
        <hr class="separator">

        <div class="button-container">
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
        sortBy: "none",
        sortDirection: "none",
        loading: false as boolean,
        gridCommands: [] as Command[],
        newCommand: '',
        creatingCommand: false as boolean,
        totalCommands: 0,
        perPage: 10,
        currentPage: 1,
        deviceType: DeviceTypeEnum,
        pagination: {
          currentPage: 1,
          totalPages: 10,
          pages: [] as number[]
        }
    }),
    methods: {
      async getCommands(sortBy: string, sortDirection: string, page = 1) {
        try {
          this.loading = true;
          // Toggle sort direction if the current sorting column is clicked again
          if (sortBy === this.sortBy) {
                  sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
          }
          if (sortBy === "none") {
            sortDirection = 'none';
          }

          const response = await CommandService.getAllCommandsWithPagination(page, this.perPage, sortBy, sortDirection);
          this.gridCommands = response.data;
          this.totalCommands = response.headers['x-total-count'];
          this.sortBy = sortBy;
          this.pagination.currentPage = page;
          this.sortDirection = sortDirection;
        } catch (error: unknown) {
          // Handle error
        } finally {
          this.loading = false;
        }
      },
      onChangePage(page: number) {
        console.log(page);
        this.currentPage = page;
        this.getCommands(this.sortBy, this.sortDirection, page);
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
    async mounted() {
      const response = await CommandService.getAllCommandsWithPagination(1, this.perPage, 'none', 'none');
      this.gridCommands = response.data;
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

    .create-device-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .container {
      margin: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      background-color: #fff;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
    th {
      font-size: 20px;
    }
    th,
    td {
      padding: 1px 15px;
      text-align: left;
    }

    thead {
      background-color: #666;
      color: #fff;
    }

    th:first-child,
    td:first-child {
      padding-left: 20px;
    }

    th:last-child,
    td:last-child {
      padding-right: 5px;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }

    .delete-button {
      background-color: #ff0000;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
    .edit-button {
      background-color: #f2ff00;
      color: #383838;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    .delete-button:hover {
      background-color: #d60101;
    }

    .edit-button:hover {
      background-color: #f9ff8b;
    }

    .page-container {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      margin: 20px;
    }

    .button-container {
      flex: 0 0 auto;
      margin-right: 20px;
      margin-left: 50px;
    }

    .create-device-btn {
      display: inline-block;
      border: none;
      border-radius: 30px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: #007bff;
      box-shadow: 0px 5px 0px #0062cc;
      padding: 10px 30px;
      transition: box-shadow 0.2s ease-in-out;
      cursor: pointer;
      outline: none;
    }

    .create-device-btn:hover {
      box-shadow: 0px 3px 0px #0062cc;
      transform: translateY(2px);
    }

    .fa-plus {
      margin-right: 10px;
    }

    .separator {
      flex: 1 0 auto;
      border: none;
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }

    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .pagination a {
      display: inline-block;
      padding: 10px 15px;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin: 0 5px;
      color: #333;
      font-weight: bold;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .pagination a:hover {
      background-color: #ccc;
    }

</style>
    