import http from "@/http-common";
import Recipe from "../interfaces/Recipe";

class RecipeService {

    createRecipe(recipe: Recipe): Promise<any> {
        return http.post("jobs/recipe/createRecipe", recipe);
    }

    deleteRecipe(recipeId: string): Promise<any> {
        return http.delete("jobs/recipe/deleteRecipeById/" + recipeId);
    }

    getRecipeByName(name: string): Promise<any> {
        return http.get("jobs/recipe/getRecipeByName/" + name);
    }

    getRecipeById(id: string): Promise<any> {
        return http.get("jobs/recipe/getRecipeById/" + id);
    }

    addCommandToRecipe(recipeId: string, commandId: string): Promise<any> {
        return http.put("jobs/recipe/addCommandToRecipe/" + recipeId + "/" + commandId);
    }

    removeCommandFromRecipe(recipeId: string, commandId: string, index: number): Promise<any> {
        return http.delete("jobs/recipe/removeCommandFromRecipe/" + recipeId + "/" + commandId + "/" + index);
    }

    getByDeviceType(type: string, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/recipe/getByDeviceType/" + type + "/" + sortBy + "/" + sortDirection);
    }

    getByDeviceTypeAndPages(type: string, page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/recipe/getByDeviceTypeAndPages/" + type + "/" + page + "/" + pageSize + "/" + sortBy + "/" + sortDirection);
    }

    updateRecipe(recipeId: string, recipe: Recipe): Promise<any> {
        return http.put("jobs/recipe/updateRecipe/" + recipeId, recipe);
    }

    addSubRecipeToRecipe(recipeId: string, subRecipeId: string): Promise<any> {
        return http.put("jobs/recipe/addSubRecipeToRecipe/" + recipeId + "/" + subRecipeId);
    }

    removeSubRecipeFromRecipe(recipeId: string, subRecipeId: string, index: number): Promise<any> {
        return http.delete("jobs/recipe/removeSubRecipeFromRecipe/" + recipeId + "/" + subRecipeId + "/" + index);
    }

    getAllRecipes(sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/recipe/getAllRecipes/" + sortBy + "/" + sortDirection);
    }

    getAllRecipesPageable(page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/recipe/getAllRecipesPageable/" + page + "/" + pageSize + "/" + sortBy + "/" + sortDirection);
    }

    getFullRecipesByDeviceType(deviceType: string, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/recipe/getFullRecipesByDeviceType/" + deviceType + "/" + sortBy + "/" + sortDirection);
    }

    getFullRecipesByDeviceTypeAndPages(deviceType: string, page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/recipe/getFullRecipesByDeviceTypeAndPages/" + deviceType + "/" + page + "/" + pageSize + "/" + sortBy + "/" + sortDirection);
    }

    getSubRecipes(deviceType: string, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/recipe/getSubRecipesByDeviceType/" + deviceType + "/" + sortBy + "/" + sortDirection);
    }

    getSubRecipesPageable(deviceType: string, page: number, pageSize: number, sortBy: string, sortDirection: string): Promise<any> {
        return http.get("jobs/recipe/getSubRecipesByDeviceType/" + deviceType + "/" + page + "/" + pageSize + "/" + sortBy + "/" + sortDirection);
    }

}

export default new RecipeService;