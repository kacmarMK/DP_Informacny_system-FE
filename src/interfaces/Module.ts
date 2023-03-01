import Dashboard from "./Dashboard";

interface Module {
    id?: string;
    name?: string;
    dashboardEntityList: Array<Dashboard>
}

export default Module;