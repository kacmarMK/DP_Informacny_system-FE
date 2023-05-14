<template>
    <MainContent>
      <div>
        <Breadcrumb :heading="$t('views.recipes_view.heading')" :third="$t('views.recipes_view.link')"/>
        <div class="page-container">
        <div class="container">
          <table>
            <thead>
              <tr>
                <th><a href="" @click.prevent="getRecipes('name', sortBy === 'name' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc', pagination.currentPage)">Name</a></th>
                <th><a href="" @click.prevent="getRecipes('deviceType', sortBy === 'deviceType' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc', pagination.currentPage)">Device Type</a></th>
                <th><a href="" @click.prevent="getRecipes('subRecipe', sortBy === 'subRecipe' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc', pagination.currentPage)">Is subrecipe?</a></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="recipe in gridRecipes" :key="recipe.id">
                <td>{{ recipe.name }}</td>
                <td>{{ recipe.deviceType }}</td>
                <td>
                  <span v-if="recipe.subRecipe" class="green-icon">✓</span>
                  <span v-else class="red-icon">X</span>
                </td>
                <td>
                  <button class="delete-button" @click="deleteRecipe(recipe.id)">Delete</button>
                  <button class="edit-button" >Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="pagination">
          <a v-if="pagination.currentPage > 1" @click="getRecipes(sortBy, sortDirection, pagination.currentPage - 1)">
            Previous
          </a>
          <a @click="getRecipes(sortBy, sortDirection, pagination.currentPage + 1)">
            Next
          </a>
        </div>
        
        </div>
        </div>
        
        <hr class="separator">
        <div>
          <button class="create-device-btn" @click="toggleRecipeCreation">
            <i class="fa fa-plus"></i> Create Recipe
          </button>
        </div>
        <transition name="fade">
          <div class="create-device-container" v-if="creatingRecipe">
            <CreateRecipeComponent></CreateRecipeComponent>
          </div>
        </transition>
      </div>
    </MainContent>
  </template>
  
  <script lang="ts">
  import {defineComponent} from 'vue';
  import MainContent from '../components/MainContent.vue'
  import Breadcrumb from '../components/Breadcrumb.vue'
  import Recipe from '../interfaces/Recipe';
  import RecipeService from '../services/RecipeService';
  import CreateRecipeComponent from '../components/CreateRecipeComponent.vue';
  import DeviceTypeEnum from '../modules/enums/DeviceTypeEnum';
  
  export default defineComponent({
    name: 'RecipesView',
    components: {
      MainContent, 
      Breadcrumb,
      CreateRecipeComponent
    },
    data: () => ({
      errorMessage: "" as string,
      loading: false as boolean,
      sortBy: "none",
      sortDirection: "none",
      gridRecipes: [] as Recipe[],
      newRecipe: '',
      creatingRecipe: false as boolean,
      deviceType: DeviceTypeEnum,
      selectedType: '',
      recipeToEdit: null,
      typeOptions: [
        { value: 'ESP32', label: 'ESP32' },
        { value: 'SDG_CUBE', label: 'SDG_CUBE' },
      ],
      perPage: 10,
      currentPage: 1,
      pagination: {
        currentPage: 1,
        totalPages: 10,
        pages: [] as number[]
      },
    }),
    methods: {
      async getRecipes(sortBy: string, sortDirection: string, page = 1) {
        try {
          this.loading = true;
          if (sortBy === this.sortBy) {
                  sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
          }
          if (sortBy === "none") {
            sortDirection = 'none';
          }
          const response = await RecipeService.getAllRecipesPageable(page, this.perPage, sortBy, sortDirection);
          this.gridRecipes = response.data;
          this.sortBy = sortBy;
          this.pagination.currentPage = page;
          this.sortDirection = sortDirection;
        } catch (error) {
          console.log("Error when calling getAllRecipes() service.");
        } finally {
          this.loading = false;
        }
      },
      onChangePage(page: number) {
        console.log(page);
        this.currentPage = page;
        this.getRecipes(this.sortBy, this.sortDirection, page);
      },
      async deleteRecipe(recipeId: string) {
        if(confirm("Are you sure you want to delete this recipe?")){
          try {
            await RecipeService.deleteRecipe(recipeId);
            // If the delete request was successful, update the list of recipes in the UI
            this.gridRecipes = this.gridRecipes.filter(recipe => recipe.id !== recipeId);
          } catch (error) {
            console.error('Error deleting recipe.');
          }
        }
      },
      addRecipe() {
        this.creatingRecipe = !this.creatingRecipe;
      },
      toggleRecipeCreation() {
        this.creatingRecipe = !this.creatingRecipe;
      },
    },
    async mounted() {
      const response = await RecipeService.getAllRecipesPageable(1, this.perPage, 'none', 'none');
      this.gridRecipes = response.data;
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
    .green-icon {
      color: green;
      font-size: 20px;
    }

    .red-icon {
      color: red;
      font-size: 20px;
    }
    </style>