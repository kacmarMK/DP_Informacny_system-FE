import Command from './Command';
import DeviceTypeEnum from '../modules/enums/DeviceTypeEnum';

interface Recipe {
    id?: string;
    name?: string;
    commands?: Array<Command>;
    subRecipes?: Array<Recipe>;
    deviceType?: typeof DeviceTypeEnum;
    isSubRecipe?: boolean;
    createdAt?: number;
    deactivated?: boolean;
}

export default Recipe;