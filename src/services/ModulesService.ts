import http from "@/http-common";
import Module from '@/interfaces/Module';
class ModulesService {

    getModuleById(moduleId: string): Promise<any>{
        return http.get("module/getModuleById/" + moduleId);
    }

    addModule(module: Module): Promise<any> {
        return  http.post("module/addModule", module)
    }
}

export default new ModulesService;