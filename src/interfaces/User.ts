import Favorite from "./Favorite";
import Permission from "./Permission";

interface User {
    id?: string;
    avatar?: string
    //nickName?: string;
    password?: string;
    company?: string;
    mail?: string;
    name?: string;
    //surname?: string;
    //phoneNumber?: string; 
    permissionEntity?: Permission;
    favoriteEntityList?: Array<Favorite>;
}

export default User;