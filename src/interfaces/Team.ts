import User from "./User";
import Module from "./Module";

interface Team {
    id?: string;
    name: string;
    description: string;
    userEntityList?: Array<User>;
    moduleEntityList?: Array<Module>;
}


export default Team;