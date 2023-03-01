import http from "@/http-common";
import Dashboard from "@/interfaces/Dashboard";

class DashboardService {

    getDashboardById(id: string): Promise<any>{
        return http.get("dashboard/getDashboardById/" + id)
    }

    addDashboard(dashboard: any): Promise<any> {
        return http.post( "dashboard/addDashboard", dashboard)
    }

    deleteById(id: string): Promise<any> {
        return http.delete("dashboard/deleteById?Id=" + id);
    }
}

export default new DashboardService;