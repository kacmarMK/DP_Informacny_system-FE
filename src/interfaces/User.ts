import Favorite from "./Favorite";
import Permission from "./Permission";
import PERMISSIONS from '../modules/enums/permissions.js';

interface User {
    uid?: string;
    avatar?: string
    //nickName?: string;
    password?: string;
    mail?: string;
    name?: string;
    //surname?: string;
    permissionEntity?: Permission;
    favoriteEntityList?: Array<Favorite>;
    permission?: typeof PERMISSIONS;
    company?: string;
    /* TODO: TAKTO BUDE VYZERAT FINALNY USER 
    id?: string;
    username?: string;
    password?: string;
    salt: string;
    mail?: string;
    name?: string;
    surname?: string;
    permissionEntity?: Permission;
    ? favoriteEntityList?: Array<Favorite>; ?
    ? avatar?: string ?
    */
}

export default User;