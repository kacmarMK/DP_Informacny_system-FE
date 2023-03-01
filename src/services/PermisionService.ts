import http from "@/http-common";
import Permission from "@/interfaces/Permission";

class PermisionService {
    getAllPermisionByCompanyId(companyId: string): Promise<any>{
        return http.get('permission/getAllPermissionsByCompany?company=' + companyId);
    }

    createPermission(permision: Permission): Promise<any>{
        return http.post('permission/addPermission', permision);
    }
}

export default new PermisionService;