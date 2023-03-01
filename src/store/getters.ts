import Dashboard from "@/interfaces/Dashboard";
import State from "@/interfaces/State";

export default  {
    getLayout: (state: State) => (id: string) : Dashboard[] => {
        const module: Dashboard[] = state.modules.filter( (module:Dashboard) => module.id === id)
        return module; 
    }
}