<template>
    <MainContent>
      <div>
        <Breadcrumb :heading="$t('views.recipes_view.heading')" :third="$t('views.recipes_view.link')"/>
        <div class="grid-container">
          <div v-for="recipe in gridRecipes" :key="recipe.id" class="device-card">
            <h3>{{ recipe.name }}</h3> 
            <p>Recipe commands: {{ recipe.commands }}</p>
            <p>Subrecipes: {{ recipe.subRecipes }}</p>
            <p>Type of device: {{ recipe.deviceType }}</p>
            <p>Is subrecipe?: {{ recipe.subRecipe }}</p>
            <p>Is device deactivated?: {{ recipe.deactivated }}</p>
            <button class="delete-button" @click="deleteRecipe(recipe.id)">X</button>
            <button class="update-button" @click="showEditForm()">Edit recipe</button>         
          </div>
        </div>
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
    }),
    methods: {
      async getRecipes() {
        try {
          this.loading = true;
          const response = await RecipeService.getAllRecipes("none", "none");
          this.gridRecipes = response.data;
        } catch (error) {
          console.log("Error when calling getAllRecipes() service.");
        } finally {
          this.loading = false;
        }
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
    created() {
      this.getRecipes();
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