import Command from './Command';
import DeviceTypeEnum from '../modules/enums/DeviceTypeEnum';

interface Recipe {
    id?: string;
    name?: string;
    commands?: Array<Command>;
    subRecipes?: Array<Recipe>;
    deviceType?: string;
    isSubRecipe: Boolean;
    createdAt?: number;
    deactivated: Boolean;
}

export default Recipe;