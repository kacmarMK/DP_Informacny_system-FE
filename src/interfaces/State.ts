import Dashboard from "./Dashboard";
import Team from "./Team";

interface State {
    modules: Dashboard[]
    favoriteModules: Dashboard[]
    favoriteTeams: Team[]
    hidden: boolean
}

export default State;