import Dashboard from "@/interfaces/Dashboard"
import State from "@/interfaces/State"
import Team from "@/interfaces/Team"
export default {
    addModule: (state: State) => (module: Dashboard) : any => {
        if(state.modules.filter(m => m.id === module.id).length > 0){
            const index = state.modules.map(item => item.id).indexOf(module.id);
            state.modules.splice(index, 1);     
            state.modules.push(module);
        } else {
            state.modules.push(module);
        }
    },
    setFavoriteTeams: (state: State)  => (teams: Team[]) : any => {
        state.favoriteTeams = teams;
    },
    setFavoriteModuls: (state: State) => (modules: Dashboard[]) : any => {
        state.favoriteModules = modules
    },
    setHidden: (state: State) => (hidden: boolean): any => {
        console.log(hidden)
        state.hidden = hidden
    }
}