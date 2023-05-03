import User from "./User";
import Team from "./Team";
import Permission from "./Permission";

interface Company {
    id?: string;
    name: string;
    logo?: string;
    userEntityList?: Array<User>;
    permissionEntityList?: Array<Permission>;
    teamEntityList?: Array<Team>;
}


export default Company;